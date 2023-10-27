import { isArray, isDef } from './is'

/**
 * 将输入的值转换为数组
 * @category toArray
 * @param value 输入的值，可以是单个值或者一个数组
 * @returns 返回转换后的数组
 *
 * @example
 * ```ts
 * toArray(null) // []
 * toArray(undefined) // []
 * toArray(1) // [1]
 * toArray([1]) // [1]
 * toArray([1,2,3]) // [1,2,3]
 * toArray('') // ['']
 * ```
 */
export function toArray<T>(value: T | T[]): T[] {
  if (isArray(value)) {
    return value
  }
  if (isDef(value)) {
    return [value]
  }
  return []
}
