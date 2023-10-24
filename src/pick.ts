export function pick<T extends object, K extends keyof T>(source: T, fields: K[]): Pick<T, K>

export function pick<T extends object, K extends keyof T>(source: T | undefined | null, fields: K[]): Partial<Pick<T, K>>

/**
 * 根据参数类型返回相应的结果
 * @category pick
 * @param source 源对象，可以为 null 或 undefined
 * @param fields 要选择的字段数组
 * @returns 选择的字段组成的新对象，如果源对象为空值，则返回一个空对象
 */
export function pick<T extends object, K extends keyof T>(source: T | undefined | null, fields: K[]): Pick<T, K> | Partial<Pick<T, K>> {
  if (source === null || source === undefined) {
    return {}
  }

  const result = {} as Pick<T, K>

  fields.forEach((field) => {
    if (Object.prototype.hasOwnProperty.call(source, field)) {
      result[field] = source[field]
    }
  })

  return result
}
