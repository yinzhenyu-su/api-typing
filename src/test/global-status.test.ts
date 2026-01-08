import { test, expect, describe, beforeEach } from "vitest"
import { GlobalStatus } from "../global-status"

describe("GlobalStatus", () => {
  let status: GlobalStatus

  beforeEach(() => {
    // 每个测试前重置状态
    status = GlobalStatus.getInstance()
    status.resetRequestCount()
  })

  describe("singleton pattern", () => {
    test("should return the same instance", () => {
      const instance1 = GlobalStatus.getInstance()
      const instance2 = GlobalStatus.getInstance()
      expect(instance1).toBe(instance2)
    })

    test("should be the same instance across multiple calls", () => {
      const instance1 = GlobalStatus.getInstance()
      const instance2 = GlobalStatus.getInstance()
      const instance3 = GlobalStatus.getInstance()
      expect(instance1).toBe(instance2)
      expect(instance2).toBe(instance3)
    })
  })

  describe("incrementRequestCount", () => {
    test("should increment request count for a URL", () => {
      status.incrementRequestCount("/api/users")
      expect(status.requestCount.value).toBe(1)
      expect(status.inRequest.value).toBe(true)
    })

    test("should increment request count for multiple URLs", () => {
      status.incrementRequestCount("/api/users")
      status.incrementRequestCount("/api/posts")
      status.incrementRequestCount("/api/comments")
      expect(status.requestCount.value).toBe(3)
      expect(status.inRequest.value).toBe(true)
    })

    test("should increment request count for duplicate URLs", () => {
      status.incrementRequestCount("/api/users")
      status.incrementRequestCount("/api/users")
      status.incrementRequestCount("/api/users")
      expect(status.requestCount.value).toBe(3)
      expect(status.inRequest.value).toBe(true)
    })
  })

  describe("decrementRequestCount", () => {
    test("should decrement request count for an existing URL", () => {
      status.incrementRequestCount("/api/users")
      status.incrementRequestCount("/api/posts")
      status.decrementRequestCount("/api/users")

      expect(status.requestCount.value).toBe(1)
      expect(status.inRequest.value).toBe(true)
    })

    test("should remove URL from tracking when count reaches zero", () => {
      status.incrementRequestCount("/api/users")
      status.decrementRequestCount("/api/users")

      expect(status.requestCount.value).toBe(0)
      expect(status.inRequest.value).toBe(false)
    })

    test("should handle decrement on non-existent URL gracefully", () => {
      status.incrementRequestCount("/api/users")
      status.decrementRequestCount("/api/nonexistent")

      expect(status.requestCount.value).toBe(1)
      expect(status.inRequest.value).toBe(true)
    })

    test("should handle decrement on URL with multiple instances", () => {
      status.incrementRequestCount("/api/users")
      status.incrementRequestCount("/api/users")
      status.decrementRequestCount("/api/users")

      expect(status.requestCount.value).toBe(1)
      expect(status.inRequest.value).toBe(true)
    })
  })

  describe("resetRequestCount", () => {
    test("should reset all request counts", () => {
      status.incrementRequestCount("/api/users")
      status.incrementRequestCount("/api/posts")
      status.incrementRequestCount("/api/comments")

      status.resetRequestCount()

      expect(status.requestCount.value).toBe(0)
      expect(status.inRequest.value).toBe(false)
    })

    test("should clear all tracked URLs", () => {
      status.incrementRequestCount("/api/users")
      status.incrementRequestCount("/api/posts")

      status.resetRequestCount()

      status.incrementRequestCount("/api/new")
      expect(status.requestCount.value).toBe(1)
      expect(status.getRequestCount("/api/users")).toBe(0)
      expect(status.getRequestCount("/api/new")).toBe(1)
    })
  })

  describe("getRequestCount", () => {
    test("should return correct count for a specific URL", () => {
      status.incrementRequestCount("/api/users")
      status.incrementRequestCount("/api/users")
      status.incrementRequestCount("/api/posts")

      expect(status.getRequestCount("/api/users")).toBe(2)
      expect(status.getRequestCount("/api/posts")).toBe(1)
      expect(status.getRequestCount("/api/nonexistent")).toBe(0)
    })

    test("should return 0 for URL not in tracking", () => {
      status.incrementRequestCount("/api/users")

      expect(status.getRequestCount("/api/other")).toBe(0)
    })

    test("should return correct count after increment and decrement", () => {
      status.incrementRequestCount("/api/users")
      status.incrementRequestCount("/api/users")
      status.decrementRequestCount("/api/users")

      expect(status.getRequestCount("/api/users")).toBe(1)
    })
  })

  describe("requestCount computed property", () => {
    test("should return 0 when no requests", () => {
      expect(status.requestCount.value).toBe(0)
    })

    test("should return correct count after single increment", () => {
      status.incrementRequestCount("/api/users")
      expect(status.requestCount.value).toBe(1)
    })

    test("should return correct count after multiple increments", () => {
      status.incrementRequestCount("/api/users")
      status.incrementRequestCount("/api/posts")
      status.incrementRequestCount("/api/comments")
      expect(status.requestCount.value).toBe(3)
    })

    test("should return correct count after increment and decrement", () => {
      status.incrementRequestCount("/api/users")
      status.incrementRequestCount("/api/posts")
      status.decrementRequestCount("/api/users")

      expect(status.requestCount.value).toBe(1)
    })

    test("should reflect reset operation", () => {
      status.incrementRequestCount("/api/users")
      status.incrementRequestCount("/api/posts")
      status.resetRequestCount()

      expect(status.requestCount.value).toBe(0)
    })
  })

  describe("inRequest computed property", () => {
    test("should return false when no requests", () => {
      expect(status.inRequest.value).toBe(false)
    })

    test("should return true when there is at least one request", () => {
      status.incrementRequestCount("/api/users")
      expect(status.inRequest.value).toBe(true)
    })

    test("should return false when all requests are completed", () => {
      status.incrementRequestCount("/api/users")
      status.decrementRequestCount("/api/users")
      expect(status.inRequest.value).toBe(false)
    })

    test("should return true when some requests are still pending", () => {
      status.incrementRequestCount("/api/users")
      status.incrementRequestCount("/api/posts")
      status.decrementRequestCount("/api/users")

      expect(status.inRequest.value).toBe(true)
    })

    test("should handle complex request lifecycle", () => {
      // Start multiple requests
      status.incrementRequestCount("/api/users")
      status.incrementRequestCount("/api/posts")
      status.incrementRequestCount("/api/comments")

      expect(status.inRequest.value).toBe(true)
      expect(status.requestCount.value).toBe(3)

      // Complete some requests
      status.decrementRequestCount("/api/users")
      status.decrementRequestCount("/api/posts")

      expect(status.inRequest.value).toBe(true)
      expect(status.requestCount.value).toBe(1)

      // Complete all requests
      status.decrementRequestCount("/api/comments")

      expect(status.inRequest.value).toBe(false)
      expect(status.requestCount.value).toBe(0)
    })

    test("should handle duplicate URLs correctly", () => {
      status.incrementRequestCount("/api/users")
      status.incrementRequestCount("/api/users")
      status.incrementRequestCount("/api/users")

      expect(status.inRequest.value).toBe(true)
      expect(status.requestCount.value).toBe(3)

      status.decrementRequestCount("/api/users")

      expect(status.inRequest.value).toBe(true)
      expect(status.requestCount.value).toBe(2)

      status.decrementRequestCount("/api/users")
      status.decrementRequestCount("/api/users")

      expect(status.inRequest.value).toBe(false)
      expect(status.requestCount.value).toBe(0)
    })
  })

  describe("edge cases", () => {
    test("should handle empty string URL", () => {
      status.incrementRequestCount("")
      expect(status.requestCount.value).toBe(1)
      expect(status.inRequest.value).toBe(true)

      status.decrementRequestCount("")
      expect(status.requestCount.value).toBe(0)
      expect(status.inRequest.value).toBe(false)
    })

    test("should handle URL with special characters", () => {
      const specialUrl = "/api/users/{id}?query=1&filter=active"
      status.incrementRequestCount(specialUrl)
      expect(status.getRequestCount(specialUrl)).toBe(1)

      status.decrementRequestCount(specialUrl)
      expect(status.getRequestCount(specialUrl)).toBe(0)
    })

    test("should handle very long URL", () => {
      const longUrl = "/api/" + "x".repeat(1000)
      status.incrementRequestCount(longUrl)
      expect(status.getRequestCount(longUrl)).toBe(1)
    })

    test("should handle decrement on non-existent URL gracefully", () => {
      status.incrementRequestCount("/api/users")
      status.decrementRequestCount("/api/nonexistent")

      expect(status.requestCount.value).toBe(1)
      expect(status.inRequest.value).toBe(true)
      expect(status.getRequestCount("/api/users")).toBe(1)
      expect(status.getRequestCount("/api/nonexistent")).toBe(0)
    })

    test("should handle multiple increments and decrements in sequence", () => {
      status.incrementRequestCount("/api/users")
      status.incrementRequestCount("/api/posts")
      status.decrementRequestCount("/api/users")
      status.incrementRequestCount("/api/comments")
      status.decrementRequestCount("/api/posts")
      status.decrementRequestCount("/api/comments")
      status.decrementRequestCount("/api/users")

      expect(status.requestCount.value).toBe(0)
      expect(status.inRequest.value).toBe(false)
    })
  })

  describe("getInRequest", () => {
    test("should return boolean directly without .value", () => {
      expect(status.getInRequest()).toBe(false)

      status.incrementRequestCount("/api/users")
      expect(status.getInRequest()).toBe(true)

      status.decrementRequestCount("/api/users")
      expect(status.getInRequest()).toBe(false)
    })

    test("should match the computed inRequest value", () => {
      status.incrementRequestCount("/api/users")
      expect(status.getInRequest()).toBe(status.inRequest.value)

      status.incrementRequestCount("/api/posts")
      expect(status.getInRequest()).toBe(status.inRequest.value)

      status.decrementRequestCount("/api/users")
      status.decrementRequestCount("/api/posts")
      expect(status.getInRequest()).toBe(status.inRequest.value)
    })
  })

  describe("getRequestCountValue", () => {
    test("should return number directly without .value", () => {
      expect(status.getRequestCountValue()).toBe(0)

      status.incrementRequestCount("/api/users")
      expect(status.getRequestCountValue()).toBe(1)

      status.incrementRequestCount("/api/users")
      expect(status.getRequestCountValue()).toBe(2)

      status.decrementRequestCount("/api/users")
      expect(status.getRequestCountValue()).toBe(1)

      status.decrementRequestCount("/api/users")
      expect(status.getRequestCountValue()).toBe(0)
    })

    test("should match the computed requestCount value", () => {
      status.incrementRequestCount("/api/users")
      expect(status.getRequestCountValue()).toBe(status.requestCount.value)

      status.incrementRequestCount("/api/posts")
      expect(status.getRequestCountValue()).toBe(status.requestCount.value)

      status.decrementRequestCount("/api/users")
      expect(status.getRequestCountValue()).toBe(status.requestCount.value)
    })
  })

  describe("integration with createHTTPClient", () => {
    test("should track request lifecycle through HTTP client", async () => {
      const { createHTTPClient } = await import("../api-typing")
      const client = createHTTPClient({
        baseURL: "https://httpbin.org",
      })

      // Initial state
      expect(client.globalStatus.requestCount.value).toBe(0)
      expect(client.globalStatus.inRequest.value).toBe(false)

      // Reset for clean test
      client.globalStatus.resetRequestCount()

      // The actual request tracking is done through axios interceptors
      // which are tested separately in axios-instance.test.ts
      // Here we just verify the interface is accessible
      expect(client.globalStatus).toBeDefined()
      expect(client.globalStatus.incrementRequestCount).toBeDefined()
      expect(client.globalStatus.decrementRequestCount).toBeDefined()
      expect(client.globalStatus.getRequestCount).toBeDefined()
      expect(client.globalStatus.getInRequest).toBeDefined()
      expect(client.globalStatus.getRequestCountValue).toBeDefined()
    })
  })
})
