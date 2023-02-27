export type DeepDel<T, Key extends (string | symbol | number)[]> = T extends
  | Function
  | number
  | null
  | string
  | symbol
  | undefined
  ? T
  : T extends (infer A)[]
  ? A extends object
    ? DeepDel<A, Key>[]
    : A extends Function | number | null | string | symbol | undefined
    ? A[]
    : [DeepDel<A, Key>]
  : Pick<
      { [k in keyof T]: T[k] extends object ? DeepDel<T[k], Key> : T[k] },
      Exclude<keyof T, Key[number]>
    >

/**
 * deep delete key from obj
 * @param obj any obj
 * @param keys keys to delete
 * @default ["_uid"]
 * @returns obj without key
 */
export function deepDel<T, K extends (string | symbol | number)[]>(
  obj: T,
  ...keys: K
): DeepDel<T, K> {
  if (typeof obj === "object") {
    if (Array.isArray(obj)) {
      obj.forEach((d) => deepDel(d, ...keys))
    } else if (obj !== null) {
      keys.forEach((k) => {
        delete (obj as any)[k]
      })
      for (const k in obj) {
        deepDel(obj[k], ...keys)
      }
    }
  }
  return obj as any
}
