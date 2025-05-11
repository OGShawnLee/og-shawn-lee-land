<script>
	import 'virtual:uno.css';
	import '@unocss/reset/tailwind.css';
</script>

<slot />

<style>
	:global(body) {
		--uno: 'min-h-screen bg-black font-switzer text-#E2CCCC';
	}
</style>
