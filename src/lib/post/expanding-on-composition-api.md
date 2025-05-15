---
title: Expanding On Composition API
description: Learn how everything came to be.
slug: expanding-on-composition-api
date: '2025-05-13'
---

<script>
  import Counter1 from "./expanding-on-composition-api-1.svelte";
  import Name1 from "./expanding-on-composition-api-2.svelte";
  import Counter2 from "./expanding-on-composition-api-3.svelte";
</script>

## Reactivity With Classes

**I used to be a die-hard *Object-Oriented-Programming* hater back in the day**, however **things have changed ever since I began studying *Software Engineering*** as a career. Third semester, in the second half of **2024**, I had to take OOP as a class and learn a *boilerplate driven programming language designed for writing verbose object oriented instant legacy code*. Then, now my fourth semester, on one hand I have **Software Design** where I've learnt *design patterns* and in **Software Construction**. **I eventually grew to appreciate Java and object-oriented-programming**.

And if you didn't know. The Svelte compiler automatically adds the setters and getters for classes when we define a field with a rune.

```svelte
<!-- Counter.svelte -->

<script lang="ts" module>
  export class Counter {
    public count = $state(0); // [!code highlight]
    public double = $derived(this.count * 2); // [!code highlight]

    public constructor(initial: number) {
      this.count = initial;
    }

    public increment(this: Counter) {
      this.value++;
    }
  }
</script>

<script>
  const counter = new Counter(10);
</script>

<output> Count: {counter.count.value} </output>
<output> Double: {counter.double.value} </output>

<button onclick={() => counter.increment()}> Increment </button>
```

<Counter1/>

If you are like me, you won't like the fact that we have to create an arrow function to call the increment method as passing it directly to the handler won't work because of JavaScript being JavaScript. An event handler changes the context of `this` to the element the handler has been attached, losing the reference of the class instance. 

I like to solve that problem it by making the constructor private and adding an **`static create`** method that receives that acts as the constructor and does the folllowing:

1. Creates an instance of the class by calling the constructor.
2. Binds each method of that instance by calling the function **`bind`** method.
3. Returns that instance.

```svelte
<script lang="ts" module>
  export class Counter {
    public count = $state(0); 
    public double = $derived(this.count * 2); 

    private constructor(initial: number) { // [!code highlight]
      this.count = initial;
    }

    public increment(this: Counter) {
      this.count++;
    }

    // [!code ++:5]
    public static create(initial: number) {
      const counter = new Counter(initial);
      counter.increment = counter.increment.bind(counter);
      return counter;
    }
  }
</script>

<script>
  const counter = Counter.create(10); // [!code highlight]
</script>

<output> Count: {counter.count} </output>
<output> Double: {counter.double} </output>

<button onclick={counter.increment}> Increment </button>
```

<Counter1 />

## Runes vs Composition API in Classes

In my last blog I implemented a small port of Composition API and **I would use it instead of runes in classes**. And here's why.

### Handling State Initialization

State variables must be initialised directly as an instance field, otherwise it will raise a compiler error. The problem is for both the `state` and `derived` runes.

```ts
// Counter.ts

export class Counter {
  public count: number;

  public constructor(initial: number) {
    this.count = $state(initial); // [!code error]
  }
}
```

The issue arises when you need to initialize a state variable or a derived variable in a class, but the value cannot be set directly as a default field. This is common when the initial value depends on constructor arguments or external data.

With Composition API this is not an issue as you can declare the type of a field with our handy `Ref` and `Computed` types and then initalize them in the constructor.

```svelte
<!-- Person.svelte -->

<script lang="ts" module>
  import type { Computed, Ref } from '$lib/vue.svelte';
  import { computed, ref } from '$lib/vue.svelte';

  export class Person {
    // [!code highlight:3]
    public name: Ref<string>;
    public lastName: Ref<string>;
    public fullName: Computed<string>;

    // [!code highlight:9]
    public constructor(name: string, lastName: string) {
      this.name = ref(name);
      this.lastName = ref(lastName);
      this.fullName = computed(() => {
        const clearName = this.capitalize(this.name.value).trim();
        const clearFinalName = this.capitalize(this.lastName.value).trim();
        return clearName + " " + clearFinalName;
      });
    }

    private capitalize(str: string): string {
      return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
  }
</script>

<script lang="ts">
	const person = new Person('Shawn', 'Lee');
</script>

<output> Name: {person.name.value} </output>
<output> Last Name: {person.lastName.value} </output>
<output> Full Name: {person.fullName.value} </output>

<input
  type="text"
  bind:value={person.name.value}
  placeholder="Name"
  maxlength="16"
/>
<input
  type="text"
  bind:value={person.lastName.value}
  placeholder="Last Name"
  maxlength="16"
/>
```

<Name1 />

### Composability

There is a reason for Composition API to be called that way. We can pass around a `ref` or ``computed` around our entire codebase and build highly reactive pieces of code like a `useListener` hook that takes a `ref` to an `HTMLElement` and automatically adds and removes a given listener to it. 

```svelte
<script lang="ts" module>
  import type { Computed, Ref } from '$lib/vue.svelte';
  import { computed, ref } from '$lib/vue.svelte';

  function useListener<K extends keyof HTMLElementEventMap>(
    event: K,
    element: Ref<HTMLElement | null>, // [!code highlight]
    callback: (this: HTMLElement, event: HTMLElementEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void {
    // [!code highlight:8]
    $effect(() => {
      if (element.value) {
        element.value.addEventListener(event, callback, options);
        return () => {
          element.value?.removeEventListener(event, callback, options);
        };
      }
    });
  }

  function useCounter(initial: number) {
    const count = ref(initial);
    const incrementer = ref<HTMLElement | null>(null);
    const decrementer = ref<HTMLElement | null>(null);

    // [!code highlight:2]
    useListener('click', incrementer, () => count.value++);
    useListener('click', decrementer, () => count.value--);

    return { count, incrementer, decrementer };
  }
</script>

<script lang="ts">
  const { count, incrementer, decrementer } = useCounter(15);
</script>

<output> Count: {count.value} </output>

<button bind:this={incrementer}> Increment </button>
<button bind:this={decrementer}> Decrement </button>
```

<Counter2 />

## Conclusion

Exploring the Composition API approach in Svelte reveals its strengths in flexibility, composability, and code organization (especially when compared to using runes directly in classes). By leveraging `ref` and `computed`, you can easily encapsulate reactive state and logic, pass them around your codebase, and build reusable hooks like `useListener`. This not only makes your code more **modular and maintainable but also enables patterns familiar to developers from other reactive frameworks**. Ultimately, the Composition API style empowers you to write cleaner, more scalable Svelte applications while enjoying the full power of reactivity.