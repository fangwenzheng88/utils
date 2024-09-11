import dayjs, { Dayjs } from 'dayjs'
import { isString, isNumeric, isUnDef, isNotEmptyArray } from './index'

/**
 * 返回具有回退（fallback）行为的数组
 * @category fallback
 * @param array 原数组
 * @param fallback 回退数组，默认为空数组
 * @returns 不为非空数组，否则返回回退数组的浅拷贝
 *
 * @example
 * ```ts
 * fallbackArray([1, 2, 3], [4, 5]) // [1, 2, 3]
 * fallbackArray([], [4, 5]) // [4, 5]
 * fallbackArray(undefined, [4, 5]) // [4, 5]
 * fallbackArray(null, [4, 5]) // [4, 5]
 *
 * // 非数组/null/undefined类型数据，ts会提示异常
 * fallbackArray('', [4, 5]) // [4, 5]
 * fallbackArray(1, [4, 5]) // [4, 5]
 * fallbackArray({}, [4, 5]) // [4, 5]
 * ```
 */
export function fallbackArray<T>(array: T[] | undefined | null, fallback: T[] = []): T[] {
  return isNotEmptyArray(array) ? array : [...fallback]
}

/**
 * 返回具有回退（fallback）行为的字符串
 * @category fallback
 * @param str 数字、字符串、null、undefined
 * @param fallback 回退字符串，默认为空字符串
 * @returns 不为字符串或有效数字，则返回回退字符串
 *
 * @example
 * ```ts
 * fallbackString('hello', 'Fallback Text') // 'hello'
 * fallbackString(0, 'Fallback Text') // '0'
 * fallbackString(8e5, 'Fallback Text') // '800000'
 * fallbackString(0o144, 'Fallback Text') // '100'
 * fallbackString(0xff, 'Fallback Text') // '255'
 * fallbackString('0xff', 'Fallback Text') // '0xff'
 *
 * fallbackString(Infinity, 'Fallback Text') // 'Fallback Text'
 * fallbackString(-Infinity, 'Fallback Text') // 'Fallback Text'
 * fallbackString(NaN, 'Fallback Text') // 'Fallback Text'
 * fallbackString(null, 'Fallback Text') // 'Fallback Text'
 * fallbackString(undefined, 'Fallback Text') // 'Fallback Text'
 * fallbackString('', 'Fallback Text') // 'Fallback Text'
 * fallbackString({}, 'Fallback Text') // 'Fallback Text'
 * fallbackString([], 'Fallback Text') // 'Fallback Text'
 * fallbackString(new Date(), 'Fallback Text') // 'Fallback Text'
 * fallbackString(() => {}, 'Fallback Text') // 'Fallback Text'
 * ```
 */
export const fallbackString = (str: string | number | undefined | null, fallback: string = ''): string => {
  if (isString(str) && str.length > 0) {
    return str
  }

  if (isNumeric(str)) {
    return String(str)
  }

  return fallback
}

/**
 * 返回具有回退（fallback）行为的数字
 * @category fallback
 * @param str 数字、字符串、null、undefined
 * @param fallback 回退数字，默认：0
 * @returns 不为非NaN的数字或数字格式的字符串，则返回回退数字
 *
 * @example
 * ```ts
 * fallbackNumber(100) // 100
 * fallbackNumber('100') // 100
 * fallbackNumber('+100') // 100
 * fallbackNumber('-100') // -100
 * fallbackNumber('3.14') // 3.14
 *
 * // 返回回退数字：0
 * fallbackNumber(undefined) // 0
 * fallbackNumber(null) // 0
 * fallbackNumber('') // 0
 * fallbackNumber(Infinity) // 0
 * fallbackNumber(-Infinity) // 0
 * fallbackNumber(NaN) // 0
 *
 * // 指定回退数字：1
 * fallbackNumber(NaN, 1) // 1
 * ```
 */
export function fallbackNumber(str: string | number | null | undefined, fallback: number = 0): number {
  if (isNumeric(str)) {
    return Number(str)
  }
  return fallback
}

/**
 * 将日期转换成指定格式的字符串，如果日期无效或为空，返回默认值
 * @category fallback
 * @param str 日期字符串、数字、日期对象或 Dayjs 对象
 * @param fallback 默认值，默认为 fallbackDateStr.DEFAULT_FALLBACK
 * @param template 格式模板，默认为 fallbackDateStr.DEFAULT_TEMPLATE
 * @returns 格式化后的日期字符串或默认值
 * @example
 * ```ts
 * // 返回DEFAULT_FALLBACK
 * fallbackDateStr(undefined) // ''
 * fallbackDateStr(null) // ''
 * fallbackDateStr('') // ''
 * fallbackDateStr('Date') // ''
 *
 * // 返回格式化后的日期
 * fallbackDateStr(new Date('2022/01/01')) // '2022-01-01
 * fallbackDateStr(new Date('2022/01/01 18:00:00') // 2022-01-01
 * fallbackDateStr(1698387297932) // 2023-10-27
 * fallbackDateStr(dayjs(1698387297932)) // 2023-10-27
 * ```
 */
export const fallbackDateStr = (str: string | number | Date | Dayjs | null | undefined, _fallback?: string, _template?: string): string => {
  const fallback = _fallback ?? fallbackDateStr.DEFAULT_FALLBACK
  const template = _template ?? fallbackDateStr.DEFAULT_TEMPLATE
  if (isUnDef(str) || str === '') {
    return fallback
  }
  const day = dayjs(str)
  return day.isValid() ? day.format(template) : fallback
}

/**
 * fallbackDateStr 全局默认fallback值
 * @default ''
 */
fallbackDateStr.DEFAULT_FALLBACK = ''

/**
 * fallbackDateStr 全局格式化模板
 * @default 'YYYY-MM-DD'
 */
fallbackDateStr.DEFAULT_TEMPLATE = 'YYYY-MM-DD'

/**
 * 将日期时间转换成指定格式的字符串，如果日期时间无效或为空，返回默认值
 * @category fallback
 * @param str 日期时间字符串、数字、日期对象或 Dayjs 对象
 * @param fallback 默认值，默认为 fallbackDatetimeStr.DEFAULT_FALLBACK
 * @param template 格式模板，默认为 fallbackDatetimeStr.DEFAULT_TEMPLATE
 * @returns 格式化后的日期时间字符串或默认值
 * @example
 * ```ts
 * // 返回DEFAULT_FALLBACK
 * fallbackDatetimeStr(undefined) // ''
 * fallbackDatetimeStr(null) // ''
 * fallbackDatetimeStr('') // ''
 * fallbackDatetimeStr('Date') // ''
 *
 * // 返回格式化后的日期
 * fallbackDatetimeStr(new Date('2022/01/01')) // '2022-01-01 00:00:00'
 * fallbackDatetimeStr(new Date('2022/01/01 18:00:00') // '2022-01-01 18:00:00'
 * fallbackDatetimeStr(1698387297932) // '2023-10-27 14:14:57'
 * fallbackDatetimeStr(dayjs(1698387297932)) // '2023-10-27 14:14:57'
 * ```
 */
export const fallbackDatetimeStr = (str: string | number | Date | Dayjs | null | undefined, _fallback?: string, _template?: string): string => {
  const fallback = _fallback ?? fallbackDatetimeStr.DEFAULT_FALLBACK
  const template = _template ?? fallbackDatetimeStr.DEFAULT_TEMPLATE
  return fallbackDateStr(str, fallback, template)
}

/**
 * fallbackDatetimeStr 全局默认fallback值
 * @default ''
 */
fallbackDatetimeStr.DEFAULT_FALLBACK = ''

/**
 * fallbackDatetimeStr 全局格式化模板
 * @default 'YYYY-MM-DD HH:mm:ss'
 */
fallbackDatetimeStr.DEFAULT_TEMPLATE = 'YYYY-MM-DD HH:mm:ss'
