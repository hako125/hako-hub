---
title: "Sniffing TCP in Rust Without Pulling Your Hair Out"
description: "Building a packet sniffer from scratch taught me more about the network stack than any textbook. Here is the map I wish I had."
pubDate: 2026-01-18
category: systems
tags: ["Rust", "Networking", "pcap"]
minutes: 9
---

Most networking tutorials stop at `tcpdump -i any` and call it a day. That is fine
until you need to answer *why* a connection dies at the handshake, or you want a
parser you control. So I built one in Rust.

## The shape of the problem

A sniffer is three problems stacked:

1. **Capture** raw frames off an interface.
2. **Decode** the protocol headers you care about.
3. **Present** them without drowning the terminal in output.

Rust is a good fit for all three, mostly because the types force you to think about
the exact byte layout before you write the parse.

### Capture

`libpcap` hands you a buffer and a header. The tempting mistake is to parse straight
out of that slice with `transmute`. Don't — the buffer is not guaranteed to be aligned,
and a single unaligned read is instant undefined behaviour.

```rust
fn parse_ipv4(frame: &[u8]) -> Option<Ipv4Header> {
    // 20 bytes minimum, big-endian fields, no alignment assumptions.
    if frame.len() < 20 || frame[0] >> 4 != 4 {
        return None;
    }
    let ihl = (frame[0] & 0x0f) as usize * 4;
    Some(Ipv4Header {
        protocol: frame[9],
        src: Ipv4Addr::new(frame[12], frame[13], frame[14], frame[15]),
        dst: Ipv4Addr::new(frame[16], frame[17], frame[18], frame[19]),
        payload_offset: ihl,
    })
}
```

Boring, obvious, and impossible to get wrong about alignment.

## What actually broke

The first version dropped every third packet. The capture buffer was smaller than the
`tcpdump` default, so the kernel ring overflowed before userspace drained it. Raising
`pcap_set_buffer_size` fixed it. No amount of parser debugging would have found that.

> The lesson: when a system misbehaves, check the buffer before the logic.

## Decoding as a state machine

TCP is not a stream of packets, it is a stream of *sessions*. Grouping by the 4-tuple
and tracking sequence numbers turned raw packets into something legible:

| Field | Use |
| --- | --- |
| `seq` / `ack` | detect retransmits and gaps |
| `flags` | separate SYN floods from healthy handshakes |
| `window` | spot receiver-side backpressure |

## Was it worth it?

Yes, but not for the tool. The tool is 400 lines and I could have used `tshark`. The
value was in the debugging: every bug was a real property of the stack, and now I can
read a capture the way I read a stack trace.

Next on the list is IPv6 extension headers, which is where the naive fixed-offset
parsers fall apart.
