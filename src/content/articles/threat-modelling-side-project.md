---
title: "Threat Modelling a Side Project in One Sitting"
description: "STRIDE in forty minutes, and the four questions that actually changed the design of a small web app."
pubDate: 2025-11-27
category: security
tags: ["Threat Modelling", "STRIDE", "Web"]
minutes: 5
---

Threat modelling has a reputation for being a two-week workshop with a spreadsheet.
For a side project, forty minutes and four questions is enough.

## The four questions

1. What am I building? (one paragraph, no jargon)
2. What can go wrong? (STRIDE, but only for components that touch the network)
3. What am I going to do about it? (mitigate, accept, or delete the feature)
4. Did I do a good job? (checklist against the last incident you remember)

## STRIDE, pruned

For a small app with auth, a database, and file uploads, only three rows mattered:

| Threat | Realistic here? | Response |
| --- | --- | --- |
| Spoofing | Yes — session cookies | `HttpOnly`, `SameSite=Lax`, short TTL |
| Tampering | Yes — client-side role checks | move every check server-side |
| DoS | Partly — expensive uploads | size limit before parsing |
| Info disclosure | Yes — verbose errors | generic messages, structured logs |

Elevation of privilege and repudiation were largely covered by the framework, which is
exactly the point: write down what you are *not* worrying about, so the omission is a
decision rather than an accident.

## What changed in the design

The upload path was the interesting one. The original plan parsed the file to validate
it. Parsing before checking size is a free denial-of-service: a 2 GB "image" gets read
into memory before you decide it is not an image.

The fix is ordering, and it costs nothing:

```ts
const maxBytes = 5 * 1024 * 1024;
if (request.headers.get("content-length") === null) return reject(411);
const declared = Number(request.headers.get("content-length"));
if (!Number.isFinite(declared) || declared > maxBytes) return reject(413);
// Only now start reading the body.
```

## The takeaway

Threat modelling is not a document. It is the moment you reorder two lines because you
imagined an attacker who does not play by your assumptions. Do it before the code is
written and it takes minutes; do it after and it takes a rewrite.
