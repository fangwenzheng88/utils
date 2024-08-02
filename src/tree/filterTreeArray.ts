import type { TreeNode } from './types'

/**
 * 递归过滤树形结构数据
 * - 返回的数据是对treeDataArr数组中每一项的浅拷贝，不会修改原始treeDataArr中的值
 * - node满足条件，子节点将不会被过滤，所有子节点将会保留
 * - 子节点满足条件，父节点将会被保持留（维持树形结构）
 *
 * @category tree
 * @param treeDataArr 树形结构数据数组
 * @param filterFn 过滤函数，用于判断节点是否符合条件，函数返回布尔值
 * @param childrenFieldName 子节点的字段名，默认为 'children'
 * @returns 过滤后的节点数组
 *
 * @example
 * ```ts
 * const treeDataArr = [
 *   {key: '1',children: [{key: '1-1'},{key: '1-2',children: [{key: '1-2-1',},{key: '1-2-2'}]}]},
 *   {key: '2',children: [{key: '2-1',children: [{key: '2-1-1'}]}]}
 * ]
 *
 * filterTreeArray(treeDataArr, (node) => {
 *   return node.key === '1-2-1'
 * })
 *
 * 输出：
 * [{key: '1',children: [{key: '1-2',children: [{key: '1-2-1'}]}]}]
 * ```
 */
export function filterTreeArray<T extends TreeNode>(treeDataArr: readonly T[], filterFn: (node: T) => boolean, childrenFieldName: keyof T = 'children'): T[] {
  const filteredNodes: T[] = []
  for (const node of treeDataArr) {
    const remainingNode = { ...node }

    if (filterFn(node)) {
      const filteredNode: T = { ...remainingNode }
      filteredNodes.push(filteredNode)
    } else {
      const children = node[childrenFieldName]
      if (Array.isArray(children) && children.length > 0) {
        const filteredChildren = filterTreeArray(children, filterFn, childrenFieldName)

        if (filteredChildren.length > 0) {
          const remainingNodeWithFilteredChildren = {
            ...remainingNode,
            [childrenFieldName]: filteredChildren,
          }
          filteredNodes.push(remainingNodeWithFilteredChildren)
        }
      }
    }
  }
  return filteredNodes
}
