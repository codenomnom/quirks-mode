---
title: Lobotomized Own Selector
date: 2024-10-01
tags: [css]
---

`* + *`

Yeah, it sounds like something out of Harry Potter spin-off, but it's a real thing.
You might think I'm using the fancy name as a click bait (and you might be _partially_ right), but I also do believe it's helpful.
Heydon Pickering first mentioned it [ten years ago](https://alistapart.com/article/axiomatic-css-and-lobotomized-owls/),
but somehow it's still handy. I guess they liked the name, that's why [margin-trim](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-trim)
takes ages to finalize.

## yes, but why?

The owly magic shines when you have plenty of elements and you want to style _**most**_ of them.
Let's imagine you've got a menu and you'd like to have spacing around those buttons:

```css
nav ul li {
  margin-left: 1rem;
}
```

The first one would also have a margin.
There are plenty of ways to fix that, right?

```css
nav ul li:not(:first-child) {}
nav ul li:not(:first-of-type) {}
nav ul li + li {} /* or even li ~ li */
```

Now imagine nested items, like paragraphs with images!
Even worse - sometimes you'd need to know the type of element, or always play with `:first-child` and `:last-child`.

```css
/* okay that might not sound revolutionary */
nav ul * + * {}

/*
 * but how about this:
 * make all text elements have spacing between them
 * they might be headings, paragraphs, images, etc.
 */
.prose * + * {
  padding-bottom: 1rem;
}
```

It can get wild [quickly](https://css-tricks.com/spacing-the-bottom-of-modules/):
```css
.module p:last-child,
.module ul:last-child,
.module ol:last-child,
.module dl:last-child {
  /* losing battle */
  margin: 0;
}
```
