---
title: Image <code>bottom</code> margin
date: 2023-09-18
tags: [html]
---

Okay, this one got me good. It's one of the things I'm constantly amazed by, primarily because I often use libraries and CSS normalize/reset.

And then - boom, there's some weird margin beneath an image. No worries, I'm a magician - I apply the `margin-bottom: 0;` hack. Nothing happens 🤨

## Why?!

The reason turns out to be trivial. The `<img>` tag is an <a href="https://www.w3schools.com/html/html_blocks.asp" target="_blank">inline element</a>. Which means it has its vertical alignment defaulting to baseline. It reserves some white space underneath for the descenders (hanging part of letters like `y`, `p`, `q`, etc.)

Fun, no?

## Vertical align to the rescue!
An easy way to solve the issue is setting `vertical-align` to `bottom`:

Beware that not all values for `vertical-align` would work, and some would affect on where your images end up showing.

## Inline block?
Another common and relatively simple solution is to display the image not as an inline element but as an `inline-block`.
