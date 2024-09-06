import { isUndefined } from './is'

/**
 * 通过路径获取对象中的值
 * @category handle-value-by-path
 * @param obj 对象
 * @param path 路径
 * @returns 返回路径对应的值
 *
 * @example
 * ```ts
 * const obj = {a: {b: {c: 123}}};
 * const value = getValueByPath<number>(obj, 'a.b.c'); // value = 123
 * ```
 */
export const getValueByPath = <T = unknown>(value: any, path: string, defaultValue?: T): T => {
  const segments = path.split(/[.[\]]/g)
  let current: any = value
  for (const key of segments) {
    if (current === null) return defaultValue as T
    if (current === undefined) return defaultValue as T
    const dequoted = key.replace(/['"]/g, '')
    if (dequoted.trim() === '') {
      // eslint-disable-next-line no-continue
      continue
    }
    current = current[dequoted]
  }
  if (current === undefined) return defaultValue as T
  return current
}

/**
 * 通过路径设置对象中的值
 * 会修改原始对象obj
 * @category handle-value-by-path
 * @param obj 对象
 * @param path 路径
 * @param value 值
 * @param addPath 添加路径，默认：false，为true的时候会添加不存在的路径
 *
 * @example
 * ```ts
 * const obj = {}
 * setValueByPath(obj, 'a.b.c', 'value', { addPath: true })
 * // { a: { b: { c: 'value' } } }
 *
 * const obj = {}
 * setValueByPath(obj, 'a.b.c[0]', 'hello', { addPath: true })
 * // { a: { b: { c: ['hello'] } } }
 *
 * const obj = { a: { b: { c: ['hello'] } } }
 * setValueByPath(obj, 'a.b.c.1', 'world')
 * // { a: { b: { c: ['hello', 'world'] } } }
 * ```
 */
export const setValueByPath = <T extends object, K>(obj: T, path: string, value: K, { addPath = true }: { addPath?: boolean } = {}) => {
  if (!obj || !path) {
    return
  }
  const segments = path.split(/[.[\]]/g).filter((x) => !!x.trim())
  if (segments.length === 0) {
    return
  }

  let current: any = obj

  for (let i = 0; i < segments.length; i++) {
    const dequoted = segments[i]
    if (i !== segments.length - 1) {
      if (isUndefined(current[dequoted])) {
        if (addPath) {
          if (/^\d+$/.test(segments[i + 1])) {
            current[dequoted] = []
          } else {
            current[dequoted] = {}
          }
        } else {
          return
        }
      }
      current = current[dequoted]
    } else {
      current[dequoted] = value
    }
  }
}
