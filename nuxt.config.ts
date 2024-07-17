// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    vite: {
        css: {
            preprocessorOptions: {
                scss: {
                    additionalData:
                        '@import "@/style/variables.scss";@import "@/style/mixins.scss";',
                },
            },
        },
    },

    compatibilityDate: "2024-04-03",
    devtools: { enabled: false },

    components: [
        {
            path: "~/components",
            pathPrefix: false,
        },
    ],

    modules: ["@nuxt/image", "@pinia/nuxt"],
    pinia: {
        storesDirs: ["./store/**"],
    },
    app: {
        head: {
            bodyAttrs: { style: "height: 100%; margin:0; padding: 0;" },
        },
    },

    css: ["@/style/font.scss", "@/style/global.scss"],
});
