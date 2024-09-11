import { isArray } from '../native-is'
import type { TreeNode } from './types'

/**
 * 递归过滤树形结构数据
 *
 * - 节点满足条件，子节点将不会被过滤，所有后代节点将会保留
 * - 子节点满足条件，父节点将会被保持留（维持树形结构）
 * - 返回的数据是对treeDataArr数组中每一项的浅拷贝，不会修改原始treeDataArr中的值
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
  if (!isArray(treeDataArr)) {
    return []
  }
  const filteredNodes: T[] = []
  for (const node of treeDataArr) {
    if (filterFn(node)) {
      const filteredNode: T = { ...node }
      filteredNodes.push(filteredNode)
    } else {
      const children = node[childrenFieldName]
      if (Array.isArray(children) && children.length > 0) {
        const filteredChildren = filterTreeArray(children, filterFn, childrenFieldName)

        if (filteredChildren.length > 0) {
          filteredNodes.push({
            ...node,
            [childrenFieldName]: filteredChildren,
          })
        }
      }
    }
  }
  return filteredNodes
}

/**
 * 过滤树形数据数组中的节点
 *
 * - 父节点满足条件，将继续过滤子节点
 * - 子节点满足条件，父节点将会被保持留（维持树形结构）
 * - 返回的数据是对treeDataArr数组中每一项的浅拷贝，不会修改原始treeDataArr中的值
 *
 * @param treeDataArr 树形数据数组，包含多个树节点
 * @param filterFn 过滤函数，用于判断节点是否符合条件，返回布尔值
 * @param childrenFieldName 子节点数组的字段名，默认为 'children'
 * @returns 返回一个新的，被过滤后的树形结构数组
 *
 * @example
 * ```ts
 * const treeDataArr = [
 *   {key: '1',children: [{key: '1-1'},{key: '1-2',children: [{key: '1-2-1',},{key: '1-2-2'}]}]},
 *   {key: '2',children: [{key: '2-1',children: [{key: '2-1-1'}]}]}
 * ]
 *
 * filterTreeArray(treeDataArr, (node) => {
 *   return node.key === '1-2'
 * })
 *
 * 输出：
 * [{key: '1',children: [{key: '1-2',children: []}]}]
 * ```
 */
export function filterTreeArray2<T extends TreeNode>(treeDataArr: readonly T[], filterFn: (node: T) => boolean, childrenFieldName: keyof T = 'children'): T[] {
  if (!isArray(treeDataArr)) {
    return []
  }
  const filteredNodes: T[] = []
  for (const node of treeDataArr) {
    const filteredNode: T = { ...node }
    const children = node[childrenFieldName]
    let filteredChildren: T[] = []
    if (Array.isArray(children) && children.length > 0) {
      filteredChildren = filterTreeArray2(children, filterFn, childrenFieldName)
      // @ts-ignore
      filteredNode[childrenFieldName] = filteredChildren
    }
    if (filteredChildren.length > 0 || filterFn(node)) {
      filteredNodes.push(filteredNode)
    }
  }
  return filteredNodes
}

/**
 * 过滤树形数据数组中的节点
 *
 * - 父节点和子节点都必须满足条件
 * - 返回的数据是对treeDataArr数组中每一项的浅拷贝，不会修改原始treeDataArr中的值
 *
 * @param treeDataArr 树形数据数组，包含多个树节点
 * @param filterFn 过滤函数，用于判断节点是否符合条件，返回布尔值
 * @param childrenFieldName 子节点数组的字段名，默认为'children'
 * @returns 返回一个新的，被过滤后的树形结构数组
 *
 * @example
 * ```ts
 * const treeDataArr = [
 *   {key: '1',children: [{key: '1-1'},{key: '1-2',children: [{key: '1-2-1',},{key: '1-2-2'}]}]},
 *   {key: '2',children: [{key: '2-1',children: [{key: '2-1-1'}]}]}
 * ]
 *
 * filterTreeArray(treeDataArr, (node) => {
 *   return node.key === '1-2'
 * })
 *
 * 输出：
 * []
 * ```
 */
export function filterTreeArray3<T extends TreeNode>(treeDataArr: readonly T[], filterFn: (node: T) => boolean, childrenFieldName: keyof T = 'children'): T[] {
  if (!isArray(treeDataArr)) {
    return []
  }
  const filteredNodes: T[] = []
  for (const node of treeDataArr) {
    if (filterFn(node)) {
      const filteredNode = { ...node }
      const children = node[childrenFieldName]
      if (Array.isArray(children) && children.length > 0) {
        const filteredChildren = filterTreeArray3(children, filterFn, childrenFieldName)
        // @ts-ignore
        filteredNode[childrenFieldName] = filteredChildren
      }

      filteredNodes.push(filteredNode)
    }
  }
  return filteredNodes
}
