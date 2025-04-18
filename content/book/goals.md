why am I writing a book?

higher reach
more legible impact
easily shareable content
unifiying a lot of my similar/repeated posts into a single canonical "here's everything I think about X" snapshot

NOT to make money
I might put a price on it anyway just to signal value (maybe a "email me for a free copy" disclaimer)

pdf? epub? pdf for printing, for sure

will need an editing pass, for sure - otherwise lots of duplication

entire blog corpus is 71k words (!). I guess maybe half will make it in, so ~35k or 40k?

brew install pandoc basictex

pandoc --from=gfm --toc --pdf-engine=xelatex --to=pdf -o content/book/book.pdf content/book/content.md