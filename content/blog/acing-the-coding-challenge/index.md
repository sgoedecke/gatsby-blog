---
title: Acing the coding challenge
description: Practical advice on writing a successful coding challenge
order: 8
date: '2020-12-25'
tags: ["interviewing"]
---

How do you write a successful coding challenge? Unlike some nightmare whiteboard interview scenarios, typically a coding challenge is not a particularly hard problem. The difficulty comes in achieving the requirements well, not in getting something to work. A working solution is table stakes. Candidates get approved or knocked back on the amount of polish. For this reason my most important piece of advice is this: *you should spend as much time on the challenge as possible*. If you have a week to submit and the challenge guidelines suggest it should take a few hours to complete, use the entire week. You will be competing against people doing the same thing, so restricting yourself to a fraction of that time is a serious handicap. To be clear, I don’t think this is fair. Companies should enforce shorter hard time limits to prevent this behaviour, and many do. But when they don’t, working on the challenge full-time will materially improve your chances.

What should you focus on when doing the challenge? You can answer this question by thinking about what the reviewers care about. Typically they aren’t looking to be dazzled by technical skill - that’s what the in-person interview round is for. At the coding challenge stage, they want to be reassured that you won’t be an unpleasant person to share a codebase with. *You want your challenge to relax its reviewers, not to stress them out*. Imagine or remember code reviews where you scanned the code, thought “ah yes, this is nice and clear, that’s how I would have solved it, cool”, and left an approval on the PR. That is the emotional reaction you want your code to evoke. Don’t try to impress them, surprise them, or do anything else that risks appearing like you’re doing something strange.

The first step in not appearing like you’re doing something strange is not to be doing anything strange in the first place. Before you start thinking about code, read the challenge requirements multiple times. Re-read them every couple of hours of work. Building a solution to the wrong problem is the worst mistake you can make, because it’s such a common mistake to make in actual engineering work. If reviewers decide that you’re prone to make that error, nothing will save you.

## How should you structure your program?

Aside from correctness, *the most important technical feature of your challenge is readability*. It’s not even close. Every moment reviewers spend trying to understand your code is a moment when they’ll be worrying that they’ll be doing this forever if you get hired. You should aim to write code that is as transparent as possible. A couple of pieces of advice flow from this.

First, make it immediately obvious where to start reading your code. In a language with conventions about entry points (`index.js`, `main.py`), make sure you follow those. If you have a lot of files, don’t crowd your root directory and force reviewers to scan through to find the place to start. If conventions dictate putting your entry point in a non-root directory, think about linking that file in your readme.

Second, have a readme. Invest a lot of time into making it clear, concise and well-written. This is one of your best opportunities to reassure your reviewers that you know how to communicate in a normal professional way. Include a one-line statement of what your program does, how to install and run it, how to run tests, and a very brief discussion of some design choices you made and what the tradeoffs are. Keep it short and conversational: reviewers don’t want to read multiple paragraphs of text, and they’ll worry that you won’t know how to write concisely.

Third, make your program’s control flow as obvious as possible. Your main function should fit on a single screen, and should read a lot like pseudocode. Don’t put a lot of helper functions in the file above the main function - extract those out so the first thing the reviewer sees is the overall structure of your program. Doing this is worth sacrificing some extensibility or isolation. For instance, suppose you’re asked to implement a CLI todo app. A first draft of your main function should look something like this:

```ruby
ui = UserInterface.new
data_store = DataStore.new

ui.print_greeting
loop do
  action = ui.print_options
  if action == ui.LIST_TODOS
    ui.display_todos(data_store.todos)
  else if action == ui.ADD_TODO
     new_todo = ui.prompt_todo
     data_store.save(new_todo)
  end
end
```

In a program that’s intended to live for a long time, you might structure this differently. You could implement a command pattern, or bring the control flow entirely within `UserInterface`, and so on. But in a coding challenge, these approaches make it harder for a reviewer to immediately see how your program works.

Fourth, write code like a responsible engineer, even if the challenge doesn’t explicitly tell you to. Add a lot of tests. Handle error cases. You want reviewers to feel like they won’t have to carefully review your code for missing tests or error cases if they do end up hiring you.

## What should you avoid?
Don’t pick technologies that will confuse your reviewers. Some coding challenges will say you can choose your best language, no matter what it is, but this is a half-truth. You should certainly choose a language you’re comfortable with. But if you know both Haskell and Python, you should be writing most of your coding challenge in Python, even if you’re better at writing Haskell. As usual, the principle here is to minimise the time reviewers need to spend understanding your code.

You should be leaning towards concise _technologies_ for the same reason: dynamic languages over statically-typed languages, Golang over Java. The simpler and shorter your main function, the better.

Avoid layers of abstraction that will make your code harder to follow. If a reviewer has to click through three files to see the implementation of `data_store.save`, they will start unconsciously seeing your code as complex and hard to understand. In a long-lived codebase, abstraction can have many advantages. In a coding challenge, it’s mostly a handicap.

Don’t do more than the challenge asks. Avoid implementing features that aren’t in the spec or picking an overly elaborate interpretation of a requirement. If the challenge says “display the results in some UI - a command-line print is fine”, don’t build a React SPA. There are three good reasons for this. First, it adds unnecessary code and forces reviewers to spend more time reading and understanding your challenge. Second, doing more than the spec is a common workplace mistake. Seeing that will make your reviewers nervous that you’ll do the same on the job. Third, a common in-person interview question is to extend your coding challenge in some way. If you’ve gone further than the spec, you might find it hard to adjust your code (or you might have already done the desired extension and have to face a hastily improvised question instead).

## Summary
Prioritise readability and clarity above almost everything else. You can show off in the in-person interview rounds, where it’s easier to read the room and make sure interviewers are following along. Aim to write code that’s familiar to the interviewers, and make absolutely sure you haven’t misread the requirements.

This advice won’t apply to all roles and all companies. If the coding challenge asks you to embrace abstractions or write the most performant code possible, do that instead of keeping it simple and straightforward. But in general it’s better to relax your reviewers than to dazzle or confuse them. If you can, spend a lot of time polishing. And write tests.


