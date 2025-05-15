<script lang="ts" module>
	import { Code } from '$lib/components';
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

<Code>
	<div class="grid gap-4">
		<div class="flex gap-4">
			<output class="text-white"> Count: {counter.count.value} </output>
			<output class="text-white"> Double: {counter.double.value} </output>
		</div>
		<button class="code-button" onclick={counter.increment}> Increment </button>
	</div>
</Code>
