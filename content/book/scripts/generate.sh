# brew install pandoc basictex
# sudo tlmgr update --self --all
# sudo tlmgr install titlesec

pandoc --toc --toc-depth=2 -M pdf-engine=xelatex -M mainfont="Helvetica Neue" --pdf-engine=xelatex -V linestretch=1.25 -H content/book/breaks.tex --to=pdf -o content/book/book.pdf content/book/content.md