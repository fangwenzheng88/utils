type Transform<T> = { [key: string]: TransformFunction<T> }
type TransformFunction<T> = (obj: T, key: string) => unknown

export function pickTransform<T extends Record<string, any>, K extends keyof T, P extends Transform<T>>(
  source: T,
  keys: K[],
  transform: P & { [key in K]?: never }
): { [key in K]: T[key] } & { [key in keyof P]: ReturnType<P[key]> }

export function pickTransform<T extends Record<string, any>, K extends keyof T, P extends Transform<T>>(
  source: T | undefined | null,
  keys: K[],
  transform: P & { [key in K]?: never }
): Partial<{ [key in K]: T[key] } & { [key in keyof P]: ReturnType<P[key]> }>

/**
 * 从提供的对象中选择指定的字段，并可选择应用转换函数添加额外的字段。
 * @category pickTransform
 * @param source 待选择字段的对象。
 * @param keys 要选择的键数组。
 * @param transform 包含键转换函数的对象。键应与待选择的键数组对应。
 * @returns 返回一个新的对象，包含选定的键值对以及应用转换函数后的键值对。
 *
 * @example
 * ```ts
 * const source: Person = {
 *   name: 'Alice',
 *   age: 18,
 *   location: 'New York'
 * }
 *
 * const result = pickTransform(source, ['name', 'location'], {
 *   ageStr: (val) => `${val.age}岁`
 * })
 *
 * console.log(result);
 * // Output: { name: 'Alice', location: 'New York', ageStr: '18岁' }
 * ```
 *
 * @example
 * ```ts
 * const source: Person|null = null
 *
 * const result = pickTransform(source, ['name', 'location'], {
 *   ageStr: (val) => `${val.age}岁`
 * })
 *
 * console.log(result);
 * // Output: { }
 * ```
 */
export function pickTransform<T extends Record<string, any>>(source: T, keys: string[], transform: Transform<T>) {
  if (source === null || source === undefined) {
    return {}
  }

  const result: any = {}

  for (const key of keys) {
    result[key] = source[key]
  }

  for (const key of Object.keys(transform)) {
    result[key] = transform[key](source, key)
  }

  return result
}
