/**
 * 检查元素是否可见
 *
 * 此函数用于判断传入的元素（HTML或SVG元素）是否在可见
 * 它通过检查元素的offsetParent属性或getBBox方法来判断元素是否可见
 * 如果元素没有offsetParent，那么它可能是一个SVG元素，因此尝试使用getBBox方法
 * 如果这些方法都不可用，或者元素的大小为0，则认为元素不可见
 *
 * @category dom
 * @param element 要检查的元素，可以是HTML元素或SVG元素
 * @returns 如果元素可见，则返回true；否则返回false
 */
export function isVisible(element: HTMLElement | SVGGraphicsElement): boolean {
  if (!element) {
    return false
  }

  if ((element as HTMLElement).offsetParent) {
    return true
  }

  if ((element as SVGGraphicsElement).getBBox) {
    const box = (element as SVGGraphicsElement).getBBox()
    if (box.width || box.height) {
      return true
    }
  }

  if ((element as HTMLElement).getBoundingClientRect) {
    const box = (element as HTMLElement).getBoundingClientRect()
    if (box.width || box.height) {
      return true
    }
  }

  return false
}
