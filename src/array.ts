/**
 * 从数组中移除第一个匹配的元素，并返回布尔值表示是否成功移除。
 * @category array
 * @param array 要操作的数组。
 * @param value 要移除的元素。
 * @returns 如果成功移除了元素，则为true；否则为false。
 */
export function remove<T>(array: T[], value: T): boolean {
  const index = array.indexOf(value)
  if (index >= 0) {
    array.splice(index, 1)
    return true
  }
  return false
}

/**
 * 从数组中移除满足给定条件的第一个元素。
 * @category array
 * @param array 要操作的数组。
 * @param predicate 决定要移除哪个元素的谓词函数。
 * @returns 是否移除成功。
 */
export function removeBy<T>(array: T[], predicate: (item: T) => boolean): boolean {
  const index = array.findIndex(predicate)
  if (index !== -1) {
    array.splice(index, 1)
    return true
  }
  return false
}

/**
 * 从数组中移除所有匹配的元素，并返回移除的元素数量。
 * @category array
 * @param array 要操作的数组。
 * @param value 要移除的元素。
 * @returns 返回移除的元素数量。
 */
export function removeAll<T>(array: T[], value: T): number {
  let removedCount = 0
  for (let i = array.length - 1; i >= 0; i--) {
    if (array[i] === value) {
      array.splice(i, 1)
      removedCount += 1
    }
  }

  return removedCount
}

/**
 * 从数组中移除满足给定条件的所有元素。
 * @category array
 * @param array 要操作的数组。
 * @param predicate 决定要移除哪个元素的谓词函数。
 * @returns 返回移除的元素数量。
 */
export function removeAllBy<T>(array: T[], predicate: (item: T) => boolean): number {
  let removedCount = 0
  for (let i = array.length - 1; i >= 0; i--) {
    if (predicate(array[i])) {
      array.splice(i, 1)
      removedCount += 1
    }
  }
  return removedCount
}

/**
 * 向数组中添加元素，仅当元素不存在于数组中时才添加，并返回布尔值表示是否成功添加。
 * @category array
 * @param array 要操作的数组。
 * @param value 要添加的元素。
 * @returns 如果成功添加了元素，则为true；否则为false。
 */
export function addIfNotExists<T>(array: T[], value: T): boolean {
  if (!array.includes(value)) {
    array.push(value)
    return true
  }
  return false
}

export type PartitionFilter<T> = (i: T, idx: number, arr: readonly T[]) => any

/**
 * 根据过滤函数将数组分成两个部分
 *
 * @category array
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
