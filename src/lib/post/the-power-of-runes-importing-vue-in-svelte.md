---
title: "The Power Of Runes: Importing Vue in Svelte"
description: Learn how everything came to be.
slug: the-power-of-runes-importing-vue-in-svelte
date: '2025-05-12'
---

<script>
  import VueInSvelte1 from "./the-power-of-runes-importing-vue-in-svelte-1.svelte";
  import VueInSvelte2 from "./the-power-of-runes-importing-vue-in-svelte-2.svelte";
</script>

## The Dark Ages

In **2022**, I was escaping the hell that was **React**. Why do I have to install so many libraries? Why does creating a React project have to take so long? *(create-react-app nightmare)*. Why I can't have two root elements and why do I have to use a *fragment*? I could go on and on about how it sucked but let's say that the initial fresh air of switching from vanilla JavaScript to React was no more.

Then I began **searching for alternatives** and that's when I found **Vue**. It was such an amazing experience and what I really liked was *Composition API*. However, soon after that I found **Svelte** and it was love at first sight and we have become best friends ever since.

Not everything about Svelte was perfect. For instance the reactivity system was limited by the compiler inside the Svelte files and I had to use a completely different API outside of them with stores *(which was still very simple and intuitive experience)*. I missed Vue so bad that when I created my long dead **Malachite UI** *headless component library* I implemented my own crappy nightmarish port of Composition API.

If only a new Svelte version fixed the problem and introduced a way of decoupling reactivity from the Svelte file compiler.

## Svelte Runes: The Light After The Storm

Late **2023** saw the introduction of what Svelte 5 would be and surprise **Svelte Runes** introduced what we all had been longing for. And finally, importing Vue was a posssibility.

## Implementing Composition API in Svelte

Let's see now how to implement Vue in Svelte. Let's keep it simple by only focusing on the most essential primitives of Vue: `ref` and `computed`.

The `Ref` and `Computed` types really come in handy in our TypeScript code as we can use them in our typed code.

```ts
// vue.svelte.ts

export interface Ref<T> {
  value: T;
}

export interface Computed<T> {
  readonly value: T;
}

export function ref<T>(initial: T): Ref<T> {
  let state = $state(initial);
  return {
    get value() {
      return state;
    }, 
    set value(current: T) {
      state = current;
    }
  }
}

export function computed<T>(fn: () => T): Computed<T> {
  const state = $derived.by(fn);
  return {
    get value() {
      return state;
    }
  }
}
```

And just like that we can slap an *import vue* and create a very basic counter component.

```svelte
<!-- Counter.svelte -->

<script lang="ts">
  import { computed, ref } from "./vue.svelte"; // [!code highlight]

  const count = ref(10);
  const double = computed(() => count.value * 2);
</script>

<output> Count: {count.value} </output>
<output> Double: {double.value} </output>

<button onclick={() => count.value++}> Increment </button>
```

<VueInSvelte1 />

Svelte's reactivity system is based on **assignments**. When you assign a new value to a variable, Svelte automatically updates the DOM. By using get and set, you can intercept these assignments and integrate them with Svelte's reactivity offered by runes.

However, if you are critical you'll quickly notice that **using the plain `$state` and `$derived` runes get the job done with simpler code**. The real deal comes when you want to **abstract away your logic into small reusable *factory functions***. The problem with runes is that you would need to **return an object with a `get` and `set` for each reactive variable**, and with our Composition API port we remove that work by doing something like this.

```ts
//  counter.ts

import { computed, ref } from "./vue.svelte";

export function createCounter(initial: number) {
  const count = ref(initial);
  const double = computed(() => count.value * 2);
  return { count, double, increment: () => count.value++ };
}
```

And then we can refactor our original `Counter` component with our new `createCounter` factory function. Notice how the code has become much briefer as we have separated our *business logic* from our *view*.

```svelte
<!-- Counter.svelte -->

<script lang="ts">
  import { createCounter } from "./counter.ts";

  const counter = createCounter(10);
</script>

<output> Count: {counter.count.value} </output>
<output> Double: {counter.double.value} </output>

<button onclick={counter.increment}> Increment </button>
```

<VueInSvelte2 />

## Conclusion

Svelte Runes are a powerful addition to the Svelte ecosystem, enabling developers to create reactive logic that is **reusable**, **composable**, and **decoupled from the framework's compiler**. By leveraging `$state` and `$derived`, you can build APIs similar to Vue's Composition API, abstract business logic into factory functions, and create highly maintainable codebases. **With Runes, Svelte takes a significant step forward in making reactivity more accessible and versatile**.

I will play with Composition API and see how far I can push it. Stay tuned!