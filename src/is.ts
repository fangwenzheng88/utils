const opt = Object.prototype.toString

/**
 * 判断给定的对象是否为数组类型
 * @category is
 * @param obj 要判断的对象
 * @returns 如果是数组类型，则返回true；否则返回false
 */
export function isArray(obj: unknown): obj is any[] {
  return opt.call(obj) === '[object Array]'
}

/**
 * 判断给定的对象是否为null类型
 * @category is
 * @param obj 要判断的对象
 * @returns 如果是null类型，则返回true；否则返回false
 */
export function isNull(obj: unknown): obj is null {
  return opt.call(obj) === '[object Null]'
}

/**
 * 判断给定的对象是否为布尔类型
 * @category is
 * @param obj 要判断的对象
 * @returns 如果是布尔类型，则返回true；否则返回false
 */
export function isBoolean(obj: unknown): obj is boolean {
  return opt.call(obj) === '[object Boolean]'
}

/**
 * 判断给定的对象是否为普通对象类型
 * @category is
 * @param obj 要判断的对象
 * @returns 如果是普通对象类型，则返回true；否则返回false
 */
export function isObject(obj: unknown): obj is object {
  return opt.call(obj) === '[object Object]'
}

/**
 * 判断给定的对象是否为Promise类型
 * @category is
 * @param obj 要判断的对象
 * @returns 如果是Promise类型，则返回true；否则返回false
 */
export function isPromise<T>(obj: unknown): obj is Promise<T> {
  return opt.call(obj) === '[object Promise]'
}

/**
 * 判断给定的对象是否为字符串类型
 * @category is
 * @param obj 要判断的对象
 * @returns 如果是字符串类型，则返回true；否则返回false
 */
export function isString(obj: unknown): obj is string {
  return opt.call(obj) === '[object String]'
}

/**
 * 判断给定的对象是否为数字类型
 * @category is
 * @param obj 要判断的对象
 * @returns 如果是数字类型，则返回true；否则返回false
 * @example
 * ```ts
 * // true
 * isNumber(NaN)
 * isNumber(123)
 *
 * // false
 * isNumber(true)
 * isNumber(undefined)
 * isNumber('')
 * ```
 */
export function isNumber(obj: unknown): obj is number {
  return opt.call(obj) === '[object Number]'
}

/**
 * 判断给定的对象是否为正则表达式类型
 * @category is
 * @param obj 要判断的对象
 * @returns 如果是正则表达式类型，则返回true；否则返回false
 */
export function isRegExp(obj: unknown) {
  return opt.call(obj) === '[object RegExp]'
}

/**
 * 判断给定的对象是否为日期类型
 * @category is
 * @param obj 要判断的对象
 * @returns 如果是日期类型，则返回true；否则返回false
 */
export function isDate(obj: unknown) {
  return opt.call(obj) === '[object Date]'
}

/**
 * 判断给定的对象是否为函数类型
 * @category is
 * @param obj 要判断的对象
 * @returns 如果是函数类型，则返回true；否则返回false
 */
export function isFunction(obj: unknown): obj is (...args: any[]) => any {
  return typeof obj === 'function'
}

/**
 * 判断给定的对象是否为浏览器窗口对象
 * @category is
 * @param obj 要判断的对象
 * @returns 如果是浏览器窗口对象，则返回true；否则返回false
 */
export function isWindow(obj: unknown): obj is Window {
  return obj === window
}

/**
 * 判断给定的对象是否为undefined类型
 * @category is
 * @param obj 要判断的对象
 * @returns 如果是undefined类型，则返回true；否则返回false
 */
export function isUndefined(obj: unknown): obj is undefined {
  return obj === undefined
}

/**
 * 判断给定的字符串是否可以转换为数字
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
export function isStringNumber(val: string): boolean {
  if (!isString(val)) {
    return false
  }
  return !Number.isNaN(Number(val))
}

/**
 * 判断给定的对象是否为空普通对象，即不包含任何属性
 * @category is
 * @param obj 要判断的对象
 * @returns 如果是空普通对象，则返回true；否则返回false
 */
export function isEmptyObject(obj: unknown): boolean {
  return isObject(obj) && Object.keys(obj).length === 0
}

/**
 * 判断给定的对象是否存在
 * @category is
 * @param obj 要判断的对象
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
export function isExist(obj: unknown): boolean {
  return !!obj || obj === 0
}

/**
 * 判断给定的对象是否已定义，即不是undefined也不是null
 * @category is
 * @param obj 要判断的对象
 * @returns 如果对象已定义，则返回true；否则返回false
 */
export function isDef<T>(obj: T): obj is NonNullable<T> {
  return obj !== undefined && obj !== null
}

/**
 * 判断给定的对象是否未定义，即是undefined或null
 * @category is
 * @param obj 要判断的对象
 * @returns 如果对象未定义，则返回true；否则返回false
 */
export function isUnDef(obj: unknown): obj is undefined | null {
  return obj === undefined || obj === null
}
