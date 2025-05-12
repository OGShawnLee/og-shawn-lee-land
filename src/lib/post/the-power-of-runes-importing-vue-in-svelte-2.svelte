<script lang="ts" module>
  import { computed, ref } from '$lib/vue.svelte';

  function createCounter(initial: number) {
    const count = ref(initial);
    const double = computed(() => count.value * 2);
    return { count, double, increment: () => count.value++ };
  }
</script>

<script lang="ts">
  const counter = createCounter(10);
</script>

<div class="p-4 flex flex-col items-center justify-center border-y-2 border-stone-900">
  <div class="grid gap-4">
    <div class="flex gap-4">
      <output class="text-white"> Count: {counter.count.value} </output>
      <output class="text-white"> Double: {counter.double.value} </output>
    </div>
    <button class="h-12 px-4 border-y border-stone-900 text-white font-medium active:scale-97.5" onclick={counter.increment}>
      Increment
    </button>
  </div>
</div>
