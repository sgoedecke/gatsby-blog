---
title: What's the point of C2PA?
description: 
order: 205
date: '2026-07-04'
tags: ["debugging"]
---

The [European Union AI Act](https://artificialintelligenceact.eu/) is Europe's attempt to comprehensively regulate AI usage. A big part of that is the requirement that AI-generated content be identifiable: either tagged with a watermark or with what the [Act](https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content) calls "digitally signed metadata"[^1]. I recently discussed AI watermarking at length in [_Text AI watermarks will always be trivial to remove_](https://www.seangoedecke.com/text-ai-watermarks/). What about digitally signed metadata? How does that work?

The most well-known implementation of digitally signed metadata is C2PA Content Credentials, which [claims](https://c2paviewer.com/articles/eu-ai-act-content-credentials) to be the technology that the AI Act gives as an example[^2] of how to do signed metadata properly. Let's just start with images, since that's the easiest case. The idea here is that **every single image file should contain unspoofable authorship metadata**.

### How C2PA signing works

When an AI tool generates an image, that tool should include a "made by ChatGPT" disclaimer in that images' metadata. Likewise, when a camera takes a photo, that camera should include a "taken by a camera" disclaimer. C2PA uses two strategies to protect this metadata:

1. The metadata must be _signed_ by some trusted private key
2. The metadata contains a hash of the file's contents, so you can't copy an existing signature onto a new file

Each physical camera (or phone) has its own private key, for obvious reasons[^3]. How do we know that those millions of private keys are trusted? Via [PKI](https://en.wikipedia.org/wiki/Public_key_infrastructure), like HTTPS: each camera's private "certificate" (which contains its private key) is signed by the manufacturer's well-known private key, so the chain of authenticity can be verified as long as you have (say) Apple's root [public key](https://www.apple.com/certificateauthority/)[^4].

What happens if you then edit your photo in Photoshop? Photoshop will leave the camera's metadata untouched, but will layer a "also, Photoshop was used" piece of metadata over the top, signed with Adobe's private key (well, with the private key associated with your official copy of Photoshop, which is signed by Adobe's official private key).

Likewise, if you ask ChatGPT to generate an image for you, ChatGPT will sign its "made by ChatGPT" metadata with OpenAI's private key. In theory, every single image could contain unforgeable C2PA metadata, allowing software like Twitter to trivially distinguish real photos from fake ones.

### C2PA needs more regulation to boost adoption

**Right now, C2PA does not have anything like the adoption it'd need to work.** It's hard to find hard data on how many images in the wild use C2PA, but FotoForensics [reports](https://www.hackerfactor.com/blog/index.php?%2Farchives%2F1010-C2PAs-Butterfly-Effect.html) around a dozen per week (so around 150 a year, out of the [900,000](https://hackerfactor.com/blog/index.php?%2Farchives%2F1088-Fourteen-and-Video.html) images processed in total). This is even worse than it sounds, because basically all of the signed images are AI-generated. The adoption rate of C2PA for human-generated images is much, much lower: Google's Pixel 10 is the only phone camera to sign photos by default. The iPhone [doesn't sign](https://c2pa.ai/smartphone-guide) photos. 

If almost all AI images are C2PA-signed, but almost no human-generated images are, consumers have no reliable way of identifying AI content, because anyone who wants to pretend their AI content is human can simply remove the signature. For C2PA to succeed, it needs to be on every camera and every phone, so that a photo with no signature is rare and suspicious.

Is that realistic? Actually, I think it is. The appetite (at least in the EU) to regulate AI will increase over time, and while the current EU AI Act only mandates that AI-images are tagged (which by itself is useless), it's plausible that some future regulation will enforce tagging of all images.

Another adoption problem that must be solved for C2PA to work is **preservation**. Right now, if you download a C2PA-tagged image, send it as a Facebook message, then re-download it, the C2PA manifest is stripped out. Most images we see on the internet have passed through some social media asset server at least once. All of these social media companies would need to update how they re-encode image content in order to preserve the C2PA data[^5]. This would almost certainly require more regulation: C2PA adds tens or [hundreds](https://www.tbray.org/ongoing/When/202x/2024/10/29/Lane-Provenance) of kilobytes to each file, which at social media scale is big money[^6].

### Forging C2PA signatures

Could a clever attacker forge a C2PA signature? Kind of. Neal Krawetz, who seems to have led the anti-C2PA charge, [points out](https://www.hackerfactor.com/blog/index.php?/archives/919-Closed-Standards.html) that with a camera development kit it's straightforward to trick a digital camera into thinking that it's taking an image when in fact it's being fed one. This is very much not my area, so please write in if you know more about camera hardware and you think I got this wrong.

If you exclude physical attacks on a digital camera, I think C2PA is more robust. You can [sign](https://www.hackerfactor.com/blog/index.php?%2Farchives%2F1010-C2PAs-Butterfly-Effect.html) a photo with a self-signed certificate, but the C2PA [spec](https://spec.c2pa.org/specifications/specifications/2.4/specs/C2PA_Specification.html#_trust_lists) and [docs](https://opensource.contentauthenticity.org/docs/conformance/trust-lists) say that validators must check that your certificate bubbles up to the official C2PA [trust list](https://spec.c2pa.org/conformance-explorer/). This list currently contains only 26 certificates, and there's a whole process for being added to it. That'll slow down adoption, but at least it makes it hard to forge[^7].

### Other file types

We've been talking exclusively about images, but it's more or less the same story for any type of content. If the file doesn't support JUMBF metadata (say, an Excel file or a PDF), then the C2PA metadata has to live in a "sidecar": a separate `.c2pa` file, probably on some Microsoft or Adobe content server, which contains the signed checksum and the data about who created the file.

However, the distinction between "real" and AI-generated content is fuzzier when you're not talking about images. Here's a trivial example: if I ask ChatGPT to create an Excel spreadsheet for me, the file will be tagged as AI-generated, but I can simply copy/paste the content into a new Excel doc and save it, which will tag it as human-generated[^8]. There's no software tool that can identify when I'm retyping some AI-generated text (except for perhaps [text fingerprinting](/text-ai-watermarks/), which has its own raft of issues).

### Conclusion

C2PA is probably here to stay. But it isn't useful now, and won't be useful until two huge programs of technical work are completed:

- Every camera manufacturer (including phones) must C2PA-sign all images by default
- Every social media company must retain the C2PA metadata on uploaded images

This will be a long organizational process, since each manufacturer must go through the approvals process (or decide to start their own competing system), evaluate the legal ramifications of storing attribution data in images, and so on. It will be a long technical process, because C2PA metadata is a substantial fraction of image sizes: storing it could add multiple _exabytes_ of content.

Of course, just because C2PA isn't useful doesn't mean we're not all going to do it. Lots of companies are under pressure to signal that they care about AI safety and to head off regulatory attack. "We're cryptographically signing AI-generated content" is a compelling "we're doing _something_" pitch, particularly for people who aren't technically savvy enough to understand the limitations. In the near term, I expect large AI-involved companies to invest a substantial amount of engineering effort in C2PA-related activity.

In the long run, once everyone gets on board, I think C2PA could end up working well. It's awkward in some ways and imperfect, but there are no glaring problems that make it unworkable.


[^1]: See sub-measure 1.1.1 of the Act's associated [Code of Practice](https://digital-strategy.ec.europa.eu/en/policies/code-practice-ai-generated-content).

[^2]: I'm a little puzzled by this claim. The contents of the Act and the Code of Practice don't contain "C2PA" or "Content Credentials" (you can search for yourself [here](https://explorer.artificialintelligenceact.eu/en/)). But it's such a weird thing to lie about that I have to believe I'm missing something. Maybe an initial draft of the Code of Practice did reference C2PA?

[^3]: Otherwise if you cracked the key out of one Sony camera, you could spoof content from any Sony camera.

[^4]: In practice there are usually more "links in the chain": a device will be signed by some intermediate certificate, which in turn will be signed by another intermediate certificate, which will be signed by the root certificate. That's because the root key is so valuable. If an intermediate private key leaks, it can be revoked and replaced (via the root key), but if the root key leaks, it would take _years_ to rebuild the network of trust. So almost all signing is done by intermediates, and the root key stays on a USB drive locked in a safe somewhere.

[^5]: Not to mention that the whole _point_ of C2PA is that these social media companies will be displaying a "human or AI" sticker in their UI, which will require retaining the metadata.

[^6]: C2PA allows for storing the manifest _content_ as a separate `.c2pa` file, and just including a manifest _url_ in the image metadata itself, but that doesn't solve the cloud provider problem: they still have to store all the `.c2pa` files on-disk somewhere.

[^7]: I think this defuses Neal Kravetz's ["worst-case scenario"](https://www.hackerfactor.com/blog/index.php?/archives/1013-C2PAs-Worst-Case-Scenario.html). I downloaded his forged image, and (as expected) it gets flagged as "signed, but we don't trust the root". I think Kravetz was right at the time, though, since the official "trust list" was only launched in mid-2025.

[^8]: You _could_ do the same thing with images by copying into Photoshop or Paint, but while that'd obscure the AI source, it would still be clear that the photo wasn't taken by a camera.