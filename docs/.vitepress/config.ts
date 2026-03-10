import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/shindo/',
  lang: 'ru-RU',
  title: "Shindo Life Docs",
  description: "Гайды и советы по Shindo Life от ETEPHYM",
  appearance: 'dark',
  cleanUrls: true,
  lastUpdated: true,

  head: [
    ['link', { rel: 'icon', href: '/shindo/logo.jpg', type: 'image/jpeg' }]
  ],

  sitemap: {
    hostname: 'https://etephym.github.io/shindo/'
  },

  markdown: {
    lineNumbers: true
  },

  themeConfig: {
    logo: '/logo.jpg',

    nav: [
      { text: 'Главная', link: '/' },
      { text: 'Guide', link: '/guide' },
      { text: 'Tips & Tricks', link: '/tips' }
    ],

    sidebar: [
      {
        text: 'Shindo Life',
        items: [
          { text: 'Guide', link: '/guide' },
          { text: 'Tips & Tricks', link: '/tips' }
        ]
      }
    ],

    outline: {
      level: [2, 3],
      label: 'На этой странице'
    },

    search: { provider: 'local' },

    externalLinkIcon: true,

    returnToTopLabel: 'Наверх',
    sidebarMenuLabel: 'Меню',
    darkModeSwitchLabel: 'Тема',

    footer: {
      message: 'Shindo Life Docs by ETEPHYM'
    },

    lastUpdated: { text: 'Обновлено' },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/etephym/shindo' },
      { icon: 'discord', link: 'https://discord.gg/cmCpgkb5zq' },
      { icon: 'telegram', link: 'https://t.me/etephym' }
    ]
  }
})
