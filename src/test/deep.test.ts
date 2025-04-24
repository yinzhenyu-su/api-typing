import { describe, expect, it } from "vitest"
import { deepDel } from "../util/deep"

describe("deep", () => {
  it("deepDel", () => {
    const obj = {
      a: 1,
      b: {
        c: 2,
        d: {
          e: 3,
          f: 4,
        },
      },
      g: 5,
    }
    const result = deepDel(obj, "b", "f")
    expect(result).toStrictEqual({
      a: 1,
      g: 5,
    })
  })
})
