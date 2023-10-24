/**
 * 从对象中省略指定字段，返回新对象
 * @category omit
 * @param source 要从中省略字段的对象
 * @param fields 要省略的字段数组
 * @returns 不包含指定字段的新对象
 */
export function omit<T extends object, K extends keyof T>(source: T, fields: K[]): Omit<T, K>
export function omit<T extends object, K extends keyof T>(source: T | undefined | null, fields: K[]): Partial<Omit<T, K>>

export function omit<T extends object, K extends keyof T>(source: T | undefined | null, fields: K[]): Omit<T, K> | Partial<Omit<T, K>> {
  if (source === null || source === undefined) {
    return {} as Partial<Omit<T, K>>
  }
  const shallowCopy = { ...source }
  for (let i = 0; i < fields.length; i += 1) {
    const key = fields[i]
    delete shallowCopy[key]
  }
  return shallowCopy
}
