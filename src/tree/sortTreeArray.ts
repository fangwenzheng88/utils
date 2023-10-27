import type { TreeNode } from './types'

/**
 * 对树形数据进行排序，并返回排序后的新数组
 * @category tree
 * @param treeData 待排序的树形数据数组
 * @param sortFunction 排序函数，用于定义排序规则
 * @param childrenFieldName 子节点字段名称，默认为 'children'
 * @returns 排序后的新树形数据数组
 */
export function sortTreeArray<T extends TreeNode>(treeData: readonly T[], sortFunction: (a: T, b: T) => number, childrenFieldName: keyof T = 'children'): T[] {
  // 创建新的数组用于保存排序后的结果
  const sortedTreeData: T[] = [...treeData]

  // 先对整个树进行排序
  sortedTreeData.sort(sortFunction)

  // 递归排序子节点
  sortedTreeData.forEach((node) => {
    const children = node[childrenFieldName]
    if (children && Array.isArray(children) && children.length > 0) {
      // @ts-ignore
      node[childrenFieldName] = sortTreeArray(children, sortFunction, childrenFieldName)
    }
  })

  return sortedTreeData
}
