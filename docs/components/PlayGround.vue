<template>
  <div id="play-ground" class="playground"></div>
</template>
<script lang="ts" setup>
import sdk from "@stackblitz/sdk"
import { onMounted } from "vue"

onMounted(() => {
  sdk.embedProjectId("play-ground", "vitejs-vite-f483qv", {
    width: "100%",
    height: "700px",
    forceEmbedLayout: true,
    view: "editor",
    hideDevTools: true,
    devToolsHeight: 0,
    terminalHeight: 0,
    openFile: "src/main.ts",
  })
})
</script>
<style scoped>
.playground {
  width: 100%;
}
</style>
