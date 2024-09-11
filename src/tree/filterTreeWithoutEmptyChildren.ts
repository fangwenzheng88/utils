import { isArray } from '../native-is'
import type { TreeNode } from './types'

/**
 * 过滤掉树状数据结构中没有子节点的节点
 *
 * 此函数接收一个树状数据结构的数组和一个可选的子节点字段名称作为参数
 * 它会遍历数组中的每个节点，如果节点有子节点（且子节点非空），则将该节点及其过滤后的子节点数组一起加入到结果数组中
 * 如果节点没有子节点，则直接将该节点加入到结果数组中
 *
 * @category tree
 * @param treeDataArr 树状数据结构的数组
 * @param childrenFieldName 子节点字段名称，默认为'children'
 * @returns 过滤后的树状数据结构数组
 *
 * @example
 * ```ts
 * filterTreeWithoutEmptyChildren(
 * [
 *   {
 *     key: '1',
 *     children: [
 *       {
 *         key: '1-1',
 *       },
 *       {
 *         key: '1-2',
 *         children: [],
 *       },
 *     ],
 *   },
 *   {
 *     key: '2',
 *     children: [],
 *   },
 * ]
 * )
 *
 * 输出：
 * [
 *   {
 *     key: '1',
 *     children: [
 *       {
 *         key: '1-1',
 *       },
 *     ],
 *   }
 * ]
 * ```
 */
export function filterTreeWithoutEmptyChildren<T extends TreeNode>(treeDataArr: T[], childrenFieldName: keyof T = 'children'): T[] {
  if (!isArray(treeDataArr)) {
    return []
  }
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
