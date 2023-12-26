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
export function toArray<T>(value?: null | T | T[]): T[] {
  if (value === undefined || value === null) {
    return []
  }

  return Array.isArray(value) ? value : [value]
}
