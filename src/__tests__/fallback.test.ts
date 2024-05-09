import { test, expect, describe } from 'vitest'
import { fallbackArray, fallbackString, fallbackNumber, fallbackDateStr, fallbackDatetimeStr } from '../fallback'

describe('fallbackArray', () => {
  test('非空数组，返回当前数组', () => {
    const arr = [1, 2, 3]
    expect(fallbackArray(arr, [4, 5])).toBe(arr)
  })

  test('空数组，返回回退数组的拷贝', () => {
    const fallback = [4, 5]
    expect(fallbackArray([], fallback)).not.toBe(fallback)
    expect(fallbackArray([], fallback)).toEqual(fallback)
  })

  test('undefined，返回回退数组的拷贝', () => {
    const fallback = [4, 5]
    expect(fallbackArray(undefined, fallback)).not.toBe(fallback)
    expect(fallbackArray(undefined, fallback)).toEqual(fallback)
  })

  test('null，返回回退数组的拷贝', () => {
    const fallback = [4, 5]
    expect(fallbackArray(undefined, fallback)).not.toBe(fallback)
    expect(fallbackArray(undefined, fallback)).toEqual(fallback)
  })

  test('其他类型数据，返回回退数组的拷贝', () => {
    const fallback = [4, 5]
    expect(fallbackArray({} as any, fallback)).toEqual(fallback)
    expect(fallbackArray((() => {}) as any, fallback)).toEqual(fallback)
    expect(fallbackArray(0 as any, fallback)).toEqual(fallback)
    expect(fallbackArray('hello' as any, fallback)).toEqual(fallback)
  })
})

describe('fallbackString', () => {
  test('字符串：hello，返回：hello', () => {
    expect(fallbackString('hello', 'Fallback Text')).toBe('hello')
  })

  test('number：0，返回字符串0', () => {
    expect(fallbackString(0, 'Fallback Text')).toBe('0')
  })

  test('number：8e5，返回字符串8e5', () => {
    expect(fallbackString(8e5, 'Fallback Text')).toBe('800000')
  })

  test('number：0o144，返回字符串100', () => {
    expect(fallbackString(0o144, 'Fallback Text')).toBe('100')
  })

  test('number：0xff，返回字符串255', () => {
    expect(fallbackString(0xff, 'Fallback Text')).toBe('255')
  })

  test('字符串：0xff，返回字符串255', () => {
    expect(fallbackString('0xff', 'Fallback Text')).toBe('0xff')
  })

  test('空字符串，返回回退字符串', () => {
    expect(fallbackString('', 'Fallback Text')).toBe('Fallback Text')
  })

  test('null，返回回退字符串', () => {
    expect(fallbackString(null, 'Fallback Text')).toBe('Fallback Text')
  })

  test('undefined，返回回退字符串', () => {
    expect(fallbackString(undefined, 'Fallback Text')).toBe('Fallback Text')
  })

  test('number：NaN，返回回退字符串', () => {
    expect(fallbackString(NaN, 'Fallback Text')).toBe('Fallback Text')
  })

  test('number：Infinity，返回回退字符串', () => {
    expect(fallbackString(Infinity, 'Fallback Text')).toBe('Fallback Text')
  })

  test('number：-Infinity，返回回退字符串', () => {
    expect(fallbackString(-Infinity, 'Fallback Text')).toBe('Fallback Text')
  })

  test('其他类型数据，返回回退字符串', () => {
    // @ts-expect-error
    expect(fallbackString([], 'Fallback Text')).toBe('Fallback Text')
    // @ts-expect-error
    expect(fallbackString({}, 'Fallback Text')).toBe('Fallback Text')
    // @ts-expect-error
    expect(fallbackString(new Date(), 'Fallback Text')).toBe('Fallback Text')
    // @ts-expect-error
    expect(fallbackString(() => {}, 'Fallback Text')).toBe('Fallback Text')
  })
})

describe('fallbackNumber', () => {
  test('数字：100，返回：100', () => {
    expect(fallbackNumber(100, 1)).toBe(100)
  })

  test('数字：Infinity，返回回退数字：0', () => {
    expect(fallbackNumber(Infinity)).toBe(0)
  })

  test('数字：-Infinity，返回回退数字：0', () => {
    expect(fallbackNumber(-Infinity)).toBe(0)
  })

  test('NaN，返回回退数字0', () => {
    expect(fallbackNumber(NaN)).toBe(0)
  })

  test('字符串：100，返回数字100', () => {
    expect(fallbackNumber('100')).toBe(100)
  })

  test('字符串：+100，返回数字100', () => {
    expect(fallbackNumber('+100')).toBe(100)
  })

  test('字符串：-100，返回数字-100', () => {
    expect(fallbackNumber('-100')).toBe(-100)
  })

  test('字符串：3.14，返回数字3.14', () => {
    expect(fallbackNumber('3.14')).toBe(3.14)
  })

  test('其他类型数据，返回回退数字', () => {
    expect(fallbackNumber(undefined, 1)).toBe(1)
    expect(fallbackNumber(null, 1)).toBe(1)
    expect(fallbackNumber('', 1)).toBe(1)
    expect(fallbackNumber(NaN, 1)).toBe(1)
    // @ts-expect-error
    expect(fallbackNumber([], 1)).toBe(1)
    // @ts-expect-error
    expect(fallbackNumber({}, 1)).toBe(1)
    // @ts-expect-error
    expect(fallbackNumber(new Date(), 1)).toBe(1)
    // @ts-expect-error
    expect(fallbackNumber(() => {}, 1)).toBe(1)
  })
})

describe('fallbackDateStr', () => {
  test('返回具有回退（fallback）行为的字符串', () => {
    expect(fallbackDateStr(undefined)).toBe('')
    expect(fallbackDateStr(null)).toBe('')
    expect(fallbackDateStr('')).toBe('')
    expect(fallbackDateStr('Date')).toBe('')
  })

  test('设置全局默认回退字符串', () => {
    fallbackDateStr.DEFAULT_FALLBACK = '/'
    expect(fallbackDateStr(undefined)).toBe('/')
    expect(fallbackDateStr(null)).toBe('/')
    expect(fallbackDateStr('')).toBe('/')
    expect(fallbackDateStr('Date')).toBe('/')
  })
})

describe('fallbackDatetimeStr', () => {
  test('返回具有回退（fallback）行为的字符串', () => {
    expect(fallbackDatetimeStr(undefined)).toBe('')
    expect(fallbackDatetimeStr(null)).toBe('')
    expect(fallbackDatetimeStr('')).toBe('')
    expect(fallbackDatetimeStr('Date')).toBe('')
  })

  test('设置全局默认回退字符串', () => {
    fallbackDatetimeStr.DEFAULT_FALLBACK = '/'
    expect(fallbackDatetimeStr(undefined)).toBe('/')
    expect(fallbackDatetimeStr(null)).toBe('/')
    expect(fallbackDatetimeStr('')).toBe('/')
    expect(fallbackDatetimeStr('Date')).toBe('/')
  })
})
