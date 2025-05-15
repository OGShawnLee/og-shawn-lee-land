<script lang="ts" module>
	import type { Computed, Ref } from '$lib/vue.svelte';
	import { computed, ref } from '$lib/vue.svelte';

	function useWindowListener<K extends keyof WindowEventMap>(
		event: K,
		callback: (this: Window, event: WindowEventMap[K]) => any,
		options?: boolean | AddEventListenerOptions
	): void {
		$effect(() => {
			window.addEventListener(event, callback, options);
			return () => {
				window.removeEventListener(event, callback, options);
			};
		});
	}

	function useListener<K extends keyof HTMLElementEventMap>(
		event: K,
		element: Ref<HTMLElement | null>,
		callback: (this: HTMLElement, event: HTMLElementEventMap[K]) => any,
		options?: boolean | AddEventListenerOptions
	): void {
		$effect(() => {
			if (element.value) {
				element.value.addEventListener(event, callback, options);
				return () => {
					element.value?.removeEventListener(event, callback, options);
				};
			}
		});
	}

	function useCursorCoordinates() {
		const x = ref(0);
		const y = ref(0);

		useWindowListener('mousemove', (event) => {
			x.value = event.clientX;
			y.value = event.clientY;
		});

		return { x, y };
	}

	function useCounter(initial: number) {
		const count = ref(initial);
		const incrementer = ref<HTMLElement | null>(null);
		const decrementer = ref<HTMLElement | null>(null);

		useListener('click', incrementer, () => count.value++);
		useListener('click', decrementer, () => count.value--);

		return { count, incrementer, decrementer };
	}
</script>

<script lang="ts">
	import { Code } from '$lib/components';

	const { x, y } = useCursorCoordinates();
	const { count, incrementer, decrementer } = useCounter(15);
</script>

<Code>
	<div class="grid gap-4">
		<div class="flex justify-center gap-4">
			<output class="text-white"> Count: {count.value} </output>
		</div>
		<div>
			<button class="code-button" bind:this={incrementer.value}> Increment </button>
			<button class="code-button" bind:this={decrementer.value}> Decrement </button>
		</div>
	</div>
</Code>
