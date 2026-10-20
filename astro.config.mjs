import { defineConfig } from 'astro/config';
import { readFile } from 'node:fs/promises';

export default defineConfig({
  output: 'static',
  vite: {
    plugins: [{
      name: 'project-overlay-raw',
      enforce: 'pre',
      load: {
        order: 'pre',
        async handler(id) {
          if (!/\/src\/content\/projects\/[^/]+\/image_overlay_text\.md(?:\?raw)?$/.test(id)) return;
          // Vite also loads the bare file while processing ?raw in dev.
          const filePath = id.replace(/\?raw$/, '');
          this.addWatchFile(filePath);
          return `export default ${JSON.stringify(await readFile(filePath, 'utf8'))};`;
        },
      },
    }],
  },
  image: {
    endpoint: {
      entrypoint: './src/media/devImageEndpoint.ts',
    },
  },
});
