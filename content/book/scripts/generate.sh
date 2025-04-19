# brew install pandoc basictex
# sudo tlmgr update --self --all
# sudo tlmgr install titlesec

pandoc \
  content/book/content.md \
  --toc \
  --toc-depth=2 \
  --pdf-engine=xelatex \
  -M title="Software Engineering after the Vibe Shift" \
  -M author="Sean Goedecke" \
  -M date="April 2025" \
  -V titlepage \
  -V mainfont="Helvetica Neue" \
  -V linestretch=1.25 \
  -V papersize:a5 \
  -V geometry:margin=20mm \
  -H content/book/breaks.tex \
  -o content/book/book.pdf