import { isClient } from '../is'
import { getStyle } from './style'

type Direction = 'x' | 'y'

/**
 * 判断给定的元素是否具有滚动条
 *
 * 此函数用于检测指定元素在某个方向上（默认为垂直方向）是否可能出现滚动条
 * 它通过检查元素的某个overflow属性值是否为'.scroll', 'auto', 或'overlay'来判断
 *
 * @category dom
 * @param el 要检测的元素
 * @param direction 滚动条的方向，默认为'y'（垂直滚动条）
 * @returns 如果元素在指定方向上有滚动条，则返回true；否则返回false
 */
export const isScroll = (el: HTMLElement, direction: Direction = 'y'): boolean => {
  if (!isClient()) return false

  const key = (
    {
      x: 'overflow-y',
      y: 'overflow-x',
    } as const
  )[String(direction)]!
  const overflow = getStyle(el, key)
  return ['scroll', 'auto', 'overlay'].some((s) => overflow.includes(s))
}

/**
 * 获取给定元素的滚动容器
 *
 * 此函数用于找到一个元素的最近滚动容器，可以是 window，也可以是一个设置了滚动条的元素
 *
 * @category dom
 * @param el 要查找滚动容器的元素
 * @param direction 滚动方向，默认为 'y'，表示竖向滚动 可选值为 'x' 或 'y'
 * @returns 返回找到的滚动容器，可能是 window，也可能是某个设置了滚动条的 HTMLElement，如果没有找到，则返回 undefined
 */
export const getScrollContainer = (el: HTMLElement, direction: Direction = 'y'): Window | HTMLElement | undefined => {
  let parent: HTMLElement = el
  while (parent) {
    if ([window, document, document.documentElement].includes(parent)) {
      return window
    }

    if (isScroll(parent, direction)) {
      return parent
    }

    parent = parent.parentNode as HTMLElement
  }

  return parent
}
