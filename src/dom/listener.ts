/**
 * 给指定元素添加监听的事件
 * @category dom
 * @param element
 * @param event
 * @param handler
 * @param options
 * @returns 停止函数
 */
export const addEventListener = <K extends keyof HTMLElementEventMap>(
  element: HTMLElement | Window,
  event: K,
  handler: (ev: HTMLElementEventMap[K]) => void,
  options: boolean | AddEventListenerOptions = false
) => {
  element.addEventListener(event, handler as EventListenerOrEventListenerObject, options)
  return () => {
    removeEventListener(element, event, handler, options)
  }
}

/**
 * 移除指定元素上监听的事件
 * @category dom
 * @param element
 * @param type
 * @param handler
 * @param options
 */
export const removeEventListener = <K extends keyof HTMLElementEventMap>(
  element: HTMLElement | Window,
  type: K,
  handler: (ev: HTMLElementEventMap[K]) => void,
  options: boolean | EventListenerOptions = false
) => {
  element.removeEventListener(type, handler as EventListenerOrEventListenerObject, options)
}
