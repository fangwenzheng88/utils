/**
 * 从对象中获取指定键的值`obj[key] ?? defaultValue`，支持设置默认值
 *
 * 通过函数重载，推导返回值的类型
 *
 * @alpha
 * @category getObjectValue
 * @param obj - 要获取值的对象，可以是null、undefined
 * @param key - 要获取的键
 * @param defaultValue - 可选参数，如果未找到值，则返回该默认值，默认undefined
 * @returns null、undefined返回defaultValue，其他返回 `obj[key] ?? defaultValue`
 *
 * @example
 * ```
 * const data = { name: 'xiaoming', age: 18 }
 *
 * getObjectValue(data, 'name') // xiaoming 返回值的类型为 string
 * getObjectValue(data, 'age') // 18 返回值的类型为 number
 *
 * const key:string= 'gender'
 * getObjectValue(data, key) // undefined 返回值的类型为 string | number | undefined
 * getObjectValue(data, key , [1]) // man 返回值的类型为 string | number | number[]
 * ```
 */

export function getObjectValue<T extends object, K extends keyof T>(obj: T, key: K): T[K]

export function getObjectValue<T extends object, K extends keyof T>(obj: T | null | undefined, key: K): T[K] | undefined

export function getObjectValue<T extends object, K extends keyof T>(obj: T | null | undefined, key: K, defaultValue: NonNullable<T[K]>): NonNullable<T[K]>

export function getObjectValue<T extends object>(obj: T | null | undefined, key: string): T[keyof T] | undefined

export function getObjectValue<T extends object, P>(obj: T | null | undefined, key: string, defaultValue: P): NonNullable<T[keyof T]> | P

export function getObjectValue(obj: any, key: string, defaultValue?: any) {
  if (obj === null || obj === undefined) {
    return defaultValue
  }
  return obj[key] ?? defaultValue
}
