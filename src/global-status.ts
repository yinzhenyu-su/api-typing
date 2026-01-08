import { computed, ref } from "@vue/reactivity"

class GlobalStatus {
  #urls = ref(new Map<string, number>())

  /**
   * 当前请求数（总计数）
   */
  public requestCount = computed(() => {
    let total = 0
    this.#urls.value.forEach((count) => {
      total += count
    })
    return total
  })

  /**
   * 是否正在请求
   */
  public inRequest = computed(() => {
    return this.requestCount.value > 0
  })

  incrementRequestCount(url: string) {
    const count = this.#urls.value.get(url) || 0
    this.#urls.value.set(url, count + 1)
  }

  decrementRequestCount(url: string) {
    const count = this.#urls.value.get(url) || 0
    if (count > 1) {
      this.#urls.value.set(url, count - 1)
    } else if (count === 1) {
      this.#urls.value.delete(url)
    }
  }

  resetRequestCount() {
    this.#urls.value.clear()
  }

  /**
   * 获取特定 URL 的请求计数
   */
  getRequestCount(url: string): number {
    return this.#urls.value.get(url) || 0
  }

  /**
   * 直接获取 inRequest 的布尔值（无需 .value）
   */
  getInRequest(): boolean {
    return this.inRequest.value
  }

  /**
   * 直接获取请求计数值（无需 .value）
   */
  getRequestCountValue(): number {
    return this.requestCount.value
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
