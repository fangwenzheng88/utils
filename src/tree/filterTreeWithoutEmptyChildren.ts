import type { TreeNode } from './types'

/**
 * 过滤树形数据，移除所有子节点为空的节点
 * @category tree
 * @param treeDataArr - 需要过滤的树形数据数组
 * @param childrenFieldName - 子节点字段名，默认为 'children'
 * @returns 新的树形数据数组，其中不包含任何子节点为空的节点
 */
export function filterTreeWithoutEmptyChildren<T extends TreeNode>(treeDataArr: T[], childrenFieldName: keyof T = 'children'): T[] {
  const filteredNodes: T[] = []
  for (const node of treeDataArr) {
    const children = node[childrenFieldName]
    if (Array.isArray(children)) {
      const filteredChildren = filterTreeWithoutEmptyChildren(children, childrenFieldName)

      if (filteredChildren.length > 0) {
        const remainingNodeWithFilteredChildren = {
          ...node,
          [childrenFieldName]: filteredChildren,
        }
        filteredNodes.push(remainingNodeWithFilteredChildren)
      }
    } else {
      filteredNodes.push({ ...node })
    }
  }
  return filteredNodes
}
