---
title: 'Quotes are "classy", CSS said'
date: 2024-11-23
tags: [css]
---

The `quotes` property is CSS's way of saying, "I'm cultured."

Ancient, yet forgotten, it controls the quotation marks, because regular quotes... pff, too mainstream! Works on `q` elements, or `content` property (`open-quote` and `close-quote`):

<q style="quotes: '«' '»'">I got fancy!</q>

```html
quotes: "«" "»" "‹" "›";
```

<q style='quotes: "«" "»" "‹" "›"'>Voilà! You mastered <q>the art of quotes</q> in French!</q>

Selecting the text you'd see quotes are not part of it - they're automagically added. As per <a href="https://developer.mozilla.org/en-US/docs/Web/CSS/quotes" target="_blank">the docs</a> you can define multiple open and closing pairs, so you can really go wild.
