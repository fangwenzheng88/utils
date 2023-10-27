import { isArray, isObject, isUndefined } from './is'

type Data = Record<string, unknown> | unknown[]

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
export const getValueByPath = <T = any>(obj: Data | undefined, path: string | undefined): T | undefined => {
  if (!obj || !path) {
    return undefined
  }
  // eslint-disable-next-line no-param-reassign
  path = path.replace(/\[(\w+)\]/g, '.$1')
  const keys = path.split('.')
  if (keys.length === 0) {
    return undefined
  }

  let temp = obj

  for (let i = 0; i < keys.length; i++) {
    if ((!isObject(temp) && !isArray(temp)) || !keys[i]) {
      return undefined
    }
    const currentKey = keys[i] as keyof Data
    if (i !== keys.length - 1) {
      temp = temp[currentKey] as any
    } else {
      return temp[currentKey] as T
    }
  }

  return undefined
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
export const setValueByPath = (obj: Data | undefined, path: string | undefined, value: any, { addPath }: { addPath?: boolean } = {}) => {
  if (!obj || !path) {
    return
  }
  // eslint-disable-next-line no-param-reassign
  path = path.replace(/\[(\w+)\]/g, '.$1')
  const keys = path.split('.')
  if (keys.length === 0) {
    return
  }

  let temp = obj

  for (let i = 0; i < keys.length; i++) {
    if ((!isObject(temp) && !isArray(temp)) || !keys[i]) {
      return
    }
    const currentKey = keys[i] as keyof Data
    if (i !== keys.length - 1) {
      if (addPath && isUndefined(temp[currentKey])) {
        if (/^\d+$/.test(keys[i + 1])) {
          // @ts-ignore
          temp[currentKey] = []
        } else {
          // @ts-ignore
          temp[currentKey] = {}
        }
      }
      temp = temp[currentKey] as any
    } else {
      temp[currentKey] = value
    }
  }
}
