sometimes you have to cache, but be suspicious

caching helps the p50 case but can make your p99+ worse, because now people don't really care/know about it - gets lost in the metrics

two code paths, one rarely exercised for long-lived caches - scary

busting is scary

stale data collisions

can be too easy of a fix - why is it slow in the first place? can that be sped up? sometimes easier just to make it faster