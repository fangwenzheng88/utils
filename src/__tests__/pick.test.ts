import { test, expect, describe } from 'vitest'
import { pick } from '../pick'

describe('pick', () => {
  test('pick - 选择一个字段', () => {
    const obj = { a: 1, b: 2, c: 3 }
    const result = pick(obj, ['a'])
    expect(result).toStrictEqual({ a: 1 })
  })

  test('pick - 选择多个字段', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4, e: 5 }
    const result = pick(obj, ['a', 'c', 'e'])
    expect(result).toStrictEqual({ a: 1, c: 3, e: 5 })
  })

  test('pick - 选择不存在的字段', () => {
    const obj = { a: 1, b: 2, c: 3 }
    // @ts-ignore
    const result = pick(obj, ['d', 'e'])
    expect(result).toStrictEqual({})
  })

  test('pick - 空对象和空字段数组', () => {
    expect(pick({}, [])).toStrictEqual({})
  })

  test('pick - 返回值和原始对象比较', () => {
    const obj = { a: 1, b: 2, c: 3, d: 4, e: 5 }
    const result = pick(obj, ['b', 'd', 'e'])
    expect(result).not.toBe(obj)
  })

  test('pick - 参数类型可能为null', () => {
    const obj = null as { a: number } | null
    const result = pick(obj, ['a'])
    expect(result).toEqual({})
  })

  test('pick - null和空数组', () => {
    const obj = null
    const result = pick(obj, [])
    expect(result).toEqual({})
  })
})
