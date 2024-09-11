import { describe, expect, test } from 'vitest'
import { isArray, isBoolean, isDate, isFunction, isNull, isNumber, isObject, isPromise, isRegExp, isString, isUndefined } from '../index'

describe('isArray', () => {
  const array = [1, 2, 3]
  const object = { foo: 'bar' }
  const string = 'test'

  test('对于数组，应返回 true', () => {
    expect(isArray(array)).toBe(true)
  })

  test('对于对象，应返回 false', () => {
    expect(isArray(object)).toBe(false)
  })

  test('对于字符串，应返回 false', () => {
    expect(isArray(string)).toBe(false)
  })

  test('对于其他类型，应返回 false', () => {
    expect(isArray(null)).toBe(false)
    expect(isArray(undefined)).toBe(false)
    expect(isArray(123)).toBe(false)
    expect(isArray(true)).toBe(false)
    expect(isArray({})).toBe(false)
  })
})

describe('isNull', () => {
  test('对于 null 值，应返回 true', () => {
    expect(isNull(null)).toBe(true)
  })

  test('对于 undefined 值，应返回 false', () => {
    expect(isNull(undefined)).toBe(false)
  })

  test('对于数字，应返回 false', () => {
    expect(isNull(123)).toBe(false)
  })

  test('对于字符串，应返回 false', () => {
    expect(isNull('Hello')).toBe(false)
  })

  test('对于空数组，应返回 false', () => {
    expect(isNull([])).toBe(false)
  })

  test('对于非空数组，应返回 false', () => {
    expect(isNull([1, 2, 3])).toBe(false)
  })

  test('对于对象，应返回 false', () => {
    expect(isNull({ a: 1, b: 2 })).toBe(false)
  })
})

describe('isBoolean', () => {
  test('对于 true 布尔值，应返回 true', () => {
    expect(isBoolean(true)).toBe(true)
  })

  test('对于 false 布尔值，应返回 true', () => {
    expect(isBoolean(false)).toBe(true)
  })

  test('对于 undefined 值，应返回 false', () => {
    expect(isBoolean(undefined)).toBe(false)
  })

  test('对于 null 值，应返回 false', () => {
    expect(isBoolean(null)).toBe(false)
  })

  test('对于数字，应返回 false', () => {
    expect(isBoolean(123)).toBe(false)
  })

  test('对于字符串，应返回 false', () => {
    expect(isBoolean('Hello')).toBe(false)
  })

  test('对于空数组，应返回 false', () => {
    expect(isBoolean([])).toBe(false)
  })

  test('对于对象，应返回 false', () => {
    expect(isBoolean({ a: 1, b: 2 })).toBe(false)
  })
})

describe('isObject', () => {
  test('对于空对象，应返回 true', () => {
    expect(isObject({})).toBe(true)
  })

  test('对于非空对象，应返回 true', () => {
    expect(isObject({ a: 1, b: 2 })).toBe(true)
  })

  test('对于 undefined 值，应返回 false', () => {
    expect(isObject(undefined)).toBe(false)
  })

  test('对于 null 值，应返回 false', () => {
    expect(isObject(null)).toBe(false)
  })

  test('对于数字，应返回 false', () => {
    expect(isObject(123)).toBe(false)
  })

  test('对于字符串，应返回 false', () => {
    expect(isObject('Hello')).toBe(false)
  })

  test('对于空数组，应返回 false', () => {
    expect(isObject([])).toBe(false)
  })

  test('对于非空数组，应返回 false', () => {
    expect(isObject([1, 2, 3])).toBe(false)
  })
})

describe('isPromise', () => {
  test('对于一个 Promise 对象，应返回 true', () => {
    const promise = new Promise((resolve) => {
      resolve(undefined)
    })
    expect(isPromise(promise)).toBe(true)
  })

  test('对于 undefined 值，应返回 false', () => {
    expect(isPromise(undefined)).toBe(false)
  })

  test('对于 null 值，应返回 false', () => {
    expect(isPromise(null)).toBe(false)
  })

  test('对于数字，应返回 false', () => {
    expect(isPromise(123)).toBe(false)
  })

  test('对于字符串，应返回 false', () => {
    expect(isPromise('Hello')).toBe(false)
  })

  test('对于空数组，应返回 false', () => {
    expect(isPromise([])).toBe(false)
  })

  test('对于非空数组，应返回 false', () => {
    expect(isPromise([1, 2, 3])).toBe(false)
  })

  test('对于空对象，应返回 false', () => {
    expect(isPromise({})).toBe(false)
  })

  test('对于非空对象，应返回 false', () => {
    expect(isPromise({ a: 1, b: 2 })).toBe(false)
  })
})

describe('isString', () => {
  test('对于字符串，应返回 true', () => {
    expect(isString('Hello')).toBe(true)
  })

  test('对于 undefined 值，应返回 false', () => {
    expect(isString(undefined)).toBe(false)
  })

  test('对于 null 值，应返回 false', () => {
    expect(isString(null)).toBe(false)
  })

  test('对于数字，应返回 false', () => {
    expect(isString(123)).toBe(false)
  })

  test('对于空数组，应返回 false', () => {
    expect(isString([])).toBe(false)
  })

  test('对于非空数组，应返回 false', () => {
    expect(isString([1, 2, 3])).toBe(false)
  })

  test('对于空对象，应返回 false', () => {
    expect(isString({})).toBe(false)
  })

  test('对于非空对象，应返回 false', () => {
    expect(isString({ a: 1, b: 2 })).toBe(false)
  })

  test('对于布尔值，应返回 false', () => {
    expect(isString(true)).toBe(false)
  })
})

describe('isNumber', () => {
  test('对于数字，应返回 true', () => {
    expect(isNumber(123)).toBe(true)
  })

  test('对于 NaN 值，应返回 true', () => {
    expect(isNumber(NaN)).toBe(true)
  })

  test('对于 undefined 值，应返回 false', () => {
    expect(isNumber(undefined)).toBe(false)
  })

  test('对于 null 值，应返回 false', () => {
    expect(isNumber(null)).toBe(false)
  })

  test('对于字符串，应返回 false', () => {
    expect(isNumber('Hello')).toBe(false)
  })

  test('对于空数组，应返回 false', () => {
    expect(isNumber([])).toBe(false)
  })

  test('对于非空数组，应返回 false', () => {
    expect(isNumber([1, 2, 3])).toBe(false)
  })

  test('对于空对象，应返回 false', () => {
    expect(isNumber({})).toBe(false)
  })

  test('对于非空对象，应返回 false', () => {
    expect(isNumber({ a: 1, b: 2 })).toBe(false)
  })

  test('对于布尔值，应返回 false', () => {
    expect(isNumber(true)).toBe(false)
  })
})

describe('isRegExp', () => {
  test('对于正则表达式，应返回 true', () => {
    expect(isRegExp(/test/)).toBe(true)
  })

  test('对于 undefined 值，应返回 false', () => {
    expect(isRegExp(undefined)).toBe(false)
  })

  test('对于 null 值，应返回 false', () => {
    expect(isRegExp(null)).toBe(false)
  })

  test('对于字符串，应返回 false', () => {
    expect(isRegExp('Hello')).toBe(false)
  })

  test('对于数字，应返回 false', () => {
    expect(isRegExp(123)).toBe(false)
  })

  test('对于空数组，应返回 false', () => {
    expect(isRegExp([])).toBe(false)
  })

  test('对于非空数组，应返回 false', () => {
    expect(isRegExp([1, 2, 3])).toBe(false)
  })

  test('对于空对象，应返回 false', () => {
    expect(isRegExp({})).toBe(false)
  })

  test('对于非空对象，应返回 false', () => {
    expect(isRegExp({ a: 1, b: 2 })).toBe(false)
  })

  test('对于布尔值，应返回 false', () => {
    expect(isRegExp(true)).toBe(false)
  })
})

describe('isDate', () => {
  test('对于 Date 对象，应返回 true', () => {
    expect(isDate(new Date())).toBe(true)
  })

  test('对于 undefined 值，应返回 false', () => {
    expect(isDate(undefined)).toBe(false)
  })

  test('对于 null 值，应返回 false', () => {
    expect(isDate(null)).toBe(false)
  })

  test('对于字符串，应返回 false', () => {
    expect(isDate('Hello')).toBe(false)
  })

  test('对于数字，应返回 false', () => {
    expect(isDate(123)).toBe(false)
  })

  test('对于空数组，应返回 false', () => {
    expect(isDate([])).toBe(false)
  })

  test('对于非空数组，应返回 false', () => {
    expect(isDate([1, 2, 3])).toBe(false)
  })

  test('对于空对象，应返回 false', () => {
    expect(isDate({})).toBe(false)
  })

  test('对于非空对象，应返回 false', () => {
    expect(isDate({ a: 1, b: 2 })).toBe(false)
  })

  test('对于布尔值，应返回 false', () => {
    expect(isDate(true)).toBe(false)
  })
})

describe('isUndefined', () => {
  test('对于 undefined 值，应返回 true', () => {
    expect(isUndefined(undefined)).toBe(true)
  })

  test('对于 null 值，应返回 false', () => {
    expect(isUndefined(null)).toBe(false)
  })

  test('对于字符串，应返回 false', () => {
    expect(isUndefined('Hello')).toBe(false)
  })

  test('对于数字，应返回 false', () => {
    expect(isUndefined(123)).toBe(false)
  })

  test('对于空数组，应返回 false', () => {
    expect(isUndefined([])).toBe(false)
  })

  test('对于非空数组，应返回 false', () => {
    expect(isUndefined([1, 2, 3])).toBe(false)
  })

  test('对于空对象，应返回 false', () => {
    expect(isUndefined({})).toBe(false)
  })

  test('对于非空对象，应返回 false', () => {
    expect(isUndefined({ a: 1, b: 2 })).toBe(false)
  })

  test('对于布尔值，应返回 false', () => {
    expect(isUndefined(true)).toBe(false)
  })
})

describe('isFunction', () => {
  test('对于一个函数，应返回true', () => {
    expect(isFunction(() => {})).toBe(true)
  })

  test('对于箭头函数，应返回true', () => {
    expect(isFunction((x: number) => x + 1)).toBe(true)
  })

  test('对于undefined值，应返回false', () => {
    expect(isFunction(undefined)).toBe(false)
  })

  test('对于null值，应返回false', () => {
    expect(isFunction(null)).toBe(false)
  })

  test('对于字符串，应返回false', () => {
    expect(isFunction('Hello')).toBe(false)
  })

  test('对于数字，应返回false', () => {
    expect(isFunction(123)).toBe(false)
  })

  test('对于空数组，应返回false', () => {
    expect(isFunction([])).toBe(false)
  })

  test('对于非空数组，应返回false', () => {
    expect(isFunction([1, 2, 3])).toBe(false)
  })

  test('对于空对象，应返回false', () => {
    expect(isFunction({})).toBe(false)
  })

  test('对于非空对象，应返回false', () => {
    expect(isFunction({ a: 1, b: 2 })).toBe(false)
  })

  test('对于布尔值，应返回false', () => {
    expect(isFunction(true)).toBe(false)
  })
})
