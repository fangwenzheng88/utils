import type { TreeNode } from './types'

/**
 * 递归地对树状数组进行排序
 *
 * 此方法不会修改原始数组，会返回数组每一项的浅拷贝
 * 此函数接收一个树状数组、一个用于比较节点的排序函数以及一个可选的子节点字段名
 * 它首先对整个树进行排序，然后递归地对每个节点的子节点进行排序
 *
 * @category tree
 * @param treeData 树状数组，只读
 * @param sortFunction 用于比较两个节点并返回排序结果的函数
 * @param childrenFieldName 子节点字段的名称，默认为'children'
 * @returns 排序后的树状数组
 */
export function sortTreeArray<T extends TreeNode>(treeData: readonly T[], sortFunction: (a: T, b: T) => number, childrenFieldName: keyof T = 'children'): T[] {
  // 递归排序子节点
  const sortedTreeData = treeData
    .map((node) => {
      const children = node[childrenFieldName]
      if (children && Array.isArray(children) && children.length > 0) {
        return {
          ...node,
          [childrenFieldName]: sortTreeArray(children, sortFunction, childrenFieldName),
        }
      }
      return { ...node }
    })
    .sort(sortFunction)

  return sortedTreeData
}
