---
title: Timezoned unix timestamps
date: 2024-10-11
tags: [js, date]
---

```ts
// TL;DR
const time = Math.floor(now.getTime() / 1000) + now.getTimezoneOffset() * 60;
```

---

A JavaScript's [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) love/hate letter.

**Use case**: I received a date from an external source (backend) in a UNIX timestamp format
(number of seconds since January 1st, 1970, shortly named `UTC`).
I wanted to know if that timestamp is in the future or in the past
(so that I could validate a [JWT](https://jwt.io) token).

But the server's time was in different timezone than mine. Which caused issues even though
I was using [epoch](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#the_epoch_timestamps_and_invalid_date) time:

```ts
const date: number = payload.date; // server's date
console.log(date); // 172863765
console.log(Date.now()); // 1728648454925
```

---

Long story short - regardless of what you do with your current date, you will still get UTC time **including**
your timezone difference. Making both timestamps work withouth a timezone (GMT) required some manipulation:

```ts
const now = new Date();

// time elapsed since January 1st, 1970 in MILLISECONDS
const localTimeSinceEpoch = now.getTime(); // 1728648454925

// timezone difference IN MINUTES 🤯
const timezoneOffset = now.getTimezoneOffset(); // -180

// let's talk the same language - SECONDS
const timezonedTimestamp = Math.floor(localTimeSinceEpoch / 1000);
const offsetInSeconds = timezoneOffset * 60;
const timeSinceGMTEpoch = timezonedTimestamp + offsetInSeconds;

// everything's in seconds, let's compare
if (tokenExpiry < timeSinceGMTEpoch) {
  // not yet expired!
}
```
