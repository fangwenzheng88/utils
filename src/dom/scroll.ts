import { isClient } from '../is'
import { getStyle } from './style'

type Direction = 'x' | 'y'

/**
 * @category dom
 * @param el
 * @param direction
 * @returns
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
 * @category dom
 * @param el
 * @param direction
 * @returns
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
