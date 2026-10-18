negative requirements
knowing what requirements to ignore is as important as knowing what requirements to satisfy
s3 works because it ignores [atomic multi-key updates]
preforking servers works because it ignores [shared mutable state between server instances] - specifically unicorn also ignores [slow client handling] and can thus be very simple indeed
edge cache fanout works because it ignores [up to date data]
statsd works because it can drop data and hence can use UDP
sqlite can work from a single file because it ignores [concurrent writes]
cursor's git impl works because it ignores [keeping replicas up to date/fast reads]


identifying what can slip (what can be stale, what can be slow, what can be inflexible) is usually the key to an elegant design, because it can turn a weakness into a strength (e.g. by tolerating stale data you can avoid having keep the hot path up to date, and avoid having to elect a leader, etc - https://cursor.com/blog/git-at-any-scale is a neat example)

this requires business context more than technical context, but it also requires technical context to understand the business effects of X operation having Y consistency/performance qualities

this obviously has huge ramifications for LLMs, which will assume the most restrictive set of unstated requirements - e.g. what happens when an admin gets demoted mid-request? in every system i've worked on it's fine to just let the request succeed, but LLMs will assume this is a correctness bug and implement complexity to fix it
