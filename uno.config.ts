import { defineConfig } from 'unocss/vite';
import {
	presetWind3,
	presetWebFonts,
	transformerDirectives,
	transformerVariantGroup
} from 'unocss';

export default defineConfig({
	content: {
		pipeline: {
			include: ["src/**/*.{html,svelte,svx}"],
		}
	},
	shortcuts: {
		"link": "hover:text-red-500 transition-colors duration-300",
		"container": "max-w-2xl mx-auto px-4",
		"code-button": "h-12 px-4 border border-stone-900 text-white font-medium active:scale-97.5"
	},
	transformers: [transformerDirectives({ applyVariable: '--uno' }), transformerVariantGroup()],
	presets: [
		presetWind3(),
		presetWebFonts({
			provider: 'fontshare',
			fonts: {
				"azeret": "Azeret",
				"jm": "JetBrains Mono",
				"jetbrains": "Jet Brains Mono",
				"britney": "Britney",
				"nippo": "Nippo",
        "switzer": "Switzer",
        "general": "General Sans",
			}
		})
	]
});