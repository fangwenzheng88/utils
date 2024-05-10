import * as CSS from 'csstype'
import { isObject, isString, isNumeric, isUnDef } from '../is'
import { entriesOf, keysOf } from '../objects'

export interface CSSProperties extends CSS.Properties<string | number>, CSS.PropertiesHyphen<string | number> {
  /**
   * The index signature was removed to enable closed typing for style
   * using CSSType. You're able to use type assertion or module augmentation
   * to add properties or an index signature of your own.
   *
   * For examples and more information, visit:
   * https://github.com/frenic/csstype#what-should-i-do-when-i-get-type-errors
   */
  [v: `--${string}`]: string | number | undefined
}

const camelizeRE = /-(\w)/g
function camelize(str: string) {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))
}

const classNameToArray = (cls = '') => cls.split(' ').filter((item) => !!item.trim())

/**
 * 判断指定元素是否包含某个class
 * @category dom
 */
export const hasClass = (el: Element, cls: string): boolean => {
  if (!el || !cls) return false
  if (cls.includes(' ')) throw new Error('className should not contain space.')
  return el.classList.contains(cls)
}

/**
 * 给指定元素添加className
 * @category dom
 */
export const addClass = (el: Element, cls: string) => {
  if (!el || !cls.trim()) return
  el.classList.add(...classNameToArray(cls))
}

/**
 * 给指定元素移除某个className
 * @category dom
 */
export const removeClass = (el: Element, cls: string) => {
  if (!el || !cls.trim()) return
  el.classList.remove(...classNameToArray(cls))
}

/**
 * 获取指定元素的style值
 * @category dom
 */
export const getStyle = (element: HTMLElement, styleName: keyof CSSProperties): string => {
  let key = camelize(styleName)
  if (key === 'float') key = 'cssFloat'
  try {
    const style = (element.style as any)[key]
    if (style) return style
    const computed: any = document.defaultView?.getComputedStyle(element, '')
    return computed ? computed[key] : ''
  } catch {
    return (element.style as any)[key]
  }
}

/**
 * 设置指定元素的style值
 * @category dom
 */
export const setStyle = (element: HTMLElement, styleName: CSSProperties | keyof CSSProperties, value?: string | number) => {
  if (!element || !styleName) return

  if (isObject(styleName)) {
    entriesOf(styleName).forEach(([prop, value]) => setStyle(element, prop, value))
  } else {
    const key: any = camelize(styleName)
    element.style[key] = value as any
  }
}

/**
 * 移除指定元素的style值
 * @category dom
 */
export const removeStyle = (element: HTMLElement, style: CSSProperties | keyof CSSProperties) => {
  if (!element || !style) return

  if (isObject(style)) {
    keysOf(style).forEach((prop) => removeStyle(element, prop))
  } else {
    setStyle(element, style, '')
  }
}

/**
 * 添加单位
 * @category dom
 *
 * @example
 * ```ts
 * addStyleUnit('') // ''
 * addStyleUnit(null) // ''
 * addStyleUnit(undefined) // ''
 * addStyleUnit(0) // '0px'
 * addStyleUnit(10) // '10px'
 * addStyleUnit('10') // '10px'
 * addStyleUnit('10px') // '10px'
 * addStyleUnit('10%') // '10%'
 * ```
 */
export function addStyleUnit(value?: string | number | null, defaultUnit = 'px') {
  if (isUnDef(value) || value === '') {
    return ''
  }
  if (isNumeric(value)) {
    return `${Number(value)}${defaultUnit}`
  }
  if (isString(value)) {
    return value
  }
  return ''
}
