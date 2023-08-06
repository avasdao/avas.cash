export default defineI18nConfig(() => ({
    legacy: false,
    locale: 'en',
    messages: {
        en: {
            welcome: 'Welcome',
        },
        fr: {
            welcome: 'Bienvenue',
        },
        tr: {
            welcome: 'Hoş geldin',
        },
        zh: {
            welcome: '欢迎',
        },
    },
    defaultLocale: 'en',
    locales: [
        {
            code: 'en',
            file: 'i18n/en.json',
        },
        {
            code: 'en-US',
            file: 'i18n/en.json',
        },
        {
            code: 'tr',
            file: 'i18n/tr.json',
        },
        {
            code: 'zh',
            file: 'i18n/zh.json',
        },
        {
            code: 'zh-CN',
            file: 'i18n/zh.json',
        },
    ]
}))
