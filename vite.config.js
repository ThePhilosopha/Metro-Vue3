import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import svgLoader from 'vite-svg-loader'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ mode }) => {
  if (mode === 'lib') {
    // Library build configuration
    return {
      plugins: [vue(), svgLoader()],
      build: {
        lib: {
          entry: fileURLToPath(new URL('./src/components/MetroTile.vue', import.meta.url)),
          name: 'VueMetroTile',
          fileName: 'vue-metro-tile',
        },
        rollupOptions: {
          external: ['vue'],
          output: {
            globals: {
              vue: 'Vue',
            },
          },
        },
      },
    }
  }

  // Demo/development configuration
  return {
    plugins: [vue(), svgLoader()],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      outDir: 'docs',
    },
  }
})