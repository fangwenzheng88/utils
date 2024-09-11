import { isArray, isObject, isString } from './native-is'

/**
 * 判断给定的对象是否为浏览器窗口对象
 *
 * @category is
 * @param value 要判断的对象
 * @returns 如果是浏览器窗口对象，则返回true；否则返回false
 */
export function isWindow(value: unknown): value is Window {
  return value !== null && value !== undefined && value === (value as any).window
}

/**
 * 判断是是客户端
 *
 * @category is
 * @returns window存在，则返回true；否则返回false
 */
export function isClient(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined'
}

/**
 * 判断是不是ios
 * @category is
 */
export function isIOS(): boolean {
  return !!(
    isClient() &&
    window?.navigator?.userAgent &&
    (/iP(ad|hone|od)/.test(window.navigator.userAgent) ||
      // The new iPad Pro Gen3 does not identify itself as iPad, but as Macintosh.
      // https://github.com/vueuse/vueuse/issues/3577
      (window?.navigator?.maxTouchPoints > 2 && /iPad|Macintosh/.test(window?.navigator.userAgent)))
  )
}

/**
 * 确定它的参数是否是一个数字。
 * 方法检查它的参数是否代表一个数值。如果是这样，它返回 true。否则，它返回false。该参数可以是任何类型的
 *
 * @category is
 * @param value 任何类型
 *
 * @example
 * ```ts
 * // true
 * isNumeric("-10");
 * isNumeric(16);
 * isNumeric(0xff);
 * isNumeric("0xff");
 * isNumeric("8e5");
 * isNumeric(3.1415);
 * isNumeric(+10);
 * isNumeric(0o144);
 *
 * // false
 * isNumeric("");
 * isNumeric({});
 * isNumeric(NaN);
 * isNumeric(null);
 * isNumeric(true);
 * isNumeric(Infinity);
 * isNumeric(undefined);
 * ```
 */
export function isNumeric(value: unknown): boolean {
  try {
    // @ts-ignore
    // eslint-disable-next-line no-restricted-globals
    return !isNaN(Number.parseFloat(value)) && isFinite(value)
  } catch {
    return false
  }
}

/**
 * 判断给定的对象是否为空普通对象，即不包含任何属性
 *
 * @category is
 * @param value 要判断的对象
 * @returns 如果是空普通对象，则返回true；否则返回false
 */
export function isEmptyObject(value: unknown): boolean {
  return isObject(value) && Object.keys(value).length === 0
}

/**
 * 判断给定的对象是否存在
 *
 * @category is
 * @param value 要判断的对象
 * @returns 这些值(`null`, `undefined`, `false`, `NaN`, `''`)返回false, 其他返回true
 * @example
 * ```ts
 * // true
 * isExist('Hello')
 * isExist(123)
 * isExist([])
 * isExist({ a: 1 })
 * isExist(true)
 * isExist(0)
 *
 * // false
 * isExist(null)
 * isExist(undefined)
 * isExist(false)
 * isExist(NaN)
 * isExist('')
 * ```
 */
export function isExist(value: unknown): boolean {
  return !!value || value === 0
}

/**
 * 判断给定的对象是否已定义，即不是undefined也不是null
 *
 * @category is
 * @param value 要判断的对象
 * @returns 如果对象已定义，则返回true；否则返回false
 */
export function isDef<T>(value: T): value is NonNullable<T> {
  return value !== undefined && value !== null
}

/**
 * 判断给定的对象是否未定义，即是undefined或null
 *
 * @category is
 * @param value 要判断的对象
 * @returns 如果对象未定义，则返回true；否则返回false
 */
export function isUnDef(value: unknown): value is undefined | null {
  return value === undefined || value === null
}

/**
 * 判断给定对象是否为非空数组
 *
 * @category is
 * @param value 要判断的对象
 * @returns 如果为非空数组，则返回true；否则返回false
 */
export function isNotEmptyArray(value: unknown): value is any[] {
  return isArray(value) && value.length !== 0
}

/**
 * 判断给定的字符串是否可以转换为数字
 * @deprecated
 * @category is
 * @param val 要判断的字符串
 * @returns 如果可以转换为数字，则返回true；否则返回false
 * @example
 * ```ts
 * // true
 * isStringNumber('123')
 * isStringNumber('-456')
 * isStringNumber('3.14')
 * isStringNumber('')
 * isStringNumber(' 789 ')
 * isStringNumber('00123')
 * isStringNumber('+456')
 *
 * // false
 * isStringNumber('Hello')
 * isStringNumber('12A34')
 * isStringNumber('3.14.159')
 * isStringNumber(null)
 * isStringNumber(undefined)
 * isStringNumber(123)
 * isStringNumber(true)
 * isStringNumber({})
 * isStringNumber([])
 * isStringNumber(NaN)
 * ```
 */
export function isStringNumber(val: unknown): boolean {
  if (!isString(val)) {
    return false
  }
  return !Number.isNaN(Number(val))
}
