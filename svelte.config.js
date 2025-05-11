import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
	preprocess: [vitePreprocess(), mdsvex()],
	kit: { adapter: adapter() },
	extensions: ['.svelte', '.svx']
};