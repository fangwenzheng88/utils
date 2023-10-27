import { test, describe, expect } from 'vitest'
import { getValueByPath, setValueByPath } from '../handleValueByPath'

describe('getValueByPath', () => {
  test('对象', () => {
    const obj = {
      a: {
        b: {
          c: 'value',
        },
      },
      x: {
        y: [1, 2, 3],
      },
    }

    expect(getValueByPath(obj, 'a.b.c')).toBe('value')
    expect(getValueByPath(obj, 'a.b.d')).toBe(undefined)
    expect(getValueByPath(obj, 'a.e')).toBe(undefined)
    expect(getValueByPath(obj, 'x.y[0]')).toBe(1)
    expect(getValueByPath(obj, 'x.y.0')).toBe(1)
    expect(getValueByPath(obj, 'x.y[2]')).toBe(3)
  })

  test('数组', () => {
    const arr = [{ a: 1 }, { a: 2 }]

    expect(getValueByPath(arr, '1.a')).toBe(2)
  })
})

describe('setValueByPath', () => {
  test('给不存在路径的值赋值，赋值失败', () => {
    const obj = {} as any
    setValueByPath(obj, 'a.b.c', 'value')
    expect(obj).toEqual({})
  })

  test('addPath: true，给不存在路径的值赋值，赋值成功', () => {
    const obj = {} as any
    setValueByPath(obj, 'a.b.c', 'value', { addPath: true })
    expect(obj.a.b.c).toBe('value')
  })

  test('a.b.c[0]，路径支持数组', () => {
    const obj = {}
    setValueByPath(obj, 'a.b.c[0]', 'hello', { addPath: true })
    expect(obj).toEqual({ a: { b: { c: ['hello'] } } })
  })

  test('addPath: true，a.b.c.0.0，路径支持数组', () => {
    const obj = {}
    setValueByPath(obj, 'a.b.c.0.0', 'hello', { addPath: true })
    expect(obj).toEqual({ a: { b: { c: [['hello']] } } })
  })

  test('a.b.c.1，路径支持数组', () => {
    const obj = { a: { b: { c: ['hello'] } } }
    setValueByPath(obj, 'a.b.c.1', 'world')
    expect(obj).toEqual({ a: { b: { c: ['hello', 'world'] } } })
  })

  test('a.b.c[1]，路径支持数组', () => {
    const obj = { a: { b: { c: ['hello'] } } }
    setValueByPath(obj, 'a.b.c[1]', 'world')
    expect(obj).toEqual({ a: { b: { c: ['hello', 'world'] } } })
  })
})
