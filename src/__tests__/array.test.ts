import { test, expect, describe } from 'vitest'
import { remove, removeBy, removeAll, removeAllBy, addIfNotExists, partition } from '../array'

describe('remove', () => {
  test('从数组中删除指定的值并返回true', () => {
    const array = [1, 2, 3, 4, 5]
    expect(remove(array, 3)).toBe(true)
    expect(array).toEqual([1, 2, 4, 5])

    const array2 = ['a', 'b', 'c', 'd']
    expect(remove(array2, 'c')).toBe(true)
    expect(array2).toEqual(['a', 'b', 'd'])
  })

  test('如果值在数组中未找到，返回false', () => {
    const array = [1, 2, 3]
    expect(remove(array, 4)).toBe(false)
    expect(array).toEqual([1, 2, 3])

    const array2 = ['a', 'b', 'c']
    expect(remove(array2, 'd')).toBe(false)
    expect(array2).toEqual(['a', 'b', 'c'])
  })
})

describe('removeBy', () => {
  test('从数组中删除满足条件的项并返回true', () => {
    const array = [1, 2, 3, 4, 5]
    expect(removeBy(array, (item) => item === 3)).toBe(true)
    expect(array).toEqual([1, 2, 4, 5])

    const array2 = ['a', 'b', 'c', 'd']
    expect(removeBy(array2, (item) => item === 'c')).toBe(true)
    expect(array2).toEqual(['a', 'b', 'd'])
  })

  test('如果没有项满足条件，返回false', () => {
    const array = [1, 2, 3]
    expect(removeBy(array, (item) => item === 4)).toBe(false)
    expect(array).toEqual([1, 2, 3])

    const array2 = ['a', 'b', 'c']
    expect(removeBy(array2, (item) => item === 'd')).toBe(false)
    expect(array2).toEqual(['a', 'b', 'c'])
  })
})

describe('removeAll', () => {
  test('从数组中删除所有出现的指定值并返回计数', () => {
    const array = [1, 2, 3, 4, 3, 5, 3]
    expect(removeAll(array, 3)).toBe(3)
    expect(array).toEqual([1, 2, 4, 5])

    const array2 = ['a', 'b', 'c', 'c', 'd']
    expect(removeAll(array2, 'c')).toBe(2)
    expect(array2).toEqual(['a', 'b', 'd'])
  })

  test('如果值在数组中未找到，返回0', () => {
    const array = [1, 2, 3]
    expect(removeAll(array, 4)).toBe(0)
    expect(array).toEqual([1, 2, 3])

    const array2 = ['a', 'b', 'c']
    expect(removeAll(array2, 'd')).toBe(0)
    expect(array2).toEqual(['a', 'b', 'c'])
  })
})

describe('removeAllBy', () => {
  test('从数组中删除所有满足条件的项并返回计数', () => {
    const array = [1, 2, 3, 4, 5]
    expect(removeAllBy(array, (item) => item % 2 === 0)).toBe(2)
    expect(array).toEqual([1, 3, 5])

    const array2 = ['apple', 'banana', 'cherry']
    expect(removeAllBy(array2, (item) => item.includes('a'))).toBe(2)
    expect(array2).toEqual(['cherry'])
  })

  test('如果没有项满足条件，返回0', () => {
    const array = [1, 2, 3]
    expect(removeAllBy(array, (item) => item === 4)).toBe(0)
    expect(array).toEqual([1, 2, 3])

    const array2 = ['a', 'b', 'c']
    expect(removeAllBy(array2, (item) => item === 'd')).toBe(0)
    expect(array2).toEqual(['a', 'b', 'c'])
  })
})

describe('addIfNotExists', () => {
  test('如果值不存在于数组中，则将其添加到数组并返回true', () => {
    const array = [1, 2, 3]
    expect(addIfNotExists(array, 4)).toBe(true)
    expect(array).toEqual([1, 2, 3, 4])

    const array2 = ['a', 'b', 'c']
    expect(addIfNotExists(array2, 'd')).toBe(true)
    expect(array2).toEqual(['a', 'b', 'c', 'd'])
  })

  test('如果值已存在于数组中，则不添加并返回false', () => {
    const array = [1, 2, 3]
    expect(addIfNotExists(array, 3)).toBe(false)
    expect(array).toEqual([1, 2, 3])

    const array2 = ['a', 'b', 'c']
    expect(addIfNotExists(array2, 'c')).toBe(false)
    expect(array2).toEqual(['a', 'b', 'c'])
  })
})

describe('partition', () => {
  test('将数组按奇偶数进行分组', () => {
    const [odd, even] = partition([1, 2, 3, 4], (i) => i % 2 !== 0)
    expect(odd).toEqual([1, 3])
    expect(even).toEqual([2, 4])
  })
})
