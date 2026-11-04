---
title: "Allocation Is the Benchmark"
description: "Why the fastest Rust parser I wrote was the one that stopped allocating per packet, and how I measured it."
pubDate: 2025-10-09
category: systems
tags: ["Rust", "Performance", "Profiling"]
---

I had a parser doing 180k packets per second. The profile said 71% of the time was in
`malloc`. Not my logic, not the syscalls — the allocator.

## Measure first, obviously

`perf record -g` and `cargo flamegraph` on the release build. The flame graph was a
single fat tower labelled `alloc::alloc::exchange_malloc`, with my parser as a thin
sliver on top.

Every packet parsed into a freshly allocated `Vec`. At 180k packets per second, that is
180k allocations per second, each with a matching free.

## Reuse instead of reallocate

The fix is not clever. It is a buffer that lives as long as the connection:

```rust
pub struct Decoder {
    scratch: Vec<u8>,
}

impl Decoder {
    pub fn decode(&mut self, frame: &[u8]) -> Result<Message<'_>, DecodeError> {
        self.scratch.clear();
        self.scratch.try_reserve(frame.len())?;
        self.scratch.extend_from_slice(frame);
        Message::parse(&self.scratch)
    }
}
```

`clear()` keeps the capacity, so after the first few frames there are no allocations
at all. Throughput went to 1.4M packets per second — a 7.7x change from deleting
allocator calls, not from touching the parsing logic.

## Borrowing is even better

When the message does not need to outlive the frame, borrow straight out of it:

```rust
pub fn decode<'a>(frame: &'a [u8]) -> Result<Message<'a>, DecodeError>
```

Zero copies, zero allocations, and the lifetime tells you exactly when the data dies.
The compiler is doing the resource management that I was doing by hand — and doing it
better.

> If a hot loop allocates, the algorithm barely matters.

## How to keep it that way

- A criterion benchmark that asserts allocation count, not just wall time.
- A nightly check with `#[global_allocator]` counting allocs per iteration.
- Profile the release build. Debug builds hide the problem behind unoptimised code.

The lesson generalises past Rust: in any language with a GC, per-packet allocation
turns into per-packet collection pauses, and the fix is the same — reuse the buffer.
