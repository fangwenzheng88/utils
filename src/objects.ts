/**
 * @category object
 */
export type Entry<T> = [keyof T, T[keyof T]]

/**
 * @category object
 */
export const keysOf = <T extends object>(arr: T) => Object.keys(arr) as Array<keyof T>

/**
 * @category object
 */
export const entriesOf = <T extends object>(arr: T) => Object.entries(arr) as Entry<T>[]

/**
 * @category object
 */
export const hasOwn = (val: object, key: string | symbol): key is keyof typeof val => Object.prototype.hasOwnProperty.call(val, key)
