import dayjs, { Dayjs } from 'dayjs'
import { isArray, isNumber, isString, isStringNumber, isUnDef } from './is'

/**
 * 返回具有回退（fallback）行为的数组
 * @category fallback
 * @param array 原数组
 * @param fallback 回退数组
 * @returns 不为非空数组，否则返回回退数组
 *
 * @example
 * ```ts
 * fallbackArray([1, 2, 3], [4, 5]) // [1, 2, 3]
 * fallbackArray([], [4, 5]) // [4, 5]
 * fallbackArray(undefined, [4, 5]) // [4, 5]
 * fallbackArray(null, [4, 5]) // [4, 5]
 * ```
 */
export function fallbackArray<T>(array: T[] | undefined | null, fallback: T[] = []): T[] {
  return isArray(array) && array.length > 0 ? array : [...fallback]
}

/**
 * 返回具有回退（fallback）行为的字符串
 * @category fallback
 * @param str 数字、字符串、null、undefined
 * @param fallback 回退字符串，默认为 fallbackString.DEFAULT_FALLBACK
 * @returns 不为字符串或非NaN的数字，则返回回退字符串
 *
 * @example
 * ```ts
 * fallbackString('hello', 'Fallback Text') // 'hello'
 * fallbackString(0, 'Fallback Text') // '0'
 *
 * fallbackString(NaN, 'Fallback Text') // 'Fallback Text'
 * fallbackString(null, 'Fallback Text') // 'Fallback Text'
 * fallbackString(undefined, 'Fallback Text') // 'Fallback Text'
 * fallbackString('', 'Fallback Text') // 'Fallback Text'
 * fallbackString({}, 'Fallback Text') // 'Fallback Text'
 * fallbackString([], 'Fallback Text') // 'Fallback Text'
 * ```
 *
 * @example
 * // 全局配置fallbackString.DEFAULT_FALLBACK='/'，默认回退字符串就会返回'/'
 * fallbackString.DEFAULT_FALLBACK = '/'
 *
 * fallbackString(NaN) // '/'
 */
export const fallbackString = (str: string | number | undefined | null, _fallback?: string): string => {
  const fallback = _fallback ?? fallbackString.DEFAULT_FALLBACK
  if (isUnDef(str)) {
    return fallback
  }
  if (isNumber(str)) {
    if (Number.isNaN(str)) {
      return fallback
    }
    return String(str)
  }
  return isString(str) && str.length > 0 ? str : fallback
}
/**
 * fallbackString 全局默认 fallback 值
 * @default ''
 */
fallbackString.DEFAULT_FALLBACK = ''

/**
 * 返回具有回退（fallback）行为的数字
 * @category fallback
 * @param str 数字、字符串、null、undefined
 * @param fallback 回退数字
 * @returns 不为非NaN的数字或数字格式的字符串，则返回回退数字
 *
 * @example
 * ```ts
 * fallbackNumber(100) // 100
 * fallbackNumber('100') // 100
 *
 * fallbackNumber(undefined) // 0
 * fallbackNumber(null) // 0
 * fallbackNumber('') // 0
 *
 * fallbackNumber(100, 1) // 100
 * fallbackNumber('100', 1) // 100
 * fallbackNumber(NaN, 1) // 1
 * fallbackNumber(undefined, 1) // 1
 * fallbackNumber(null, 1) // 1
 * fallbackNumber('', 1) // 1
 * ```
 */
export function fallbackNumber(str: string | number | null | undefined, fallback: number = 0): number {
  if (isUnDef(str) || str === '' || Number.isNaN(str)) {
    return fallback
  }
  if (isNumber(str)) {
    return str
  }
  return isStringNumber(str) ? Number(str) : fallback
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
 * fallbackDatetimeStr(new Date('2022/01/01 18:00:00') // 2022-01-01 18:00:00
 * fallbackDatetimeStr(1698387297932) // 2023-10-27 14:14:57
 * fallbackDatetimeStr(dayjs(1698387297932)) // 2023-10-27 14:14:57
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
