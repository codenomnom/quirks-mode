---
title: Image bottom margin
date: 2023-01-03
draft: true
tags:
- html
---

Have you ever seen your images having weird margin bottoms without knowing why? And setting `margin-bottom: 0` doesn't help, right?

The reason is that an image is an `inline element`, with a vertical alignment defaulting to baseline. That means it reserves some white space underneath for the descenders (hanging part of letters like `y`, `p`, `q`, etc.)

## Vertical align to the rescue!
An easy way to solve the issue is setting `vertical-align` to `bottom`:

Beware that not all values for `vertical-align` would work, and some would have an effect on where your images end up showing.

## Inline block?
Another common and relatively simple solution is to display the image not as an inline element but as an `inline-block`.
