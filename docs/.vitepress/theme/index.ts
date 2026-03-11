// =============================================================
// VitePress Theme Entry Point
//
// Active features:
//   NProgress    → loading bar on page transitions
//   Breadcrumb   → "Home › Page" path shown above content
//   ReadingTime  → word count + estimated read time
//
// Layout slots reference:
//   https://vitepress.dev/guide/extending-default-theme#layout-slots
// =============================================================

import DefaultTheme from 'vitepress/theme'
import { h }        from 'vue'
import type { EnhanceAppContext } from 'vitepress'

// Plugin: NProgress page transition loading bar
import vitepressNprogress           from 'vitepress-plugin-nprogress'
import 'vitepress-plugin-nprogress/lib/css/index.css'

// Components injected into the doc layout
import Breadcrumb  from './components/Breadcrumb.vue'
import ReadingTime from './components/ReadingTime.vue'

// Global styles
import './custom.css'

export default {
  extends: DefaultTheme,

  // 'doc-before' slot → renders above the page markdown content
  Layout() {
    return h(DefaultTheme.Layout, null, {
      'doc-before': () => h('div', { class: 'doc-tools' }, [
        h(Breadcrumb),
        h(ReadingTime),
      ]),
    })
  },

  enhanceApp(ctx: EnhanceAppContext) {
    DefaultTheme.enhanceApp(ctx)
    vitepressNprogress(ctx)
  },
}
