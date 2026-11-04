---
title: "A Home Rack That Survives Power Cuts"
description: "Proxmox plus TrueNAS, three UPS rules, and the automation that lets me travel without wondering whether the array is alive."
pubDate: 2025-12-12
category: homelab
tags: ["Proxmox", "TrueNAS", "Linux"]
---

The rack started as a single machine I could hear from the next room. It is now three
nodes, and the only reason I trust it while travelling is that the failure path is
boring.

## Hardware, briefly

- One bare-metal Proxmox VE host running the VMs and containers.
- A TrueNAS box holding the ZFS pool, exporting NFS and SMB.
- A small UPS on the Proxmox host, *not* on the switch.

Putting the switch on the UPS was my first mistake: when the host shuts down cleanly
the switch keeps broadcasting into the void, and my monitoring reports "host down,
network up" instead of "power event". A UPS should protect the things that need an
orderly shutdown, not the things that are cheap to reboot.

## Three rules

1. **One writer per dataset.** NFS and SMB on the same share is fine; two hosts writing
   the same files is not.
2. **Snapshots are not backups.** ZFS snapshots live on the disk you are trying to
   protect. Push to a second machine or it does not count.
3. **Test the restore.** I schedule a quarterly restore into a scratch dataset. The
   first time I ran it, two months of "backups" were empty archives.

## Automating the boring part

Proxmox hookscripts handle the shutdown ordering. The important bit is the delay: VMs
get 120 seconds to flush, then they are killed, because a hung guest must not take the
host down with it.

```bash
#!/usr/bin/env bash
# /var/lib/vz/snippets/pre-stop-all.sh
for vmid in $(qm list | awk 'NR>1 {print $1}'); do
  qm guest cmd "$vmid" fsfreeze --freeze 2>/dev/null || true
done
```

## What I would tell past me

Monitor the boring things: pool health, ZFS error counters, SMART reallocated sectors.
Every outage I have had was visible in one of those three numbers weeks in advance,
and every one of them was survivable because the restore path was written down.
