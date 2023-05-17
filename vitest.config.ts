import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigpaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), tsconfigpaths()],
	test: {
		globals: true,
		environment: 'jsdom',
		setupFiles: './test/setup.ts',
	},
});
