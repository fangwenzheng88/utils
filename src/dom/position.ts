import { isClient } from '../is'

/**
 * 检查一个元素是否在指定的容器内。
 * @category dom
 * @param el? 可选参数，要检查的元素。
 * @param container? 可选参数，指定的容器，可以是Element或Window。
 * @returns 返回一个布尔值，表示元素是否在容器内。
 */
export const elementIsInContainer = (el?: Element, container?: Element | Window): boolean => {
  if (!isClient() || !el || !container) return false

  const elRect = el.getBoundingClientRect()

  let containerRect: Pick<DOMRect, 'top' | 'bottom' | 'left' | 'right'>
  if (container instanceof Element) {
    containerRect = container.getBoundingClientRect()
  } else {
    containerRect = {
      top: 0,
      right: window.innerWidth,
      bottom: window.innerHeight,
      left: 0,
    }
  }
  return elRect.top < containerRect.bottom && elRect.bottom > containerRect.top && elRect.right > containerRect.left && elRect.left < containerRect.right
}

/**
 * 获取指定元素相对于其最近的静态定位祖先元素的顶部偏移量。
 * @category dom
 * @param el 指定的HTMLElement元素。
 * @returns 返回元素相对于其最近的静态定位祖先元素的顶部偏移量，以像素为单位。
 */
export const getOffsetTop = (el: HTMLElement) => {
  let offset = 0
  let parent = el

  while (parent) {
    offset += parent.offsetTop
    parent = parent.offsetParent as HTMLElement
  }

  return offset
}

/**
 * 获取指定HTMLElement元素相对于其offsetParent左上角的横向偏移量。
 * @category dom
 * @param el 指定的HTMLElement元素。
 * @returns 返回元素相对于其offsetParent左上角的横向偏移量。
 */
export const getOffsetLeft = (el: HTMLElement) => {
  let offset = 0
  let parent = el

  while (parent) {
    offset += parent.offsetLeft
    parent = parent.offsetParent as HTMLElement
  }

  return offset
}

/**
 * @category dom
 * @param el
 * @param containerEl
 * @returns
 */
export const getOffsetTopDistance = (el: HTMLElement, containerEl: HTMLElement) => {
  return Math.abs(getOffsetTop(el) - getOffsetTop(containerEl))
}

/**
 * @category dom
 * @param el
 * @param containerEl
 * @returns
 */
export const getOffsetLeftDistance = (el: HTMLElement, containerEl: HTMLElement) => {
  return Math.abs(getOffsetLeft(el) - getOffsetLeft(containerEl))
}

/**
 * @category dom
 * @param event
 * @returns
 */
export const getClientXY = (event: MouseEvent | TouchEvent) => {
  let clientX: number
  let clientY: number
  if (event.type === 'touchend') {
    clientY = (event as TouchEvent).changedTouches[0].clientY
    clientX = (event as TouchEvent).changedTouches[0].clientX
  } else if (event.type.startsWith('touch')) {
    clientY = (event as TouchEvent).touches[0].clientY
    clientX = (event as TouchEvent).touches[0].clientX
  } else {
    clientY = (event as MouseEvent).clientY
    clientX = (event as MouseEvent).clientX
  }
  return {
    clientX,
    clientY,
  }
}
