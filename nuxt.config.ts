// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    /* Application Settings */
    app: {
        /* Application Header */
        head: {
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            title: `Ava's Cash`,
            meta: [
                { name: 'description', content: 'Best Crypto Experience (CX) For Your Money®' },
            ],
            link: [
                { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
            ],
            script: [
                { src: '/js/matomo.js' },
            ],
        },
    },

    /* Application Modules */
    modules: [
        /* Tailwind CSS */
        '@nuxtjs/tailwindcss'
    ],
})
