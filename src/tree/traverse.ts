import type { TreeNode } from './types'

/**
 * 深度优先遍历树形数据
 * @category tree
 * @param data 树形数据
 * @param callback 回调函数
 * @param childrenFieldName 子节点字段名
 * @param executeCallbackAfter callback的执行时机
 */
export function traverseTreeDFS<T extends TreeNode>(data: T[], callback?: (node: T, parentNodes: T[]) => void, childrenFieldName: keyof T = 'children') {
  traverseDFS(data, callback, childrenFieldName, [], false)
}

/**
 * 深度优先遍历树形数据
 * @category tree
 * @param data 树形数据
 * @param callback 回调函数
 * @param childrenFieldName 子节点字段名
 * @param executeCallbackAfter callback的执行时机
 */
export function traverseTreeDFSCallbackAfter<T extends TreeNode>(
  data: T[],
  callback?: (node: T, parentNodes: T[]) => void,
  childrenFieldName: keyof T = 'children'
) {
  return traverseDFS(data, callback, childrenFieldName, [], true)
}

/**
 * 深度优先遍历树形数据
 * @param data 树形数据
 * @param callback 回调函数
 * @param childrenFieldName 子节点字段名
 * @param parentNodes 父节点数组
 * @param executeCallbackAfter callback的执行时机
 */
function traverseDFS<T extends TreeNode>(
  data: T[],
  callback?: (node: T, parentNodes: T[]) => void,
  childrenFieldName: keyof T = 'children',
  parentNodes: T[] = [],
  executeCallbackAfter = false
) {
  for (const node of data) {
    if (callback && !executeCallbackAfter) {
      callback(node, parentNodes)
    }

    const children = node[childrenFieldName] as T[]
    if (Array.isArray(children)) {
      traverseDFS(children, callback, childrenFieldName, [node, ...parentNodes], executeCallbackAfter)
    }

    if (callback && executeCallbackAfter) {
      callback(node, parentNodes)
    }
  }
}

/**
 * 广度优先遍历树形数据
 * @category tree
 * @param data 树形数据
 * @param callback 回调函数
 * @param childrenFieldName 子节点字段名
 */
export function traverseTreeBFS<T extends TreeNode>(data: T[], callback?: (node: T, parentNodes: T[]) => void, childrenFieldName: keyof T = 'children') {
  traverseBFS(data, callback, childrenFieldName, [])
}

/**
 * 广度优先遍历树形数据
 * @param data 树形数据
 * @param callback 回调函数
 * @param childrenFieldName 子节点字段名
 * @param parentNodes 父节点数组
 */
function traverseBFS<T extends TreeNode>(
  data: T[],
  callback?: (node: T, parentNodes: T[]) => void,
  childrenFieldName: keyof T = 'children',
  parentNodes: T[] = []
) {
  const queue: { node: T; parents: T[] }[] = []

  for (const node of data) {
    queue.push({ node, parents: parentNodes })
  }

  while (queue.length > 0) {
    const { node, parents } = queue.shift()!

    if (callback) {
      callback(node, parents)
    }

    const children = node[childrenFieldName] as T[]
    if (Array.isArray(children)) {
      for (const child of children) {
        queue.push({ node: child, parents: [node, ...parents] })
      }
    }
  }
}
