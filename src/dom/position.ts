import { isClient } from '../is'

/**
 * 检查一个元素是否在指定的容器内
 *
 * 此函数通过比较元素和容器的边界矩形来判断元素是否在容器内
 * 它首先获取元素和容器的边界矩形（`getBoundingClientRect`），然后通过比较这些矩形的相对位置来判断元素是否在容器内
 *
 * @category dom
 * @param el 要检查的元素 如果未指定或不是在客户端，则函数返回`false`
 * @param container 指定的容器元素或`Window`对象 如果未指定或不是在客户端，则函数返回`false`
 * @returns 返回一个布尔值，表示元素是否在指定的容器内
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
 * 计算给定元素相对于文档顶部的偏移距离
 *
 * 此函数通过递归遍历元素的父元素，累加每个父元素相对于其offsetParent的顶部偏移距离（offsetTop）
 * 来计算给定元素相对于文档顶部的总偏移距离
 *
 * @param el 要计算其相对于文档顶部偏移距离的HTML元素
 * @returns 给定元素相对于文档顶部的偏移距离（单位：像素）
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
 * 计算元素距离文档左侧的绝对位置
 *
 * 该函数用于获取指定元素的左偏移量，即元素相对于文档左侧的绝对位置
 * 它通过遍历元素及其父元素的offsetLeft属性来计算总偏移量
 *
 * @param el 要计算偏移量的元素
 * @returns 元素距离文档左侧的绝对位置（以像素为单位）
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
 * 计算元素到其容器元素顶部的距离
 *
 * 此函数的目的是为了得到一个元素相对于其容器元素顶部的偏移距离
 * 它通过计算两个元素的偏移量之差来实现，使用了Math.abs()来确保距离为正值
 *
 * @category dom
 * @param el 要计算距离的元素
 * @param containerEl 容器元素，即参照物
 * @returns 返回元素到容器元素顶部的距离
 */
export const getOffsetTopDistance = (el: HTMLElement, containerEl: HTMLElement) => {
  return Math.abs(getOffsetTop(el) - getOffsetTop(containerEl))
}

/**
 * 计算元素到其父容器左侧的距离
 *
 * 此函数的作用是计算给定元素相对于其父容器左侧的距离
 * 它通过获取元素和容器的左侧偏移量之差的绝对值来实现
 * 这个距离可用于在页面布局中精确定位元素
 *
 * @category dom
 * @param el 要计算距离的元素
 * @param containerEl 元素所在的父容器
 * @returns 返回元素到父容器左侧的距离
 */
export const getOffsetLeftDistance = (el: HTMLElement, containerEl: HTMLElement) => {
  return Math.abs(getOffsetLeft(el) - getOffsetLeft(containerEl))
}

/**
 * 根据传入的事件对象获取客户端的 XY 坐标
 *
 * 该函数旨在处理鼠标和触摸事件，统一获取客户端坐标的方式
 * 通过判断事件类型，分别处理鼠标事件和触摸事件，以确保在不同输入设备上的一致性
 *
 * @category dom
 * @param event 鼠标事件或触摸事件对象
 * @returns 返回包含客户端 XY 坐标的对象
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
