import { test, expect, describe, assertType } from 'vitest'
import { toArray } from '../toArray'

describe('toArray', () => {
  test('toArray', () => {
    expect(toArray(123)).toEqual([123])
    expect(toArray([1, 2, 3])).toEqual([1, 2, 3])
    expect(toArray('hello')).toEqual(['hello'])
    expect(toArray(undefined)).toEqual([])
    expect(toArray(null)).toEqual([])
    expect(toArray('')).toEqual([''])
  })

  test('toArray类型测试', () => {
    const arr: number[] | null | undefined = Math.random() > 0.5 ? [1, 2, 3] : null
    assertType<number[]>(toArray(arr))
  })
})
