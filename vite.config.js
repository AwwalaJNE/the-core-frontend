import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue2'
import path from 'path'

export default defineConfig({
    plugins: [
        vue({
            // Force use of runtime + compiler version
            template: {
                compilerOptions: {
                    whitespace: 'condense',
                },
            },
        }),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            // Add this to ensure Vue uses the runtime + compiler version
            vue: path.resolve(__dirname, './node_modules/vue/dist/vue.esm.js'),
        },
        extensions: ['.js', '.vue', '.json'],
    },
    server: {
        host: '0.0.0.0',
        port: 3000,
        strictPort: true,
        open: false,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
        },
        proxy: {
            '/sequence-orion': {
                target: 'http://10.18.3.36:9763/services/omc.HTTPEndpoint/f_moc_seq_no',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/sequence-orion/, ''),
            },
        },
    },
    build: {
        sourcemap: true, // Change this to true temporarily to debug
        rollupOptions: {
            output: {
                entryFileNames: `[name].[hash].js`,
                chunkFileNames: `[name].[hash].js`,
                assetFileNames: `[name].[hash].[ext]`,
            },
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@use "@/scss/style.scss" as *;`,
            },
        },
    },
    // Add this to handle potential compatibility issues
    optimizeDeps: {
        include: ['vue', 'vue-router', 'vuex', 'axios'],
    },
})
