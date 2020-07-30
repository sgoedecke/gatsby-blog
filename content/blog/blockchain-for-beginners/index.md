---
title: Blockchain for beginners
description: "A brief explanation of how blockchains work for developers"
---

# Introduction

This is a guide for developers who kinda sorta know what blockchains _are for_ (making distributed crypto-currencies like Bitcoin possible) but have no idea what exactly is involved in that or how it works.

This problem is compounded by the fact that popular discussions of (e.g.) Bitcoin try to make it interesting by pumping up the mathematics side of it, which makes it sound even more inaccessible to developers without strong maths or CS chops. For instance, news articles will mention that placing a "block" in the "chain" - whatever that means - requires solving a very difficult mathematical problem. This sounds complicated! But it reality it's just "mutate a string over and over until its md5 hash meets a very stringent condition". Yes, it's a difficult maths problem, but the implementation couldn't be simpler.

By the end of this article, I hope you'll understand why blockchains work, and feel comfortable writing a ~100 line toy blockchain client in your language of choice. (That's one hundred lines, not a typo.) You can jump to the [demo](https://sgoedecke.github.io/blockchain-js-demo/) as soon as you like, but I'd recommend reading at least the first section below.

# Why blockchain?

What kind of problem is a blockchain designed to solve? Suppose you want to write an database-backed app, without using a server. All your users will have a copy of your app, and must be able to read and write to a shared data store at will. When they read from the store, they should get the latest copy of everyone else's writes. Since most blockchain implementations are crypto-currencies, this is often called a _ledger_.

How would we design an app like this? Since we don't have a server, we'll have to make all the copies of our app connect to each other and share data somehow. Luckily, this problem's already been solved by peer-to-peer networking, most famously used in torrent clients.

But building a torrent client is easier than our problem, since torrenters will just be downloading copies of the same file. Torrenting is a write-once system: once a file is made available, it can't be added to or altered. It's easy to prevent people tampering with a file by putting a hash on it: if the hash of the copy of `Twilight[aXXo].mp4` you downloaded doesn't match the hash in the `.torrent` file, you (or at least your torrenting program) knows it's an invalid download.

> There's nothing to stop a hacker from uploading a `.torrent` file that's associated with a malicious copy of _Twilight_. But there's safety in numbers: if thirty thousand people have downloaded a particular copy of the movie, and haven't reported it as malicious, you can be pretty sure it's safe - since you _know_ from the hash that you're getting exactly the same file that they did.

Like a torrent client, our blockchain app will rely on hashes to verify that you've got the right copy of the ledger. But unlike a torrent client, we don't just want to download the right copy of the ledger - we also want to _write_ to the ledger. The first glaring issue here is preventing someone from rewriting history. Since we don't actually have a database, and thus have no single source of truth, we'll have to find another way to stop people tampering.

> Can we just stick a hash on the ledger, like we do with torrents? No, because every write will invalidate the hash. You could generate a new hash when you write, but there's no reason for any other user to believe you've just added something to the ledger and haven't altered anything you weren't supposed to.

# Hash lists

To solve this, blockchains rely on a data structure called a _hash list_ (sometimes called a Merkle list). It's a way to hash parts of the ledger and the whole thing at the same time. A hash list is a list where each element contains its content, a pointer to the previous element - like a regular linked list - and a hash of that previous element. If we both have a copy of the same hash list, and you add an element on the end, I can verify that you haven't altered any of the existing elements by re-hashing the existing elements and checking the hash (stored on the next element). Once I'm satisfied that you haven't tampered with history, I'll accept your new element. Since each element contains the hash of the previous element, which then goes into the hash stored in the following element, you can't tamper with the order of elements either.

![Hash list](hash_list.svg)

In our blockchain app, our ledger will be stored as a hash list. Each element in the hash list is called a _block_. (This is where "blockchain" comes from: it's a chain of blocks.) Every time we accept or generate a new block, our blockchain app will send the latest version of the ledger to all its peers on the P2P network. When they verify the hashes in the chain, they'll add the block or blocks they were missing. Changes to the ledger will thus propagate over the network, without anybody being able to change the past.

# Bitcoin

Even with a tamper-proof ledger, the distributed nature of blockchain means that ledgers _will_ get out of sync as soon as two instances of our app add a block at the same time. How do you reconcile out-of-sync histories? You could do what GitHub does and force people to "pull" the latest version of the ledger before you "push" a new block into the P2P network, but with a distributed network we'll never be able to say for sure that we've got the latest version. At some point two versions of the app will have conflicting ledgers.

> Not handling this would be catastrophic for our app. With each conflict, our blockchain 'community' would splinter into sub-communities, each of which views the other's ledger as invalid, rendering it impossible for someone in one community to interact with the other community's ledger.

Different blockchains adopt different strategies for dealing with this problem. Here's a simplified version of how Bitcoin does it, which we'll adapt for our blockchain app. There are three main parts to Bitcoin's strategy: the first two greatly reduce the number of generated blocks and thus the number of conflicts, and the third offers a way of resolving these conflicts when they do occur.

### Bundle our writes

First, we stop making every new write a block. Instead, we publish 'un-saved' writes to the P2P network, signed with our private key. Blocks are then generated by a subset of users called "miners", who bundle the unsaved writes together in batches before hashing. Suppose five hundred writes fit in one block. Then we've divided the number of blocks by five hundred.

> Bitcoin hashes all the writes in a block - each of which represents a transaction - in a special way. They hash each of the writes,then hash the sum of each pair of hashes, and so on until you get a binary tree. Remember the Merkle list? This is called a Merkle tree. The point is that you can verify the integrity of one transaction without downloading and re-hashing the entire tree. All you need to do is download the branch containing the transaction you want to verify. Doing this enables the existence of "lightweight" Bitcoin clients, which verify only as much as they personally need to. Fully-fledged Bitcoin nodes are still required in order to maintain the integrity of the blockchain.

### Require proof of work

Second, we introduce artificial difficulty to the task of making blocks. Instead of just bundling five hundred writes and hashing - a very quick task - let's stipulate that for a block to be real, the hash it contains must begin with four zeroes. (We'll add an arbitrary string, called a _nonce_, to each block so miners can tweak it to get the hash they want.) Now we've restricted the number of potential miners to those with the computing power to brute-force their way to the hash target. Better still, out of those miners, it's very unlikely that more than one will get it at the same time. This will significantly slow down the rate at which blocks can be added to the ledger, but since we're bundling five hundred writes into a block it's not so bad.

> Since generating a hash with four zeroes at the start requires a lot of computing power, the generated hash is called a _proof of work_. What incentive do miners have (besides pure altruism and love of the Bitcoin concept) to spend time and effort generating proof of work? Bitcoin is set up to let miners award themselves a flat Bitcoin fee for each block they successfully mine, plus a commission on all the transactions in the block. In other words, the miners can put a "25 BTC to me" transaction on the end of each block they mine, and everyone's agreed to accept those blocks into the blockchain.

### Resolve conflicts

Third, we declare a strategy for handling out-of-sync ledgers: accept the longer one. Our app will treat the shorter ledger as invalid. Note that this will make it possible to write to the ledger, circulate it among other users of the app, but then have it overwritten by a longer chain which pops up from somewhere else. That's just an unfortunate consequence of using blockchains - you can never be 100% certain that your changes to the ledger have "made it in", or that your recent blocks won't be replaced. However, the longer your change survives, the more blocks will slot in above it, and the more confidence you can have that your change will persist.

> All of these decisions come with trade-offs: fewer conflicts at the expense of a less distributed system; easy conflict resolution at the expense of making all writes unreliable. Since our toy blockchain app isn't going to be as popular or as dangerous as Bitcoin, we can avoid some of these trade-offs. Let's ditch the first two decisions and keep the third.

## Why Bitcoin works

We can now see how Bitcoin can maintain a tamper-proof record of all Bitcoin transactions (and thus how many BTC everyone has at the moment). Each transaction gets broadcasted, picked up by a miner and bundled up into a block with a very special hash attached.

![Bitcoin blockchain](bitcoin_blockchain.svg)

Until your transaction gets bundled, it hasn't "gone through", and even after it becomes a block it might still get overwritten. However, once your transaction's block gets picked up by a bunch of Bitcoin users, and has a stack of blocks on top of it in the blockchain, it's there forever. Nobody can alter it, and thus alter your Bitcoin balance, without invalidating the hashes. That would be obvious evidence of tampering, which would make their copy of the ledger - the blockchain - obviously invalid. It wouldn't be picked up by other Bitcoin users, and wouldn't get mined blocks placed on top of it, and thus wouldn't last long at all.

Miners are heavily incentivized to only place blocks on valid ledgers. Placing a block on an invalid ledger would be a waste of all the computing time they spent generating proof of work, since the block they generated would only be usable on that invalid chain. Bitcoin proponents think that this automatic anti-fraud system makes Bitcoin at least as reliable as traditional government-backed currencies (which combat fraud and forgery via the legal system). In any case, it's very cool.

## Demo

If you want a working javascript demo of a completely minimal blockchain (no proof-of-work, one write per block), I've written one [here](https://sgoedecke.github.io/blockchain-js-demo/). It clocks in at just over 90 lines of code, with no code-golf or external libraries. Sharing your blockchain with other nodes is left as an exercise for the reader: I provide a serialized version, which you can send to people via email/Facebook/carrier pigeon.

For a more fleshed-out demo, check out [Naivechain](https://github.com/lhartikk/naivechain), which is around ~200 lines of code but actually includes a P2P implementation with Docker.
