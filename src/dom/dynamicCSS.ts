import { canUseDom } from './canUseDom'

function contains(root: Node | null | undefined, n?: Node) {
  if (!root) {
    return false
  }

  // Use native if support
  if (root.contains) {
    // @ts-expect-error
    return root.contains(n)
  }

  return false
}

const APPEND_ORDER = 'data-css-order'
const MARK_KEY = `data-css-mark-key`

const containerCache = new Map<ContainerType, Node & ParentNode>()

type ContainerType = Element | ShadowRoot
type Prepend = boolean | 'queue'
type AppendType = 'prependQueue' | 'append' | 'prepend'

interface Options {
  attachTo?: ContainerType
  csp?: { nonce?: string }
  prepend?: Prepend
  mark?: string
}

function getMark({ mark }: Options = {}) {
  if (mark) {
    return mark.startsWith('data-') ? mark : `data-${mark}`
  }
  return MARK_KEY
}

function getContainer(option: Options) {
  if (option.attachTo) {
    return option.attachTo
  }

  const head = document.querySelector('head')
  return head || document.body
}

function getOrder(prepend?: Prepend): AppendType {
  if (prepend === 'queue') {
    return 'prependQueue'
  }

  return prepend ? 'prepend' : 'append'
}

/**
 * Find style which inject by rc-util
 */
function findStyles(container: ContainerType) {
  return Array.from((containerCache.get(container) || container).children).filter((node) => node.tagName === 'STYLE') as HTMLStyleElement[]
}

/**
 * 向文档中注入CSS代码
 *
 * @category dom
 * @param css 需要注入的CSS代码
 * @param option 可选配置项，包括CSP nonce和插入位置
 *
 * @returns 注入的style节点或在DOM不可用时返回null
 */
export function injectCSS(css: string, option: Options = {}) {
  if (!canUseDom()) {
    return null
  }

  const { csp, prepend } = option

  const styleNode = document.createElement('style')
  styleNode.setAttribute(APPEND_ORDER, getOrder(prepend))

  if (csp?.nonce) {
    styleNode.nonce = csp?.nonce
  }
  styleNode.innerHTML = css

  const container = getContainer(option)
  const { firstChild } = container

  if (prepend) {
    // If is queue `prepend`, it will prepend first style and then append rest style
    if (prepend === 'queue') {
      // @ts-expect-error
      const existStyle = findStyles(container).filter((node) => ['prepend', 'prependQueue'].includes(node.getAttribute(APPEND_ORDER)))
      if (existStyle.length) {
        container.insertBefore(styleNode, existStyle[existStyle.length - 1].nextSibling)

        return styleNode
      }
    }

    // Use `insertBefore` as `prepend`
    container.insertBefore(styleNode, firstChild)
  } else {
    container.appendChild(styleNode)
  }

  return styleNode
}

function findExistNode(key: string, option: Options = {}) {
  const container = getContainer(option)

  return findStyles(container).find((node) => node.getAttribute(getMark(option)) === key)
}

/**
 * 移除与特定键关联的CSS样式元素。
 *
 * @category dom
 * @param key - 用于识别要移除的CSS样式的唯一键。
 * @param option - 可选参数，提供额外的配置选项，默认为空对象。
 */
export function removeCSS(key: string, option: Options = {}) {
  const existNode = findExistNode(key, option)
  if (existNode) {
    const container = getContainer(option)
    container.removeChild(existNode)
  }
}

/**
 * qiankun will inject `appendChild` to insert into other
 */
function syncRealContainer(container: ContainerType, option: Options) {
  const cachedRealContainer = containerCache.get(container)

  // Find real container when not cached or cached container removed
  if (!cachedRealContainer || !contains(document, cachedRealContainer)) {
    const placeholderStyle = injectCSS('', option)
    // @ts-expect-error
    const { parentNode } = placeholderStyle
    containerCache.set(container, parentNode)
    // @ts-expect-error
    container.removeChild(placeholderStyle)
  }
}

/**
 * manually clear container cache to avoid global cache in unit testes
 * @category dom
 * @private
 */
export function clearContainerCache() {
  containerCache.clear()
}

/**
 * 更新或插入CSS节点
 *
 * 此函数首先尝试查找是否存在指定key的CSS节点如果存在，则根据传入的CSS内容和配置信息进行更新，
 * 包括但不限于设置或更新内容安全策略（CSP）的nonce值和CSS内容如果不存在，则创建一个新的CSS节点，
 * 并设置其内容为传入的CSS内容
 *
 * @category dom
 * @param {string} css - 需要更新的CSS内容
 * @param {string} key - CSS节点的唯一标识
 * @param {Options} option - 可选的配置对象，默认为空对象
 *
 * @returns {HTMLElement} 更新后的或新创建的CSS节点
 */
export function updateCSS(css: string, key: string, option: Options = {}) {
  const container = getContainer(option)

  // Sync real parent
  syncRealContainer(container, option)

  const existNode = findExistNode(key, option)

  if (existNode) {
    if (option.csp?.nonce && existNode.nonce !== option.csp?.nonce) {
      existNode.nonce = option.csp?.nonce
    }

    if (existNode.innerHTML !== css) {
      existNode.innerHTML = css
    }

    return existNode
  }

  const newNode = injectCSS(css, option)
  // @ts-expect-error
  newNode.setAttribute(getMark(option), key)
  return newNode
}
