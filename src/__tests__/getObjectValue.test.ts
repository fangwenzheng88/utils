import { test, expect, describe, expectTypeOf, assertType } from 'vitest'
import { getObjectValue } from '../getObjectValue'

type Data = {
  name: string
  age: number
  gender?: string
  address?: string[]
}

const data: Data = {
  name: 'xiaoming',
  age: 18,
}

describe('getObjectValue', () => {
  test('getObjectValue', () => {
    expect(getObjectValue(data, 'name')).toBe('xiaoming')
    expect(getObjectValue(data, 'age')).toBe(18)
    expect(getObjectValue(data, 'gender')).toBe(undefined)
    expect(getObjectValue(data, 'gender', 'man')).toBe('man')
    expect(getObjectValue(data, 'sex')).toBe(undefined)
  })

  test('getObjectValue 返回值类型测试', () => {
    expectTypeOf(getObjectValue(data, 'name')).toMatchTypeOf<string>()
    expectTypeOf(getObjectValue(data, 'age')).toMatchTypeOf<number>(18)
    expectTypeOf(getObjectValue(data, 'gender')).toMatchTypeOf<string | undefined>()
    expectTypeOf(getObjectValue(data, 'gender', 'man')).toMatchTypeOf<string>()
  })

  test('getObjectValue 返回值类型测试', () => {
    const key = 'sex' as string
    expectTypeOf(getObjectValue(data, key)).toMatchTypeOf<string | number | string[] | undefined>()
    expectTypeOf(getObjectValue(data, key, 'man')).toMatchTypeOf<string | number | string[]>()

    const data2 = Math.random() > 0.5 ? data : undefined

    assertType<string | undefined>(getObjectValue(data2, 'name'))
  })
})
