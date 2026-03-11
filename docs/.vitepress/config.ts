// =============================================================
// VitePress Site Configuration
// Docs: https://vitepress.dev/reference/site-config
// =============================================================

import { defineConfig }     from 'vitepress'
import { existsSync }       from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath }    from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// --- Logo auto-detection ---
// Drop any file named "logo.*" into docs/public/ — no code changes needed.
// Supported formats: png, jpg, jpeg, webp, svg
function resolveLogoPath(): string {
  const base = resolve(__dirname, '../public/logo')
  for (const ext of ['png', 'jpg', 'jpeg', 'webp', 'svg']) {
    if (existsSync(`${base}.${ext}`)) return `/logo.${ext}`
  }
  return '/logo.png' // fallback if no logo found
}

const logoPath = resolveLogoPath()

// =============================================================

export default defineConfig({

  // --- Site metadata ---
  base:          '/shindo/',
  lang:          'ru-RU',
  title:         'Shindo Life Docs',
  titleTemplate: ':title · Shindo Life',
  description:   'Guides, tier lists and mechanics for Shindo Life by ETEPHYM',

  // --- Build options ---
  appearance:      'dark',  // dark by default, user can toggle
  cleanUrls:       true,    // removes .html from URLs
  lastUpdated:     true,    // shows last-updated date on pages
  metaChunk:       true,    // splits page metadata into separate chunks (perf)
  ignoreDeadLinks: true,    // don't fail build on broken anchor links

  // --- HTML <head> tags ---
  head: [
    // Favicon — uses auto-detected logo path
    ['link', { rel: 'icon', href: `/shindo${logoPath}` }],

    // Google Fonts — Inter
    ['link', { rel: 'preconnect', href: 'https://fonts.googleapis.com' }],
    ['link', { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }],
    ['link', { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap', rel: 'stylesheet' }],

    // Mobile browser accent color
    ['meta', { name: 'theme-color', content: '#0d0d0d' }],

    // Open Graph — used by Discord, Telegram, etc. for link previews
    ['meta', { property: 'og:type',        content: 'website'                                           }],
    ['meta', { property: 'og:title',       content: 'Shindo Life Docs'                                 }],
    ['meta', { property: 'og:description', content: 'Guides, tier lists and mechanics for Shindo Life' }],
  ],

  // --- SEO sitemap (auto-generated on build) ---
  sitemap: {
    hostname: 'https://etephym.github.io/shindo/',
  },

  // --- Markdown options ---
  markdown: {
    lineNumbers: true,         // show line numbers in code blocks
    image: { lazyLoading: true }, // lazy-load images for performance
  },

  // =============================================================
  // Theme configuration
  // Docs: https://vitepress.dev/reference/default-theme-config
  // =============================================================
  themeConfig: {

    // --- Header ---
    logo:      logoPath,
    siteTitle: 'Shindo Life',

    // --- Top navigation bar ---
    nav: [
      { text: '🏠 Home', link: '/' },
      {
        text: '📚 Content',
        items: [
          { text: '📖 Guide',         link: '/guide' },
          { text: '💡 Tips & Tricks', link: '/tips'  },
        ],
      },
      {
        text: '🔗 Links',
        items: [
          { text: 'Discord',  link: 'https://discord.gg/cmCpgkb5zq'    },
          { text: 'Telegram', link: 'https://t.me/etephym'              },
          { text: 'GitHub',   link: 'https://github.com/etephym/shindo' },
        ],
      },
    ],

    // --- Sidebar ---
    // collapsed: true  → section is folded by default
    // badge types: 'tip' (green) | 'warning' (yellow) | 'danger' (red) | 'info' (blue)
    sidebar: [
      {
        text: '📚 Pages',
        items: [
          { text: 'Guide',         link: '/guide', badge: { type: 'tip',     text: 'Read'      } },
          { text: 'Tips & Tricks', link: '/tips',  badge: { type: 'warning', text: 'Important' } },
        ],
      },
      {
        text: '⚔️ Mechanics',
        collapsed: true,
        items: [
          { text: 'Mentor Passives', link: '/guide#пассивки-менторов'                                                },
          { text: 'Mentors',         link: '/guide#менторы',           badge: { type: 'tip',     text: 'Must Read' } },
          { text: 'Rep Bonus',       link: '/guide#rep-bonus-stats'                                                  },
          { text: 'Danger',          link: '/guide#danger'                                                           },
          { text: 'Races',           link: '/guide#расы'                                                             },
        ],
      },
      {
        text: '💊 Items',
        collapsed: true,
        items: [
          { text: 'Heals',     link: '/guide#хилки'    },
          { text: 'Throwable', link: '/guide#throwable' },
          { text: 'Weapons',   link: '/guide#weapons'   },
          { text: 'Companion', link: '/guide#companion' },
          { text: 'Martials',  link: '/guide#martials'  },
        ],
      },
      {
        text: '🧪 Skills',
        collapsed: true,
        items: [
          { text: 'Elements',      link: '/guide#elements',      badge: { type: 'danger', text: 'S+' } },
          { text: 'Kenjutsu',      link: '/guide#kenjutsu',      badge: { type: 'danger', text: 'S+' } },
          { text: 'Sub Abilities', link: '/guide#sub-abilities'                                          },
          { text: 'Sub Modes',     link: '/guide#sub-modes'                                              },
        ],
      },
      {
        text: '📋 Other',
        collapsed: true,
        items: [
          { text: 'Terms',        link: '/guide#термины',    badge: { type: 'info',    text: 'Beginners' } },
          { text: 'Shindo Rules', link: '/guide#shindo-rules'                                               },
          { text: 'Slot Bug',     link: '/guide#баг-слотов', badge: { type: 'warning', text: 'Important'  } },
        ],
      },
    ],

    // --- Right-side table of contents ---
    outline: {
      level: [2, 3],
      label: 'On this page',
    },

    // --- Local full-text search ---
    search: {
      provider: 'local',
      options: {
        miniSearch: {
          searchOptions: {
            fuzzy:  0.2,  // typo tolerance
            prefix: true, // match from start of word
          },
        },
        translations: {
          button: { buttonText: 'Search', buttonAriaLabel: 'Search' },
          modal: {
            displayDetails:   'Show detailed list',
            resetButtonTitle: 'Reset',
            backButtonTitle:  'Close',
            noResultsText:    'No results for',
            footer: {
              selectText:   'Select',
              navigateText: 'Navigate',
              closeText:    'Close',
            },
          },
        },
      },
    },

    // --- Edit link — shows "Edit this page on GitHub" ---
    editLink: {
      pattern: 'https://github.com/etephym/shindo/edit/main/docs/:path',
      text:    'Edit this page on GitHub',
    },

    // --- Prev / Next page buttons at bottom of each doc ---
    docFooter: {
      prev: '← Previous',
      next: 'Next →',
    },

    // --- Last updated timestamp ---
    lastUpdated: {
      text: 'Updated',
      formatOptions: {
        dateStyle: 'long',
        timeStyle: 'short',
      },
    },

    // --- UI labels ---
    externalLinkIcon:   true,             // shows ↗ icon on external links
    returnToTopLabel:   '↑ Back to top',
    sidebarMenuLabel:   'Menu',
    darkModeSwitchLabel: 'Theme',

    // --- Site footer ---
    footer: {
      message:   'Made with ❤️ by ETEPHYM',
      copyright: 'Shindo Life Docs © 2026',
    },

    // --- Social icons in top-right nav ---
    socialLinks: [
      { icon: 'github',   link: 'https://github.com/etephym/shindo'  },
      { icon: 'discord',  link: 'https://discord.gg/cmCpgkb5zq'       },
      { icon: 'telegram', link: 'https://t.me/etephym'                },
    ],
  },
})
