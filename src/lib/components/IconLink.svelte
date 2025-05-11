<script lang="ts">
	import type { Icon } from 'lucide-svelte';

	export let href: string;
	export let icon: string | typeof Icon;
	export let small = false;
  export let label: string;
</script>

<a class="link w-fit flex items-center gap-2 text-white" class:text-sm={small} target="_blank" {href}>
	{#if typeof icon === 'string'}
		<i class="bx {icon} text-lg"></i>
	{:else}
		<svelte:component this={icon} size={20} />
	{/if}
	{label}
</a>
