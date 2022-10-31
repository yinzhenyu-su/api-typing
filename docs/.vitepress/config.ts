import { defineConfig } from "vitepress"

export default defineConfig({
  lang: "zh-Hans",
  title: "Api-Typing",
  description: "一个强类型提示的 http 客户端(基于 axios)",
  themeConfig: {
    nav: [
      // { text: "快速上手", link: "/start/quick-start" },
      // {
      //   text: 'Dropdown Menu',
      //   items: [
      //     { text: 'Item A', link: '/item-1' },
      //     { text: 'Item B', link: '/item-2' },
      //     { text: 'Item C', link: '/item-3' },
      //   ],
      // },
    ],

    sidebar: [
      {
        text: "开始",
        items: [
          { text: "简介", link: "/start/introduction" },
          { text: "快速上手", link: "/start/quick-start" },
        ],
      },
      {
        text: "基础",
        items: [
          { text: "创建实例", link: "/basic/api-typing-instance" },
          { text: "请求参数", link: "/basic/request" },
          { text: "响应参数", link: "/basic/response" },
        ],
      },
    ],
    footer: {
      copyright: `Made with love @yinzhenyu-su`,
    },
  },
})
