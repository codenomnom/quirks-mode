---
title: Form METHOD amnesia
date: 2025-12-18
tags: [html, eslint]
---

I did another round of form testing in our project yesterday (it feels they are glitching daily, _aren't they_).
The login:

```jsx
<CustomForm form={form} onSubmit={onSubmit} className='yes-tailwind!'>
  <Input
    name='identifier'
    label='Username or Email'
    type='email'
    isDisabled={isLoading}
  />
  <Password name='password' label='Password' isDisabled={isLoading} />

  <div className='very-dangerously-red'>{form.serverError}</div>

  <FancyButton type='submit' isLoading={isLoading} className='mt-4'>
    {isLoading ? 'Logging in' : 'Login'}
  </FancyButton>
</CustomForm>
```

Not great, not terrible. Life's good. Until it's **not**. Server says:

```
GET /login?identifier=securitygod&password=Password123
```

## what I forgot (yes, again)

We made our project so damn fancy the Next.js/React bundle is in megabytes 😎
Which means if the user is that one fast clicker (the only one we've got), he's submitting the form (surely with auto complete) before hydration kicks in.

Browser says "lol, let's make fun of this retro dev" and adds all the data as query parameters because **the default submit method is `GET`**!

Browser history. Server logs. Referrer headers. That one analytics script I forgot was even running.
I'm 20 years into this career and still forgetting that HTML exists underneath React. Much wow.

Why is that? The year this was invented reminds me of Souls of Mischief's [93 'til Infinity](https://www.youtube.com/watch?v=fXJc2NYwHjw).
Are we really sticking with this forever, because "backward compatibility" (read: _no one actually bothers_)?

## the fix (so I don't forget again)

Surely, just add `method="post"` to **every, single, form, ever**. But hey, I'd forget that too, right?

`ESLint` to the rescue:

```js
// eslint-plugin-local-rules/form-method.js
module.exports = {
  meta: {
    messages: {
      missingMethod: 'Form with onSubmit must have method attribute'
    }
  },
  create(context) {
    return {
      JSXOpeningElement(node) {
        if (node.name.name !== 'form') return;
        const hasOnSubmit = node.attributes.some(a => a.name?.name === 'onSubmit');
        const hasMethod = node.attributes.some(a => a.name?.name === 'method');
        if (hasOnSubmit && !hasMethod) {
          context.report({ node, messageId: 'missingMethod' });
        }
      }
    };
  }
};
```

## note to my future self

Don't forget all the fancy goodies are still sugar-on-top to the same old rusty HTML. Everything works and looks great
on my Gbit fiber optic with 4ms ping, but real people travel in speed trains and internet is sometimes slow (once in a month).

Prioritize my post-it notes on my monitor - this one got really buried! 😟
