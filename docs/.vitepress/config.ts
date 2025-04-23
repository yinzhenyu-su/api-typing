import { defineConfig } from "vitepress"

export default defineConfig({
  lang: "zh-Hans",
  title: "Api-Typing",
  description: "一个强类型提示的 http 客户端(基于 axios)",
  themeConfig: {
    nav: [
      { text: "快速上手", link: "/start/quick-start" },
      { text: "演练场", link: "/start/play-ground" },
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
          {
            text: "使用 stringifyOptions 自定义序列化",
            link: "/basic/stringify-options",
          },
        ],
      },
      {
        text: "高级",
        items: [
          {
            text: "类型提取",
            items: [
              {
                text: "提取请求body类型",
                link: "/pro/extract-request-body-json",
              },
              { text: "提取响应参数类型", link: "/pro/extract-response-json" },
              {
                text: "提取请求路径参数类型",
                link: "pro/extract-request-params-json",
              },
              {
                text: "提取查询字符串类型",
                link: "/pro/extract-request-query-json",
              },
            ],
          },
          {
            text: "切换 mock",
            link: "/pro/switch-mock",
          },
          {
            text: "使用 Axios 命名空间",
            link: "/pro/axios-namespace",
          },
          {
            text: "使用 ApiTypingMeta 自定义类型",
            link: "/pro/customize-type",
          },
          {
            text: "使用 AxiosFactory 自定义实例",
            link: "/pro/axios-factory",
          },
        ],
      },
      {
        text: "Q&A",
        link: "/question/qa",
      },
    ],
    footer: {
      copyright: `Made with love @yinzhenyu-su`,
    },
  },
})
