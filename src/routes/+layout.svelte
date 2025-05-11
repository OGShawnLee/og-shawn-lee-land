<script>
	import 'virtual:uno.css';
	import '@unocss/reset/tailwind.css';
	import { fade } from 'svelte/transition';

	export let data;
</script>

<header class="fixed top-0 inset-x-0 bg-black/80 backdrop-filter backdrop-blur-md z-10">
	<div class="container h-20 flex items-center justify-end">
		<nav class="flex gap-8">
			<a class="link" href="/">Me</a>
			<a class="link" href="/blog">Blog</a>
		</nav>
	</div>
</header>

{#key data.url}
	<main class="container h-full py-24 md:py-32" in:fade={{ duration: 300 }}>
		<div class="grid gap-8">
			<slot />
		</div>
	</main>
{/key}

<style>
	:global(body) {
		--uno: 'min-h-screen bg-black font-nippo text-#E2CCCC';
	}
</style>
