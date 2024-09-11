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
export function isRegExp(obj: unknown): obj is RegExp {
  return opt.call(obj) === '[object RegExp]'
}

/**
 * 判断给定的对象是否为日期类型
 * @category is
 * @param obj 要判断的对象
 * @returns 如果是日期类型，则返回true；否则返回false
 */
export function isDate(obj: unknown): obj is Date {
  return opt.call(obj) === '[object Date]'
}

/**
 * 判断给定的对象是否为函数类型
 * @category is
 * @param obj 要判断的对象
 * @returns 如果是函数类型，则返回true；否则返回false
 */
export function isFunction(obj: unknown): obj is (...args: any[]) => any {
  return opt.call(obj) === '[object Function]'
}

/**
 * 判断给定的对象是否为Symbol
 * @category is
 * @param obj
 * @returns
 */
export function isSymbol(obj: any): obj is Symbol {
  return opt.call(obj) === '[object Symbol]'
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
