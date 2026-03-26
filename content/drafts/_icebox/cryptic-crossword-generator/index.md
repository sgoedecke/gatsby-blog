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

structured json is not really any better but is 2x more expensive

• - Removed REVERSAL, DELETION, and HOMOPHONE from the allowed device set (quiptic_generator/
    config.py) so crossword fills and the CLI now restrict generation to ANAGRAM, HIDDEN, CONTAINER,
    CHARADE, and DOUBLE_DEFINITION.



agentic vs pipelined
---


Across:
1. Company about heart (4) [solution: CORE; device: charade]
2. Opposed to insect, I [solution: ANTI; device: charade]
3. Greatest dress for mother (7) [solution: MAXIMUM; device: charade]
4. Night before river is always (4) [solution: EVER; device: charade]
5. Fabric judge, English article (4) [solution: JEAN; device: charade]

Down:
1. National about sex appeal, one calm (7) [solution: CITIZEN; device: charade]
6. Improve hen, cane twisted (7) [solution: ENHANCE; device: anagram]
7. Declines when official employs [solution: REFUSES; device: charade]

Saved .puz to puzzles/agentic-quiptic-7x7-7x7-20251115-220653.puz
Time: 612.38s | Tokens: 105883 | LLM cost: $0.3764
seangoedecke@Seans-MacBook-Pro quiptic-generator % uv run python -m quiptic_generator --crossword --agentic --model gpt-5.1


---

Across:                                                                      1. Solid if RM is rearranged (4) [solution: FIRM; device: ANAGRAM]           2. Test party holding me (4) [solution: DEMO; device: CONTAINER]
3. Numbers prominent people (7) [solution: FIGURES; device: DOUBLE_DEFINITION]
4. Breakfast staples found in eggshells (4) [solution: EGGS; device: HIDDEN] 5. Sued wildly, second-hand (4) [solution: USED; device: ANAGRAM]                                                                                         Down:                                                                        1. Attentive centre with education (7) [solution: FOCUSED; device: CHARADE]  6. Checks again about opinions (7) [solution: REVIEWS; device: CHARADE]
7. Retaliation from minister heading east, keeping engineering (7) [solution: REVENGE; device: CONTAINER]

Saved .puz to puzzles/quiptic-7x7-7x7-20251115-221344.puz
Time: 365.66s | Tokens: 70690 | LLM cost: $0.5498
NON-AGENTIC