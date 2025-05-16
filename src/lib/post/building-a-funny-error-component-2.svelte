<script lang="ts">
	import { Code } from '$lib/components';
	import { ref } from '$lib/vue.svelte';

	const width = ref(0);

	function onResize() {
		width.value = window.innerWidth;
	}

	$effect(() => {
		width.value = window.innerWidth;
		window.addEventListener('resize', onResize);
		return () => window.removeEventListener('resize', onResize);
	});
</script>

<Code>
	<div class="grid gap-4">
		<div class="flex gap-4">
			<output class="text-white"> Width: {width.value} </output>
		</div>
	</div>
</Code>
