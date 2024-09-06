import { isArray } from './is'

type ToKey<T> = null | ((item: T, idx: number) => number | string | symbol)
/**
 * 从数组中移除第一个匹配的元素，并返回布尔值表示是否成功移除。
 * @category ArrayUtils
 * @param array 要操作的数组。
 * @param value 要移除的元素。
 * @param toKey （可选）用于比较数组元素和值的函数。
 * @returns 如果成功移除了元素，则为true；否则为false。
 */
export function remove<T>(array: T[], value: T, toKey?: ToKey<T>): boolean {
  if (!isArray(array)) {
    return false
  }
  const matcher = toKey ? (x: T, idx: number) => toKey(x, idx) === toKey(value, idx) : (x: T) => x === value
  const idx = array.findIndex(matcher)
  if (idx >= 0) {
    array.splice(idx, 1)
    return true
  }
  return false
}

/**
 * 从数组中移除满足给定条件的第一个元素。
 * @category ArrayUtils
 * @param array 要操作的数组。
 * @param predicate 决定要移除哪个元素的谓词函数。
 * @returns 是否移除成功。
 */
export function removeBy<T>(array: T[], match: (item: T, idx: number) => boolean): boolean {
  if (!isArray(array)) {
    return false
  }
  const index = array.findIndex(match)
  if (index !== -1) {
    array.splice(index, 1)
    return true
  }
  return false
}

/**
 * 从数组中移除所有匹配的元素，并返回移除的元素数量。
 * @category ArrayUtils
 * @param array 要操作的数组。
 * @param value 要移除的元素。
 * @param toKey （可选）用于比较数组元素和值的函数。
 * @returns 返回移除的元素数量。
 */
export function removeAll<T>(array: T[], value: T, toKey?: ToKey<T>): number {
  if (!isArray(array)) {
    return 0
  }
  const matcher = toKey ? (x: T, idx: number) => toKey(x, idx) === toKey(value, idx) : (x: T) => x === value
  let removedCount = 0
  for (let i = array.length - 1; i >= 0; i--) {
    if (matcher(array[i], i)) {
      array.splice(i, 1)
      removedCount += 1
    }
  }

  return removedCount
}

/**
 * 从数组中移除满足给定条件的所有元素。
 * @category ArrayUtils
 * @param array 要操作的数组。
 * @param predicate 决定要移除哪个元素的谓词函数。
 * @returns 返回移除的元素数量。
 */
export function removeAllBy<T>(array: T[], match: (item: T, idx: number) => boolean): number {
  if (!isArray(array)) {
    return 0
  }
  let removedCount = 0
  for (let i = array.length - 1; i >= 0; i--) {
    if (match(array[i], i)) {
      array.splice(i, 1)
      removedCount += 1
    }
  }
  return removedCount
}

/**
 * 向数组中添加元素，仅当元素不存在于数组中时才添加，并返回布尔值表示是否成功添加。
 * @category ArrayUtils
 * @param array 要操作的数组。
 * @param value 要添加的元素。
 * @param toKey （可选）用于比较数组元素和值的函数。
 * @returns 如果成功添加了元素，则为true；否则为false。
 */
export function addIfNotExists<T>(array: T[], value: T, toKey?: ToKey<T>): boolean {
  if (!isArray(array)) {
    return false
  }
  if (!includes(array, value, toKey)) {
    array.push(value)
    return true
  }
  return false
}

/**
 * 判断一个数组中是否包含某个值
 * @category ArrayUtils
 * @param array 要检查的数组
 * @param value 要检查的值
 * @param toKey 可选的自定义键函数，用于比较数组元素和值
 * @returns 如果数组中包含该值，则返回true；否则返回false
 */
export function includes<T>(array: readonly T[], value: T, toKey?: ToKey<T>): boolean {
  if (!isArray(array)) {
    return false
  }
  const matcher = toKey ? (x: T, idx: number) => toKey(x, idx) === toKey(value, idx) : (x: T) => x === value
  const idx = array.findIndex(matcher)
  return idx > -1
}

/**
 * 在数组中切换一个值的存在状态，如果数组中不存在该值，则添加；如果存在，则移除。
 * 支持通过`toKey`函数对数组元素和值进行比较。
 * @category ArrayUtils
 * @param array 要操作的数组。
 * @param value 要切换的值。
 * @param toKey （可选）用于比较数组元素和值的函数。
 */
export function toggle<T>(array: T[], value: T, toKey?: ToKey<T>) {
  if (!isArray(array)) {
    return
  }
  const matcher = toKey ? (x: T, idx: number) => toKey(x, idx) === toKey(value, idx) : (x: T) => x === value
  const idx = array.findIndex(matcher)
  if (idx === -1) {
    array.push(value)
  } else {
    array.splice(idx, -1)
  }
}

/**
 * 替换数组中的第一个匹配项。
 *
 * 该函数旨在替换数组中第一个满足匹配条件的元素。
 * 如果数组为空，将返回一个空数组。
 * 如果待替换的新项为undefined，则直接返回原数组。
 *
 * @param array - 待处理的数组。
 * @param newItem - 用于替换匹配项的新元素。
 * @param match - 一个函数，用于确定数组中的哪个元素需要被替换，
 *                它接受两个参数：当前元素和当前索引，并返回一个布尔值指示是否匹配。
 * @returns 替换后的数组。如果没有元素满足匹配条件，返回原数组。
 */
export function replace<T>(array: T[], newItem: T, match: (item: T, idx: number) => boolean): T[] {
  if (!isArray(array)) {
    return []
  }
  if (newItem === undefined) return array
  for (let idx = 0; idx < array.length; idx++) {
    const item = array[idx]
    if (match(item, idx)) {
      return array.splice(idx, 1, newItem)
    }
  }
  return array
}

export type PartitionFilter<T> = (i: T, idx: number, arr: readonly T[]) => any

/**
 * 根据过滤函数将数组分成两个部分
 * @category ArrayUtils
 * @example const [odd, even] = partition([1, 2, 3, 4], i => i % 2 != 0)
 */
export function partition<T>(array: readonly T[], f1: PartitionFilter<T>): [T[], T[]]
export function partition<T>(array: readonly T[], f1: PartitionFilter<T>, f2: PartitionFilter<T>): [T[], T[], T[]]
export function partition<T>(array: readonly T[], f1: PartitionFilter<T>, f2: PartitionFilter<T>, f3: PartitionFilter<T>): [T[], T[], T[], T[]]
export function partition<T>(
  array: readonly T[],
  f1: PartitionFilter<T>,
  f2: PartitionFilter<T>,
  f3: PartitionFilter<T>,
  f4: PartitionFilter<T>
): [T[], T[], T[], T[], T[]]
export function partition<T>(
  array: readonly T[],
  f1: PartitionFilter<T>,
  f2: PartitionFilter<T>,
  f3: PartitionFilter<T>,
  f4: PartitionFilter<T>,
  f5: PartitionFilter<T>
): [T[], T[], T[], T[], T[], T[]]
export function partition<T>(
  array: readonly T[],
  f1: PartitionFilter<T>,
  f2: PartitionFilter<T>,
  f3: PartitionFilter<T>,
  f4: PartitionFilter<T>,
  f5: PartitionFilter<T>,
  f6: PartitionFilter<T>
): [T[], T[], T[], T[], T[], T[], T[]]
export function partition<T>(array: readonly T[], ...filters: PartitionFilter<T>[]): any {
  const result: T[][] = Array.from({ length: filters.length + 1 })
    .fill(null)
    .map(() => [])

  array.forEach((e, idx, arr) => {
    let i = 0
    for (const filter of filters) {
      if (filter(e, idx, arr)) {
        result[i].push(e)
        return
      }
      i += 1
    }
    result[i].push(e)
  })
  return result
}
