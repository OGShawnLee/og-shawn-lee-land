import { defineConfig } from 'unocss/vite';
import {
	presetWind3,
	presetWebFonts,
	transformerDirectives,
	transformerVariantGroup
} from 'unocss';

export default defineConfig({
	shortcuts: {
		"link": "hover:text-red-500 transition-colors duration-300",
		"container": "max-w-2xl mx-auto px-4",
	},
	transformers: [transformerDirectives({ applyVariable: '--uno' }), transformerVariantGroup()],
	presets: [
		presetWind3(),
		presetWebFonts({
			provider: 'fontshare',
			fonts: {
				"nippo": "Nippo",
        "switzer": "Switzer",
        "general": "General Sans",
			}
		})
	]
});