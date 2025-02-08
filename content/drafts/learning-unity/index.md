---
title: Learning Unity
description: 
order: 27
date: '2025-01-10'
---

- Initial choice - lots of versions, built in render, etc
- Hybrid between UI no-code and attached scripts. Need to work with both
- Everything attaches to a Scene
- Inside a Scene, everything is a Game Object (including the camera and the lighting)
- Game Objects have many attached Components
  - for instance, almost every one has a Transform, which gives it a position in the Scene
  - Filter/renderer to make it visible
  - Collider to add collision, and (e.g.) Rigidbody to add physics
  - Scripts to do game logic
  - Animators to do animations

- Scripts
  - Edit these in VSCode. Where the bulk of your logic lives. Each script belongs to a GameObject, and can reference other game objects by defining them (e.g. as targets) in the script & dragging them in the UI to connect them up
    - I think every class constant in the script is settable via the UI, actually
  - You inherit from `MonoBehavior` (why wouldn't you?)
  - It's a C# class with a bunch of hooks - Start for initialization, Update for per-frame logic, AfterUpdate for post-frame logic, etc. 
  - So for instance to handle moving your character around, you'd write a script and attach it to your character's GameObject such that
    - every Update it reads from your inputs (e.g. with `Input.GetAxis`) and calculates your character's speed, setting it on the `Transform` component via `transform.Translate`
    - For physics, you might want to use FixedUpdate (which updates on the physics clock, not per-frame)
  - Likewise, to follow your character with the camera, you write a script that changes the camera `transform` position every `Update` (or `AfterUpdate`, to avoid lag) to the character's position plus some xyz offset

- Animators
  - These are weird UI-driven flowchart state machines. They take in variables and apply a series of rules to determine the correct animation. They're built with `Animations` and `Transitions`
  - You drag all the animations you want into the Animator panel, then create transitions between them. Each transition has a condition (like speed > 0.1, or just `isMoving == true`)
  - In your scripts, you set `animator.speed` or `animator.isMoving`, which updates the variables in the animator
  - The animator then decides if/how to shift from the current active animation to any others (based on what transitions link the current animation to others, and what the relevant conditions are)

- UI
  - UI is constructed via the `Canvas` GameObject, to which you add `Panel` objects and `Text` and `Button` objects. The parent `Panel` for whatever menu needs to show up is toggled on or off (e.g. the HUD, the pause menu, or a dialogue menu)

- As a general point, Unity seems designed to expose a bunch of configuration variables on each component and make them tweakable while the game is running. No excuse for not spending time iterating to find the fun