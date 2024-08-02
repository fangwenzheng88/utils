import { isClient, isWindow } from '../is'

function getScroll(target: HTMLElement | Window | Document | null, top: boolean): number {
  if (!isClient()) {
    return 0
  }
  const method = top ? 'scrollTop' : 'scrollLeft'
  let result = 0
  if (isWindow(target)) {
    result = target[top ? 'scrollY' : 'scrollX'] ?? target[top ? 'pageYOffset' : 'pageXOffset']
  } else if (target instanceof Document) {
    result = target.documentElement[method]
  } else if (target instanceof HTMLElement) {
    result = target[method]
  } else if (target) {
    // According to the type inference, the `target` is `never` type.
    // Since we configured the loose mode type checking, and supports mocking the target with such shape below::
    //    `{ documentElement: { scrollLeft: 200, scrollTop: 400 } }`,
    //    the program may falls into this branch.
    // Check the corresponding tests for details. Don't sure what is the real scenario this happens.
    result = target[method]
  }

  if (target && !isWindow(target) && typeof result !== 'number') {
    result = ((target.ownerDocument ?? target) as any).documentElement?.[method]
  }
  return result
}

/**
 * 获取指定元素或窗口的滚动顶部位置。
 *
 * @category dom
 * @param target 指定的滚动目标，可以是HTMLElement、Window、Document或null。
 * @returns 返回目标的滚动顶部位置，如果目标无效，则返回0。
 */
export function getScrollTop(target: HTMLElement | Window | Document | null): number {
  return getScroll(target, true)
}

/**
 * 获取指定元素或窗口的左滚动位置。
 *
 * @category dom
 * @param target 指定的滚动元素、窗口或文档。可为 null。
 * @returns 返回目标的左滚动位置的数字值。
 */
export function getScrollLeft(target: HTMLElement | Window | Document | null): number {
  return getScroll(target, false)
}
