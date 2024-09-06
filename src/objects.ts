import { getValueByPath, setValueByPath } from './handleValueByPath'
import { isArray, isObject } from './is'

/**
 * @category object
 */
export type Entry<T> = [keyof T, T[keyof T]]

/**
 * @category object
 */
export const keysOf = <T extends object>(object: T) => Object.keys(object) as Array<keyof T>

/**
 * @category object
 */
export const entriesOf = <T extends object>(object: T) => Object.entries(object) as Entry<T>[]

/**
 * @category object
 */
export const hasOwn = (val: object, key: string | symbol): key is keyof typeof val => Object.prototype.hasOwnProperty.call(val, key)

/**
 * 获取所有存在的键名字符串列表
 *
 * @category object
 * @example
 * ```
 * crushObjectKeys({ name: 'ra' }) // ['name']
 * crushObjectKeys({ name: 'ra', children: [{ name: 'hathor' }] }) // ['name', 'children.0.name']
 * ```
 */
export const crushObjectKeys = <T extends object>(value: T): string[] => {
  if (!value) return []
  const getKeys = (nested: any, paths: string[]): string[] => {
    if (isObject(nested)) {
      return Object.entries(nested).flatMap(([k, v]) => getKeys(v, [...paths, k]))
    }
    if (isArray(nested)) {
      return nested.flatMap((item, i) => getKeys(item, [...paths, `${i}`]))
    }
    return [paths.join('.')]
  }
  return getKeys(value, [])
}

/**
 * 将深层对象展平为单一层级，并将键转换为点分隔表示。
 *
 * @category object
 * @example
 * ```
 * crushObject({ name: 'ra', children: [{ name: 'hathor' }] })
 * // { name: 'ra', 'children.0.name': 'hathor' }
 * ```
 */
export const crushObject = <T extends object>(value: T): object => {
  if (!value) return {}

  return crushObjectKeys(value).reduce((acc, item) => {
    acc[item] = getValueByPath(value, item)
    return acc
  }, {} as any)
}

/**
 * 给定一个已被展平为键路径和值的对象，将其构建为原始对象
 *
 * @category object
 * @example
 * ```
 * constructObject({ name: 'ra', 'children.0.name': 'hathor' })
 * // { name: 'ra', children: [{ name: 'hathor' }] }
 * ```
 */
export const constructObject = <T extends object>(obj: T): object => {
  if (!obj) return {}
  return Object.keys(obj).reduce((acc, path) => {
    setValueByPath(acc, path, (obj as any)[path])
    return acc
  }, {})
}
