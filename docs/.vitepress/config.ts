import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/shindo/',
  title: "Shindo Life Docs",
  description: "ETEPHYM",
  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
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
    socialLinks: [
      { icon: 'github', link: 'https://github.com/etephym/shindo' }
    ]
  }
})