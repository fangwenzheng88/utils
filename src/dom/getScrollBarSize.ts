let cached: number

/**
 * 获取滚动条的宽度
 *
 * @category dom
 * @param fresh 是否强制重新计算滚动条宽度，如果为true，则即使已经缓存过滚动条宽度也会重新计算
 * @returns 返回滚动条的宽度，如果无法计算则返回0
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
 * 获取目标元素的滚动条尺寸
 *
 * 此函数旨在计算并返回目标HTML元素的滚动条宽度和高度
 * 如果在不支持滚动条样式定制的环境中运行，或者传入的元素不是一个有效的HTML元素，则函数将返回一个默认值
 *
 * @category dom
 * @param target 目标HTML元素
 * @returns 返回一个包含滚动条宽度和高度的对象，单位为像素
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
