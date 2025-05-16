---
title: Building a Funny Error Component
description: Learn to build a funny error component inspired on Lucide.
slug: building-a-funny-error-component
date: '2025-05-16'
---

<script>
  import MousePosition from "./building-a-funny-error-component-1.svelte";
  import WindowWidth from "./building-a-funny-error-component-2.svelte";
  import Rabbit from "./building-a-funny-error-component-3.svelte";
</script>

**Lucide Svelte** is a component library I always include in my project. When there are more than a thousand icons to choose I usually find myself reaching out for the documentation page for the icon I need. And when I search for an icon that does not exist I am presented with a **funny icon of an animal that moves in the direction of your mouse**. You can see it with your own beautiful eyes right [here](https://lucide.dev/icons/?search=huh%3F).

And today, we are implementing it in our codebase using **Composition API**.

<Rabbit />

## Tracking Mouse Coordinates

First, since we need to **track the mouse position**, and for that we are going to need a window event listener called *"mousemove"*. Now, the way you would do that is with the method `window.addEventListener` and in Svelte you have to ensure this runs on the browser where the `window` object is defined, otherwise it will throw a massive error in the server.

We used to have the `onMount` built-in function prior to Svelte 5 for handling this situation as it takes a callback function that only runs when the component is mounted in the browser. However, now we handle this with the `$effect` rune. This rune takes a callback function and runs it either when the component is mounted or a reactive variable (`$state` or `$derived`) changes.

So we would do something like this.

```svelte
<script>
  $effect(() => {
    window.addEventListener("mousemove", (event) => {
      // Handle Mouse Move
    });
  })
</script>
```

Now we need to get the position of the mouse and store it somewhere. Where? You guessed it, in a `ref`. If you thought a `$state` rune would be our pick then you need to go read the last phrase of the introduction my son and maybe read my previous blogs about **Composition API in Svelte** just in case. 

We need a reference for the x and y coordinate and we get them from the `event`, with the properties `clientX` and `clientY`. You can see the code right below. 

```svelte
<script>
  import { ref } from "./vue.svelte"; // [!code ++]

  // [!code ++:2]
  const x = ref(0);
  const y = ref(0);

  $effect(() => {
    window.addEventListener("mousemove", (event) => {
      // [!code ++:2]
      x.value = event.clientX;
      y.value = event.clientY;
    });
  })
</script>
```

Normally, I would show the code running here, showcasing how I track your mouse coordinates. There is something left to tackle and that is *side-ffects* and *memory-leaks*.

You see, adding is an event listener is a side effect that consumes resources of the browser and we have to **clear it once we no longer need to track the mouse position**. And the way to do that is by calling the `window.removeEventListener` method with both the name of the event listener (`"mousemove"`) and the `function` handler. But where do we call this method? Well, *Rich Harris is very smart* and the `$effect` function can handle this situation. **A function returned from the `$effect` callback will be called when the component is destroyed (that's when we no longer the listener)**.

```svelte
// [!code ++:1] 
<script lang="ts"> // We use TypeScript here for the MouseEvent type.
  import { ref } from "./vue.svelte"; 

  const x = ref(0);
  const y = ref(0);

  function onMouseMove(event: MouseEvent) {
    x.value = event.clientX;
    y.value = event.clientY;
  }

  $effect(() => {
    window.addEventListener("mousemove", onMouseMove); // [!code highlight]
    return () => window.removeEventListener("mousemove", onMouseMove); // [!code ++]
  })
</script>

<output> X: {x.value}</output>
<output> X: {y.value}</output>
```

<MousePosition />

## Tracking Window Width

**Tracking the window width** is the next problem to tackle. Why? Because lil'homie rabbit changes the direction it is looking whenever you mouse goes to the other direction of the window. Rabbit is in the middle of the screen horizontally, so well take that into account later on.

So let's track it, we can achieve building up on what we've already done. This we add a window listener for the `"resize"` event as the **window dimensions change when the browser is resized**.

```svelte
<script lang="ts">
  import { ref } from "./vue.svelte"; 

  const width = ref(0);

  function onResize() {
    width.value = window.innerWidth;
  }

  $effect(() => {
    width.value = window.innerWidth;
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  })
</script>

<output> Width: {width.value}</output>
```

<WindowWidth />

And everything together would look like this. Notice we have put both listeners inside the same `$effect` rune even though we could have left every listener in their own rune. **It is better to group all the code that needs the component to be mounted in the same `$effect` call**.

```svelte
<script lang="ts">
  import { Rabbit } from "lucide-svelte";
  import { ref } from "./vue.svelte"; 

  const width = ref(0);
  const x = ref(0);
  const y = ref(0);

  function onMouseMove(event: MouseEvent) {
    x.value = event.clientX;
    y.value = event.clientY;
  }

  function onResize() {
    width.value = window.innerWidth;
  }

  // [!code highlight:9]
  $effect(() => {
    width.value = window.innerWidth;
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
    }
  })
</script>
```

## Habemus Rabbit

We have a way to both track the mouse position and the window width. Now it is time to talk about the template. 

First, we need the icon so we import it from `"lucide-svelte"` and make it big with a size of `256`.

```svelte
<!-- Rabbit.svelte -->

<script lang="ts">
  import { Rabbit } from "lucide-svelte"; // [!code highlight]
</script>

<Rabbit size={256} /> // [!code highlight]
```

The next thing to achieve is the icon changing direction. For that we are going to use a class from **TailwindCSS** or **UnoCSS**.

The algorithm checks if the x value is greater than the half the window size, if this is true then the mouse is past half of the screen: **right side**, otherwise it is on the other half: **left side**. We return a class that rotates the icon for each direction.

```svelte
<!-- Rabbit.svelte -->

<script lang="ts">
  import { Rabbit } from "lucide-svelte";
  import { ref } from "./vue.svelte";

  const x = ref(0);
  const width = ref(0);
</script>

<Rabbit 
  class="transform {x.value > width.value / 2 ? 'rotate-0' : 'rotate-y-180'}"
  size={256} 
/> 
```

Everything together would look like this.

```svelte
<!-- Rabbit.svelte -->

<script lang="ts">
  import { Rabbit } from "lucide-svelte";
  import { ref } from "./vue.svelte";

  const x = ref(0);
  const width = ref(0);

  function onMouseMove(event: MouseEvent) {
    x.value = event.clientX;
    y.value = event.clientY;
  }

  function onResize() {
    width.value = window.innerWidth;
  }

  $effect(() => {
    width.value = window.innerWidth;
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
    }
  })
</script>

<Rabbit 
  class="transform {x.value > width.value / 2 ? 'rotate-0' : 'rotate-y-180'}" 
  size={256} 
  />
<div>
  <p>Error Inesperado</p>
  <div>
    <p>
      Ha ocurrido un error inesperado. Por favor, intente nuevamente más tarde.
    </p>
  </div>
  <a href="/">Pagina de Inicio</a>
</div>
```

<Rabbit />

## Improving With Composition


Le'ts see the power of Composition in actino by improving our codebase with small reusable bits of code that don't need to be bound to a single Svelte file.

### Abstracting Window Listener

Wouldn't it better to encapsulate adding a window event listener as we use this logic twice?

```svelte
<script lang="ts" module>
  // [!code ++:10]
  function useWindowListener<K extends keyof WindowEventMap>(
    event: K,
    callback: (this: Window, event: WindowEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ) {
    window.addEventListener(event, callback, options);
    return () => {
      window.removeEventListener(event, callback, options);
    };
  }
</script>

<script>
  const x = ref(0);
  const width = ref(0);

  $effect(() => {
    width.value = window.innerWidth;
    // [!code ++:7]
    const clearResize = useWindowListener("resize", (event) => {
      width.value = window.innerWidth;
    });
    const clearMouseMove = useWindowListener("mousemove", (event) => {
      x.value = event.clientX;
      y.value = event.clientY;
    });
    return () => {
      clearResize();
      clearMouseMove();
    }
  })
</script>
```

### Abstracting Window Width and Mouse Position

What if we want to abstract away both the tracking of the window width and the mouse position?

```svelte
<script lang="ts" module>
  function useWindowListener<K extends keyof WindowEventMap>(
    event: K,
    callback: (this: Window, event: WindowEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ) {
    window.addEventListener(event, callback, options);
    return () => {
      window.removeEventListener(event, callback, options);
    };
  }

  // [!code ++:13]
  function useMousePosition() {
    const x = ref(0);
    const y = ref(0);
 
    $effect(() => {
      return useWindowListener('mousemove', (event) => {
        x.value = event.clientX;
        y.value = event.clientY;
      });
    });
 
    return { x, y };
  }

  // [!code ++:12]
  function useWindowWidth() {
    const width = ref(0);
 
    $effect(() => {
      width.value = window.innerWidth;
      return useWindowListener('resize', () => {
        width.value = window.innerWidth;
      });
    });
 
    return width;
  }
</script>

<script>
  const width = useWindowWidth(); // [!code ++]
  const { x }= useMousePosition(); // [!code ++]
</script>
```

And then with separate files we end up with code looking like this.

```ts
// hook.svelte.ts

export function useWindowListener<K extends keyof WindowEventMap>(
  event: K,
  callback: (this: Window, event: WindowEventMap[K]) => any,
  options?: boolean | AddEventListenerOptions
) {
  window.addEventListener(event, callback, options);
  return () => {
    window.removeEventListener(event, callback, options);
  };
}

export function useMousePosition() {
  const x = ref(0);
  const y = ref(0);

  $effect(() => {
    return useWindowListener('mousemove', (event) => {
      x.value = event.clientX;
      y.value = event.clientY;
    });
  });

  return { x, y };
}

export function useWindowWidth() {
  const width = ref(0);

  $effect(() => {
    width.value = window.innerWidth;
    return useWindowListener('resize', () => {
      width.value = window.innerWidth;
    });
  });

  return width;
}
```

```svelte
<!-- Rabbit.svelte -->

<script>
  import { useMousePosition, useWindowWidth } from "./hook.svelte";

  const width = useWindowWidth();
  const { x }= useMousePosition();
</script>

<Rabbit 
  class="transform {x.value > width.value / 2 ? 'rotate-0' : 'rotate-y-180'}" 
  size={256} 
/>
<div>
  <p>Error Inesperado</p>
  <div>
    <p>
      Ha ocurrido un error inesperado. Por favor, intente nuevamente más tarde.
    </p>
  </div>
  <a href="/">Pagina de Inicio</a>
</div>
```

## Conclusion

Building a funny error component in Svelte is not only a **great way to add personality to your application**, but also an excellent exercise in leveraging modern reactive patterns and composition. By abstracting logic into reusable hooks like `useMousePosition` and `useWindowWidth`, you **keep your components clean, focused, and easy to maintain**. This approach demonstrates the power of the Composition API in Svelte, making it **simple to share and reuse logic** across your codebase. Whether you’re tracking mouse movement for a playful UI or handling more complex interactions, these patterns help you **write modular, scalable, and enjoyable** Svelte applications.