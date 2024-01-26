import { isArray, isString, isObject } from './is'

/**
 * 数组/对象转className
 * @category dom
 * @param args
 * @returns className
 */
export function classNames(...args: any[]): string {
  const classes: string[] = []
  for (let i = 0; i < args.length; i++) {
    const value = args[i]
    // eslint-disable-next-line no-continue
    if (!value) continue
    if (isString(value)) {
      classes.push(value)
    } else if (isArray(value)) {
      for (let i = 0; i < value.length; i++) {
        const inner = classNames(value[i])
        if (inner) {
          classes.push(inner)
        }
      }
    } else if (isObject(value)) {
      for (const name in value) {
        if (value[name as keyof object]) {
          classes.push(name)
        }
      }
    }
  }
  return classes.join(' ')
}
