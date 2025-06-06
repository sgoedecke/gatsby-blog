---
title: Blockchain explained simply
description: As simple an explanation of blockchain as possible
order: 6
date: '2021-04-20'
tags: ["crypto", "explainers"]
---

A blockchain is a distributed database. Bitcoin, Ethereum and Dogecoin are all different databases. A blockchain node is a computer with an entire copy of that database on it (for Bitcoin, a few hundred GB).The Bitcoin blockchain stores a list of every transaction ever made with Bitcoin. People use that to figure out how many Bitcoins they have by replaying all the transactions in the right order. Doing it from scratch takes a while. You don’t need to do it from scratch every time you want to check your balance though, since you can replay all the new transactions on top. If you want to get a copy of the Bitcoin blockchain, any existing node will give you one.

Hashing is a way to turn a lot of content (like a list of a hundred transactions) into a single number (like 43709312103). You can’t turn that number back into the original list, but you can hash the same list of transactions as many times as you want and get the same number. Changing one letter of one transaction in the list will lead to an entirely different hash number.

A blockchain stores transactions in blocks of a hundred or so transactions at a time. Each new block is hashed alongside the hash result of the most recent block. This means anyone can verify that the entire chain of transactions hasn’t been tampered with. You can start from the first block of transactions, hash that, then hash the next block with the hash of the first block, and so on. If someone has snuck a transaction record into their copy of the blockchain (that transfers them a million Bitcoins) the hashes won’t match up and their chain won’t be valid.

When you buy something with Bitcoin, your Bitcoin client sends that transaction to all the Bitcoin nodes it knows about. It’s just a pending transaction at this point. When a node gets enough transactions to form an entire block, it hashes it (with the hash of the previous block), and adds that block to its copy of the blockchain. Adding a new block is called mining. Then it tells every node it knows about that a new block has been mined.

Mining a new block is a bit more complicated than that. As well as the list of transactions and the hash of the previous block, each block contains a long random bit of text called a nonce. The point of the nonce is to add a very tricky requirement for a block to be valid: its hash number must end with five zeroes. Remember that a tiny change to the contents of a block will result in a completely different hash. That means that by trying different nonces at random, you will eventually end up with one that causes the hash of the block to end in five zeroes. You have to try a lot of different nonces to get the right one (or get very, very lucky).

Every other mining node is competing to find the right nonce first, because mining a node lets you collect a small percentage of the transactions. That makes up the Bitcoin transaction fee. It gets written into the block as a transaction of its own. If a node wants to try and mine new blocks, it needs to have a lot of powerful computer cores so it can try millions of different nonces quickly. This is why Bitcoin miners buy a lot of expensive CPUs, and why Bitcoin mining consumes a lot of power globally. Every Bitcoin miner is doing exactly the same thing over and over: generating a new random nonce, then hashing it alongside the list of pending Bitcoin transactions to hunt for that precious five-zeroes hash number.

It takes a lot of work and effort to mine a block. But verifying that a new block is valid can be done in a tiny fraction of a second. Since hashing the same content will always result in the same hash number, any Bitcoin miner can re-run the hash with the new nonce and confirm that it really does end in five zeroes. Then the miner gives up on the current block and turns its effort to mining the next block of pending transactions.
