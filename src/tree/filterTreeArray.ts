import type { TreeNode } from './types'

/**
 * 递归过滤树形结构数据中的节点，满足条件的节点和其所有字节点和其父节点都会被保留
 * 返回的数据是对treeDataArr数组中每一项的浅拷贝，不会修改原始treeDataArr中的值
 * @category tree/filterTreeArray
 * @param treeDataArr 树形结构数据数组
 * @param filterFn 过滤函数，用于判断节点是否符合条件，函数返回布尔值
 * @param childrenFieldName 子节点的字段名，默认为 'children'
 * @returns 过滤后的节点数组
 */
export function filterTreeArray<T extends TreeNode>(
  treeDataArr: readonly T[],
  filterFn: (node: T, parentNodes: T[]) => boolean,
  childrenFieldName: keyof T = 'children'
): T[] {
  return filterTreeDataRecursive(treeDataArr, filterFn, [], childrenFieldName)
}

/**
 * 内部递归函数，实际用于过滤树形结构数据的节点
 * @param treeDataArr 树形结构数据数组
 * @param filterFn 过滤函数，用于判断节点是否符合条件，函数返回布尔值
 * @param parentNodes 父节点数组
 * @param childrenFieldName 子节点的字段名，默认为 'children'
 * @returns 过滤后的节点数组
 */
function filterTreeDataRecursive<T extends TreeNode>(
  treeDataArr: readonly T[],
  filterFn: (node: T, parentNodes: T[]) => boolean,
  parentNodes: T[] = [],
  childrenFieldName: keyof T = 'children'
): T[] {
  const filteredNodes: T[] = []
  for (const node of treeDataArr) {
    const remainingNode = { ...node }
    const currentParentNodes = [...parentNodes, node]

    if (filterFn(node, currentParentNodes)) {
      const filteredNode: T = { ...remainingNode }
      filteredNodes.push(filteredNode)
    } else {
      const children = node[childrenFieldName]
      if (Array.isArray(children) && children.length > 0) {
        const filteredChildren = filterTreeDataRecursive(children, filterFn, currentParentNodes, childrenFieldName)

        if (filteredChildren.length > 0) {
          const remainingNodeWithFilteredChildren = {
            ...remainingNode,
            [childrenFieldName]: filteredChildren
          }
          filteredNodes.push(remainingNodeWithFilteredChildren)
        }
      }
    }
  }
  return filteredNodes
}
