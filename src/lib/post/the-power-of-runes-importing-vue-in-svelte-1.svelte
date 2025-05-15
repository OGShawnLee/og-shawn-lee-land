<script lang="ts">
	import { Code } from '$lib/components';
	import { computed, ref } from '$lib/vue.svelte';

	const count = ref(10);
	const double = computed(() => count.value * 2);
</script>

<Code>
	<div class="grid gap-4">
		<div class="flex gap-4">
			<output class="text-white"> Count: {count.value} </output>
			<output class="text-white"> Double: {double.value} </output>
		</div>
		<button class="code-button" onclick={() => count.value++}> Increment </button>
	</div>
</Code>
