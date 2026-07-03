

ideal architectures radically change at various "trigger points"
- "can you fit it in memory" - before this, bloom filters/etc are great. after this, you should think in trees (minimize I/O, not cycles) (middle ground where you can mmap)
- "<10ms etc"