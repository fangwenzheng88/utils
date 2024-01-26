let cached: number

/**
 * 获取滚动条的宽度
 * @category dom
 * @param fresh 是否重新获取，默认会使用上一次缓存的值
 * @returns 滚动条的宽度
 */
export function getScrollBarSize(fresh?: boolean) {
  if (typeof document === 'undefined') {
    return 0
  }

  if (fresh || cached === undefined) {
    const inner = document.createElement('div')
    inner.style.width = '100%'
    inner.style.height = '200px'

    const outer = document.createElement('div')
    const outerStyle = outer.style

    outerStyle.position = 'absolute'
    outerStyle.top = '0'
    outerStyle.left = '0'
    outerStyle.pointerEvents = 'none'
    outerStyle.visibility = 'hidden'
    outerStyle.width = '200px'
    outerStyle.height = '150px'
    outerStyle.overflow = 'hidden'

    outer.appendChild(inner)

    document.body.appendChild(outer)

    const widthContained = inner.offsetWidth
    outer.style.overflow = 'scroll'
    let widthScroll = inner.offsetWidth

    if (widthContained === widthScroll) {
      widthScroll = outer.clientWidth
    }

    document.body.removeChild(outer)

    cached = widthContained - widthScroll
  }
  return cached
}

function ensureSize(str: string) {
  const match = str.match(/^(.*)px$/)
  const value = Number(match?.[1])
  return Number.isNaN(value) ? getScrollBarSize() : value
}

/**
 * 获取指定元素滚动条的宽度和高度
 * @category dom
 * @param target 指定元素
 * @returns 指定元素滚动条的宽度和高度
 */
export function getTargetScrollBarSize(target: HTMLElement) {
  if (typeof document === 'undefined' || !target || !(target instanceof Element)) {
    return { width: 0, height: 0 }
  }

  const { width, height } = getComputedStyle(target, '::-webkit-scrollbar')
  return {
    width: ensureSize(width),
    height: ensureSize(height),
  }
}
