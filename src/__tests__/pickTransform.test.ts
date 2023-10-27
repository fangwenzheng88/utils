import { test, expect, describe, assertType } from 'vitest'
import { pickTransform } from '../pickTransform'

interface Person {
  name: string
  age: number
  location: string
}

describe('pickTransform', () => {
  test('transform新增字段', () => {
    const source: Person = {
      name: 'Alice',
      age: 18,
      location: 'New York',
    }
    const result = pickTransform(source, ['name', 'location'], {
      ageStr: (val) => `${val.age}岁`,
    })
    expect(result).toEqual({
      name: 'Alice',
      location: 'New York',
      ageStr: '18岁',
    })
  })

  test('transform修改source中的字段', () => {
    const source: Person = {
      name: 'Alice',
      age: 18,
      location: 'New York',
    }
    const result = pickTransform(source, ['name', 'location'], {
      age: (val) => `${val.age}岁`,
    })
    expect(result).toEqual({
      name: 'Alice',
      location: 'New York',
      age: '18岁',
    })
  })

  test('source为null', () => {
    const source: Person | null = null

    const result = pickTransform(source, ['location'], {
      name: (val) => val?.name.length ?? 10,
    })
    expect(result).toEqual({})
  })

  test('source为undefined', () => {
    const source: Person | undefined = undefined

    const result = pickTransform(source, ['location'], {
      name: (val) => val?.name.length ?? 10,
    })
    expect(result).toEqual({})
  })

  test('返回值类型测试，匹配第一个重载', () => {
    const source: Person = {
      name: 'Alice',
      age: 30,
      location: 'New York',
    }

    const result = pickTransform(source, ['location'], {
      name: (val) => val.name.length,
    })
    assertType<{
      location: string
      name: number
    }>(result)
  })

  test('返回值类型测试，匹配第二个重载', () => {
    const source: Person | null =
      Math.random() > 0.1
        ? {
            name: 'Alice',
            age: 30,
            location: 'New York',
          }
        : null

    const result = pickTransform(source, ['location'], {
      name: (val) => val.name.length,
    })
    assertType<{
      location?: string
      name?: number
    }>(result)
  })
})
