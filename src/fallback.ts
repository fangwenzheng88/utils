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
 * @category fallback，默认为 fallbackString.DEFAULT_FALLBACK
 * @param str 数字、字符串、null、undefined
 * @param fallback 回退字符串
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
 */
export function fallbackString(str: string | number | undefined | null, fallback: string = fallbackString.DEFAULT_FALLBACK): string {
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
 * @param str 日期字符串、数字、日期对象或 Dayjs 对象
 * @param fallback 默认值，默认为 fallbackDateStr.DEFAULT_FALLBACK
 * @param template 格式模板，默认为 fallbackDateStr.DEFAULT_TEMPLATE
 * @returns 格式化后的日期字符串或默认值
 */
export function fallbackDateStr(
  str: string | number | Date | Dayjs | null | undefined,
  fallback: string = fallbackDateStr.DEFAULT_FALLBACK,
  template = fallbackDateStr.DEFAULT_TEMPLATE
): string {
  if (isUnDef(str) || str === '') {
    return fallback
  }
  const day = dayjs(str)
  return day.isValid() ? day.format(template) : fallback
}
/**
 * fallbackDateStr 全局默认 fallback 值和模板
 */
fallbackDateStr.DEFAULT_FALLBACK = ''
fallbackDateStr.DEFAULT_TEMPLATE = 'YYYY-MM-DD'

/**
 * 将日期时间转换成指定格式的字符串，如果日期时间无效或为空，返回默认值
 * @param str 日期时间字符串、数字、日期对象或 Dayjs 对象
 * @param fallback 默认值，默认为 fallbackDatetimeStr.DEFAULT_FALLBACK
 * @param template 格式模板，默认为 fallbackDatetimeStr.DEFAULT_TEMPLATE
 * @returns 格式化后的日期时间字符串或默认值
 */
export function fallbackDatetimeStr(
  str: string | number | Date | Dayjs | null | undefined,
  fallback: string = fallbackDatetimeStr.DEFAULT_FALLBACK,
  template = fallbackDatetimeStr.DEFAULT_TEMPLATE
): string {
  return fallbackDateStr(str, fallback, template)
}

/**
 * fallbackDatetimeStr 全局默认 fallback 值和模板
 */
fallbackDatetimeStr.DEFAULT_FALLBACK = ''
fallbackDatetimeStr.DEFAULT_TEMPLATE = 'YYYY-MM-DD HH:mm:ss'
