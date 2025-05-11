import { defineConfig } from 'unocss/vite';
import {
	presetWind3,
	presetWebFonts,
	transformerDirectives,
	transformerVariantGroup
} from 'unocss';

export default defineConfig({
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