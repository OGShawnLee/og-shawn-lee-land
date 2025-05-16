<script lang="ts">
  import { Code } from "$lib/components";
  import { ref } from "$lib/vue.svelte"; 

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

<Code>
	<div class="grid gap-4">
		<div class="flex gap-4">
			<output class="text-white"> X: {x.value} </output>
			<output class="text-white"> Y: {y.value} </output>
		</div>
	</div>
</Code>
