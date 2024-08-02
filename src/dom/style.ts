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
 * 检查元素是否包含指定的类名
 *
 * @category dom
 * @param {Element} el - 要检查的DOM元素
 * @param {string} cls - 要检查的类名
 * @returns {boolean} - 如果元素包含类名返回true，否则返回false
 * @throws {Error} - 如果类名包含空格，则抛出错误
 */
export const hasClass = (el: Element, cls: string): boolean => {
  if (!el || !cls) return false
  if (cls.includes(' ')) throw new Error('className should not contain space.')
  return el.classList.contains(cls)
}

/**
 * 给元素添加一个或多个类名
 *
 * @category dom
 * @param el 要操作的DOM元素
 * @param cls 要添加的类名，可以是单个类名或用空格分隔的多个类名
 */
export const addClass = (el: Element, cls: string) => {
  if (!el || !cls.trim()) return
  el.classList.add(...classNameToArray(cls))
}

/**
 * 从指定元素移除一个或多个类。
 *
 * 此函数用于高效地从DOM元素中移除一个或多个类名。它首先检查元素与类名是否有效，
 * 然后使用classList.remove方法来移除类名，确保操作的效率与可靠性。
 *
 * @category dom
 * @param el 目标元素，可以是任何DOM元素。
 * @param cls 要移除的类名，支持通过空格分隔的多个类名字符串。
 */
export const removeClass = (el: Element, cls: string) => {
  if (!el || !cls.trim()) return
  el.classList.remove(...classNameToArray(cls))
}

/**
 * 获取元素的样式值
 *
 * 此函数用于从一个HTMLElement对象中获取指定样式的值它可以获取到内联样式和浏览器计算的样式
 * 在某些情况下，它通过将样式名称驼峰化来适配CSS属性名，并处理了‘float’属性的特殊情况
 *
 * @category dom
 * @param element 要获取样式的HTML元素
 * @param styleName 需要获取的CSS属性名，如'color'、'fontSize'等
 * @returns 返回指定样式的值如果无法获取，则返回空字符串
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
 * 设置HTML元素的样式
 *
 * 该函数可以接受一个HTML元素和一个样式名和值，或者一个包含样式名和值的对象
 * 它允许以编程方式动态地设置元素的样式属性
 *
 * @category dom
 * @param element 要设置样式的HTML元素
 * @param styleName 样式名或包含样式名和值的对象
 * @param value 样式值，仅在styleName为字符串时有效
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
 * 移除指定元素的样式
 *
 * @category dom
 * @param element 要处理的DOM元素
 * @param style 要移除的样式，可以是CSSProperties对象或其键
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
/**
 * 将给定的值转换为带有单位的样式字符串
 *
 * @param value - 待转换的值，可以是字符串、数字或null
 * @param defaultUnit - 默认的单位，当值为数字时使用，默认为'px'
 * @returns 返回转换后的带有单位的字符串，或空字符串
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
