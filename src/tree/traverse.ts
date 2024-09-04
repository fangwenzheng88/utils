import { isArray } from '../is'
import type { TreeNode } from './types'

/**
 * 深度优先遍历树形数据
 *
 * @category tree
 * @param data 树形数据
 * @param callback 回调函数
 * @param childrenFieldName 子节点字段名
 * @param executeCallbackAfter callback的执行时机
 */
export function traverseTreeDFS<T extends TreeNode>(data: T[], callback?: (node: T) => void, childrenFieldName: keyof T = 'children') {
  traverseDFS(data, callback, childrenFieldName, false)
}

/**
 * 深度优先遍历树形数据
 *
 * @category tree
 * @param data 树形数据
 * @param callback 回调函数
 * @param childrenFieldName 子节点字段名
 * @param executeCallbackAfter callback的执行时机
 */
export function traverseTreeDFSCallbackAfter<T extends TreeNode>(data: T[], callback?: (node: T) => void, childrenFieldName: keyof T = 'children') {
  return traverseDFS(data, callback, childrenFieldName, true)
}

/**
 * 深度优先遍历树形数据
 *
 * @category tree
 * @param data 树形数据
 * @param callback 回调函数
 * @param childrenFieldName 子节点字段名
 * @param executeCallbackAfter callback的执行时机
 */
function traverseDFS<T extends TreeNode>(data: T[], callback?: (node: T) => void, childrenFieldName: keyof T = 'children', executeCallbackAfter = false) {
  if (!isArray(data)) {
    return
  }
  for (const node of data) {
    if (callback && !executeCallbackAfter) {
      callback(node)
    }

    const children = node[childrenFieldName] as T[]
    if (Array.isArray(children)) {
      traverseDFS(children, callback, childrenFieldName, executeCallbackAfter)
    }

    if (callback && executeCallbackAfter) {
      callback(node)
    }
  }
}

/**
 * 广度优先遍历树形数据
 *
 * @category tree
 * @param data 树形数据
 * @param callback 回调函数
 * @param childrenFieldName 子节点字段名
 */
export function traverseTreeBFS<T extends TreeNode>(data: T[], callback?: (node: T) => void, childrenFieldName: keyof T = 'children') {
  if (!isArray(data)) {
    return
  }

  const queue: T[] = []

  for (const node of data) {
    queue.push(node)
  }

  while (queue.length > 0) {
    const node = queue.shift()!

    if (callback) {
      callback(node)
    }

    const children = node[childrenFieldName] as T[]
    if (Array.isArray(children)) {
      for (const child of children) {
        queue.push(child)
      }
    }
  }
}
