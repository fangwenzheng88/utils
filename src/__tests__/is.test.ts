import { test, expect, describe } from 'vitest'
import { isNumeric, isEmptyObject, isExist, isDef, isUnDef, isWindow, isNotEmptyArray } from '../index'

describe('isNotEmptyArray', () => {
  test('非空数组，应返回 true', () => {
    expect(isNotEmptyArray([1])).toBe(true)
  })

  test('空数组，应返回 false', () => {
    expect(isNotEmptyArray([])).toBe(false)
  })

  test('对于其他类型，应返回 false', () => {
    expect(isNotEmptyArray(null)).toBe(false)
    expect(isNotEmptyArray(undefined)).toBe(false)
    expect(isNotEmptyArray(123)).toBe(false)
    expect(isNotEmptyArray(true)).toBe(false)
    expect(isNotEmptyArray({})).toBe(false)
  })
})

describe('isNumeric', () => {
  test('返回 true', () => {
    expect(isNumeric('-10')).toBe(true)
    expect(isNumeric('16')).toBe(true)
    expect(isNumeric(0xff)).toBe(true)
    expect(isNumeric('0xff')).toBe(true)
    expect(isNumeric('8e5')).toBe(true)
    expect(isNumeric(3.1415)).toBe(true)
    expect(isNumeric(+10)).toBe(true)
    expect(isNumeric(0o144)).toBe(true)
  })

  test('返回 false', () => {
    expect(isNumeric(Symbol('数字'))).toBe(false)
    expect(isNumeric('')).toBe(false)
    expect(isNumeric({})).toBe(false)
    expect(isNumeric(NaN)).toBe(false)
    expect(isNumeric(null)).toBe(false)
    expect(isNumeric(true)).toBe(false)
    expect(isNumeric(Infinity)).toBe(false)
    expect(isNumeric(undefined)).toBe(false)
  })
})

describe('isEmptyObject', () => {
  test('对于空对象，应返回true', () => {
    expect(isEmptyObject({})).toBe(true)
  })

  test('对于非空对象，应返回false', () => {
    expect(isEmptyObject({ a: 1, b: 2 })).toBe(false)
  })

  test('对于数组，应返回false', () => {
    expect(isEmptyObject([])).toBe(false)
  })

  test('对于字符串，应返回false', () => {
    expect(isEmptyObject('Hello')).toBe(false)
  })

  test('对于数字，应返回false', () => {
    expect(isEmptyObject(123)).toBe(false)
  })

  test('对于undefined值，应返回false', () => {
    expect(isEmptyObject(undefined)).toBe(false)
  })

  test('对于null值，应返回false', () => {
    expect(isEmptyObject(null)).toBe(false)
  })

  test('对于布尔值，应返回false', () => {
    expect(isEmptyObject(true)).toBe(false)
  })

  test('对于函数，应返回false', () => {
    expect(isEmptyObject(() => {})).toBe(false)
  })
})

describe('isExist', () => {
  test('对于真值，应返回true', () => {
    expect(isExist('Hello')).toBe(true)
    expect(isExist(123)).toBe(true)
    expect(isExist([])).toBe(true)
    expect(isExist({ a: 1 })).toBe(true)
    expect(isExist(true)).toBe(true)
    expect(isExist(0)).toBe(true)
  })

  test('对于假值，应返回false', () => {
    expect(isExist(null)).toBe(false)
    expect(isExist(undefined)).toBe(false)
    expect(isExist(false)).toBe(false)
    expect(isExist(NaN)).toBe(false)
    expect(isExist('')).toBe(false)
  })
})

describe('isDef', () => {
  test('对于已定义的值，应返回true', () => {
    expect(isDef('Hello')).toBe(true)
    expect(isDef(123)).toBe(true)
    expect(isDef([])).toBe(true)
    expect(isDef({ a: 1 })).toBe(true)
    expect(isDef(true)).toBe(true)
    expect(isDef(0)).toBe(true)
    expect(isDef(false)).toBe(true)
    expect(isDef('')).toBe(true)
  })

  test('对于undefined值，应返回false', () => {
    expect(isDef(undefined)).toBe(false)
  })

  test('对于null值，应返回false', () => {
    expect(isDef(null)).toBe(false)
  })
})

describe('isUnDef', () => {
  test('对于undefined值，应返回true', () => {
    expect(isUnDef(undefined)).toBe(true)
  })

  test('对于null值，应返回true', () => {
    expect(isUnDef(null)).toBe(true)
  })

  test('对于已定义的值，应返回false', () => {
    expect(isUnDef('Hello')).toBe(false)
    expect(isUnDef(123)).toBe(false)
    expect(isUnDef([])).toBe(false)
    expect(isUnDef({ a: 1 })).toBe(false)
    expect(isUnDef(true)).toBe(false)
    expect(isUnDef(0)).toBe(false)
    expect(isUnDef(false)).toBe(false)
    expect(isUnDef('')).toBe(false)
  })
})

describe('isWindow', () => {
  test('对于window对象，应返回true', () => {
    expect(isWindow(window)).toBe(true)
  })

  test('对于其他对象，应返回false', () => {
    expect(isWindow({})).toBe(false)
    expect(isWindow(null)).toBe(false)
    expect(isWindow(undefined)).toBe(false)
    expect(isWindow('window')).toBe(false)
    expect(isWindow(123)).toBe(false)
  })
})
