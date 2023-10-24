import { test, expect, describe } from 'vitest'
import { omit } from '../omit'

describe('omit', () => {
  test('omit - 省略单个字段', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const result = omit(obj, ['b'])
    expect(result).toStrictEqual({ a: 1, c: 3 })
  })

  test('omit - 省略多个字段', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4, e: 5 }
    const result = omit(obj, ['b', 'd', 'e'])
    expect(result).toStrictEqual({ a: 1, c: 3 })
  })

  test('omit - 全部省略字段', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const result = omit(obj, ['a', 'b', 'c'])
    expect(result).toStrictEqual({})
  })

  test('omit - 不存在的字段', () => {
    const obj = { a: 1, b: 2, c: 3 }
    // @ts-ignore
    const result = omit(obj, ['d', 'e'])
    expect(result).toStrictEqual({ a: 1, b: 2, c: 3 })
  })

  test('omit - 空对象和空字段数组', () => {
    const obj = {}
    const result = omit(obj, [])
    expect(result).toStrictEqual({})
  })

  test('omit - 返回值和原始对象比较', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4, e: 5 }
    const result = omit(obj, ['b', 'd', 'e'])
    expect(result).not.toBe(obj)
  })

  test('omit - 参数类型可能为null', () => {
    const obj = null as { a: number } | null
    const result = omit(obj, ['a'])
    expect(result).toEqual({})
  })

  test('omit - null和空数组', () => {
    const obj = null
    const result = omit(obj, [])
    expect(result).toEqual({})
  })
})
