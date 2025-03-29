import { defineConfig } from 'vitepress'
import { docsAuto } from '@yicode/yidocs-auto';

let { sideBar, navBar } = docsAuto();

navBar = navBar.map((nav) => {
  if (nav.items?.length === 1) {
    return {
      text: nav.text,
      link: nav.items[0].link
    }
  }
  return nav
})

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lastUpdated: true,
  outDir: './dist',
  srcDir: './markdown',
  title: "My Awesome Project",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    nav: [...navBar],
    sidebar: {...sideBar},

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
