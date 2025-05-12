import adapter from '@sveltejs/adapter-static';
import { escapeSvelte, mdsvex } from 'mdsvex';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { createHighlighter } from 'shiki';
import { transformerNotationHighlight, transformerNotationDiff } from "@shikijs/transformers";

const highlighter = await createHighlighter({
	themes: ['vitesse-black'],
	langs: ['javascript', 'typescript', 'svelte'],
});

await highlighter.loadLanguage('javascript', 'typescript', 'svelte');


export default {
	preprocess: [vitePreprocess(), mdsvex({
		extensions: ['.md'],
		highlight: {
			highlighter: async (code, lang = 'text') => {
				const html = escapeSvelte(highlighter.codeToHtml(code, { 
					lang, 
					theme: 'vitesse-black',
					transformers: [
						transformerNotationHighlight({ classActiveLine: "highlighted", matchAlgorithm: "v3" }),
						transformerNotationDiff({ classLineAdd: "line-add", classLineRemove: "line-remove", matchAlgorithm: "v3" }),
					] 
				}))
				return `{@html \`${html}\` }`;
			}
		}
	})],
	kit: { adapter: adapter() },
	extensions: ['.svelte', '.md']
};