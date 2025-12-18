---
title: CSS has counters, I have regrets
date: 2025-12-10
tags: [css]
---

CSS has had counters since forever. You know, `counter-reset`, `counter-increment`, that whole thingy.
In theory, pure CSS can count things and generate your fancy (or weird) numbered lists on its own.
Except the syntax is from 1998 and feels like you're trying to "hack the Gibson"[^1].

I needed nested numbering for a legal document. You know, something like:

```
I. Whereas CSS has existed since 1996
  A. The Counter feature was introduced in 1998
    1. And has remained incomprehensible since
      1.1 Despite numerous attempts at understanding
      1.2 And several rage quits
    2. But despite all that
      2.1 We're still trying!
II. What's our last resort
  A. JavaScript numbering out lists?
    1. Oh, crap..
```

I was _hoping_ this the exact use case this feature should handle. But his is the mess I ended up with:

```css
& > ol { /* top level list: I, II, III... */
  list-style: upper-roman;
  & > li {
    margin: 2rem 0;
    &::marker {
      font-weight: bold;
    }

    & > ol { /* second level list: A, B, C... */
      padding-left: 3rem;
      list-style: upper-alpha;
      & > li {
        margin: 2rem 0;

        & > ol { /* third level list: 1, 2, 3... */
          padding-left: 3rem;
          list-style: decimal;
          counter-reset: cr;
          & > li {
            margin: 1.5rem 0;
            counter-increment: cr;

            & ol { /* fourth level list: 1.1, 1.2, 1.3... */
              counter-reset: cr;
              padding-left: 2rem;
              & > li {
                margin: 1rem 0;
                list-style: none;
                counter-increment: cr;
                position: relative;

                &:before {
                  content: counters(cr, '.') '. ';
                  position: absolute;
                  margin-right: 100%;
                  right: 6px; /* space between counter and text */

                  /* here I cry */
```

The first three levels use normal list-style because they're, you know, _sane_.
And this is just four levels. The spec _says_ you can nest counters infinitely.
In reality? I don't know how to make `I.A.1.a.i` happen without _sacrificing a goat_ to the CSS gods 😅

Yeah, I figured the `counters(section, ".")`, but by the time I ended on the MDN page I was so done with this sh*t that I just ditched it and went with my nested mess above.

It just feels like watching another Next.js conference demo, showcasing **basic** usage, and then - 💥 good luck to you, buddy, hopefully not getting `css-counters2shell`[^2]!

CSS has counters, and I have regrets about my career choices. No one sane enough can fight this syntax and win!

---

[^1]: Not getting this? Congrats on being born after '95. The rest of us are tired old f*rts... [Hackers, the movie](https://www.youtube.com/watch?v=Bmz67ErIRa4)
[^2]: I made that up, but I'd hate another issue like [CVE-2025-55182](https://react2shell.com/)
