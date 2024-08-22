import { getDefinition } from "../outdir/api-meta-init.js" // 这里需要导入生成的 api-meta-init.js 文件

// 获取 openapi 数据并保存为 json 和 ts 文件，用于后续测试
const init = async () => {
  await getDefinition({
    jsonSchemaPath:
      "https://raw.githubusercontent.com/yinzhenyu-su/api-typing/main/assets/pet.json",
    jsonCachePath: "./api-typing-meta.openapi.json",
  })

  await getDefinition({
    jsonSchemaPath: "./api-typing-meta.openapi.json",
  })
}

init()
