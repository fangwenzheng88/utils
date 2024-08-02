/**
 * 动态添加事件监听器
 *
 * 此函数允许以类型安全的方式添加事件监听器，并提供默认的事件监听器移除功能
 * 使用泛型 K 来自定义事件类型，从而确保传入的事件类型与 HTMLElementEventMap 中的事件类型相匹配
 * 这种方法不仅可以提高代码的可读性，还可以在不需要时自动移除事件监听器，从而避免内存泄漏
 *
 * @category dom
 * @param element - 要添加事件监听器的 DOM 元素或 Window 对象
 * @param event - 要监听的事件类型，必须是 HTMLElementEventMap 中的一个有效事件类型
 * @param handler - 事件被触发时执行的函数
 * @param options - 添加事件监听器的配置选项，可以是布尔值或 AddEventListenerOptions 对象，默认为 false
 * @returns 一个用于移除事件监听器的函数当不再需要事件监听器时，调用此函数可以避免内存泄漏
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
 * 移除HTML元素或Window对象上的事件监听器
 *
 * 此函数提供了一种统一的方式来移除HTML元素或Window对象上的事件监听器，
 * 它使用泛型K来允许只对HTMLElement的事件映射表中的键进行操作，
 * 从而确保类型安全和代码的清晰性
 *
 * @category dom
 * @param element - 要移除事件监听器的HTML元素或Window对象
 * @param type - 要移除的事件类型，必须是HTMLElementEventMap中的一个有效键
 * @param handler - 事件处理函数，当事件触发时会被调用
 * @param options - 可选参数，用于指定事件监听器的选项，如是否在捕获阶段处理事件等，默认为false
 */
export const removeEventListener = <K extends keyof HTMLElementEventMap>(
  element: HTMLElement | Window,
  type: K,
  handler: (ev: HTMLElementEventMap[K]) => void,
  options: boolean | EventListenerOptions = false
) => {
  element.removeEventListener(type, handler as EventListenerOrEventListenerObject, options)
}
