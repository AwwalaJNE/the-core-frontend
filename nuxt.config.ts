import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: { enabled: true },
    vite: {
        plugins: [tailwindcss()],
    },
    imports: {
        dirs: [
            // Scan top-level composables
            '~/composables',
            // ... or scan composables nested one level deep with a specific name and file extension
            '~/composables/*/index.{ts,js,mjs,mts}',
            // ... or scan all composables within given directory
            '~/composables/**',
        ],
    },
})
