import { computed, ref } from "@vue/reactivity"

class GlobalStatus {
  #urls = ref([] as string[])

  /**
   * 当前请求数
   */
  public requestCount = computed(() => this.#urls.value.length)

  /**
   * 是否正在请求
   */
  public inReuqest = computed(() => {
    return this.requestCount.value > 0
  })

  incrementRequestCount(url: string) {
    this.#urls.value.push(url)
  }

  decrementRequestCount(url: string) {
    let index = this.#urls.value.indexOf(url)
    if (index > -1) {
      this.#urls.value.splice(index, 1)
    }
  }

  resetRequestCount() {
    this.#urls.value = []
  }

  /**
   * 获取特定 URL 的请求计数
   */
  getRequestCount(url: string): number {
    return this.#urls.value.filter((u) => u === url).length
  }

  static #instance: GlobalStatus

  static getInstance() {
    if (!GlobalStatus.#instance) {
      GlobalStatus.#instance = new GlobalStatus()
    }
    return GlobalStatus.#instance
  }
}

export { GlobalStatus }
