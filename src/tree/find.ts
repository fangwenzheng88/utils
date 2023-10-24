import type { TreeNode } from './types'

/**
 * 查找单个节点的函数
 * @category tree/find
 * @param nodes 节点数组
 * @param callback 回调函数，判断节点是否满足条件
 * @param childrenFieldName 子节点数组字段名，默认为 'children'
 * @returns 满足条件的节点，如果没有找到，则返回 null
 */
export function findTreeNode<T extends TreeNode>(nodes: T[], callback: (node: T) => boolean, childrenFieldName: keyof T = 'children'): T | undefined {
  for (const node of nodes) {
    if (callback(node)) {
      return node
    }

    const children = node[childrenFieldName] as T[]
    if (children) {
      const result = findTreeNode(children, callback)
      if (result) {
        return result
      }
    }
  }

  return undefined
}

/**
 * 查找多个节点的函数
 * @category tree/find
 * @param nodes 节点数组
 * @param callback 回调函数，判断节点是否满足条件
 * @param childrenFieldName 子节点数组字段名，默认为 'children'
 * @returns 满足条件的节点数组
 */
export function findTreeNodes<T extends TreeNode>(nodes: T[], callback: (node: T) => boolean, childrenFieldName: keyof T = 'children'): T[] {
  const results: T[] = []

  for (const node of nodes) {
    if (callback(node)) {
      results.push(node)
    }

    const children = node[childrenFieldName] as T[]
    if (children) {
      const childResults = findTreeNodes(children, callback)
      results.push(...childResults)
    }
  }

  return results
}

/**
 * 查找符合条件节点的父节点及祖先节点
 * @category tree/find
 * @param nodes 节点数组
 * @param callback 回调函数，判断节点是否满足条件，确保只有一个节点符合条件，如果多个节点符合条件，会返回多个节点的父节点及祖先节点
 * @param childrenFieldName 子节点数组字段名，默认为 'children'
 * @returns 满足条件的父节点数组
 */
export function findTreeParents<T extends TreeNode>(nodes: readonly T[], callback: (node: T) => boolean, childrenFieldName: keyof T = 'children'): T[] {
  const parents: T[] = []

  for (const node of nodes) {
    const children = node[childrenFieldName] as T[]
    if (children) {
      if (children.some(callback)) {
        parents.push(node)
      }

      const childParents = findTreeParents(children, callback, childrenFieldName)
      if (childParents.length > 0) {
        parents.push(node, ...childParents)
      }
    }
  }

  return parents
}

/**
 * 查找符合条件节点的父节点
 * @category tree/find
 * @param nodes 节点数组
 * @param callback 回调函数，判断节点是否满足条件，确保只有一个节点符合条件，如果多个节点符合条件，会返回多个节点的父节点
 * @param childrenFieldName 子节点数组字段名，默认为 'children'
 * @returns 满足条件的父节点数组
 */
export function findTreeParent<T extends TreeNode>(
  nodes: readonly T[],
  callback: (node: T) => boolean,
  childrenFieldName: keyof T = 'children'
): T | undefined {
  const parents: T[] = findTreeParents(nodes, callback, childrenFieldName)

  return parents.length > 0 ? parents[parents.length - 1] : undefined
}
