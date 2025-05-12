<script lang="ts">
  import { computed, ref } from '$lib/vue.svelte';

  const count = ref(10);
  const double = computed(() => count.value * 2);
</script>

<div class="p-4 flex flex-col items-center justify-center border-y-2 border-stone-900">
  <div class="grid gap-4">
    <div class="flex gap-4">
      <output class="text-white"> Count: {count.value} </output>
      <output class="text-white"> Double: {double.value} </output>
    </div>
    <button class="h-12 px-4 border-y border-stone-900 text-white font-medium active:scale-97.5" onclick={() => count.value++}>
      Increment
    </button>
  </div>
</div>
