<script lang="ts" module>
	import { ref } from '$lib/vue.svelte';

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
	import { Home, Rabbit } from 'lucide-svelte';
	import { Code } from '$lib/components';
	import { IconLink } from '$lib/components';

	const width = useWindowWidth();
	const { x } = useMousePosition();
</script>

<Code>
	<Rabbit
		class="transform opacity-25 -z-10 {x.value > width.value / 2 ? 'rotate-0' : 'rotate-y-180'}"
		size={256}
		strokeWidth={1}
	/>
	<div class="flex flex-col items-center gap-4">
		<p class="text-3xl font-medium">Error Inesperado</p>
		<div>
			<p class="text-center">
				Ha ocurrido un error inesperado. Por favor, intente nuevamente más tarde.
			</p>
		</div>
		<IconLink href="/" label="Pagina de Inicio" icon={Home} />
	</div>
</Code>
