surprising llm capabilites are products

generating cryptic crossword clues - at least quiptics - is new

gpt-5 can, but the groq models can't. interesting

verifier flow didn't look useful until i tried different models, then it was very useful

responses take a LONG time with the default reasoning_effort=medium
but low-reasoning is just not good enough to come up with the clue. you get bullshit

how expensive is it to generate a crossword?

of course, build the actual crossword with normal code

generating clues for a particular device is tricky, but if you don't force devices you end up with low variety (e.g. "hidden" is easy and the model will go for it disproportionately). ended up with a fallback after one failure to "any device you want"

quiptic is easier than cryptic for models, for sure

python a natural choice because efficient crossword grid generation and .puz parsing/output have mature libraries - simple as that
interesting note - pre-LLMs, I might still have picked a more familiar language with less mature libraries, but now I have zero hesitation going with Python

