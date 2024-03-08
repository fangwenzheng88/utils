import { traverseTreeDFS } from './traverse'
import type { TreeNode } from './types'

/**
 * 转换treeArray数据为treeMap
 * @category tree
 * @param data 树形数据
 * @param keyFieldName 子节点id字段名
 * @param childrenFieldName 子节点children字段名
 */
export function treeArrayToMap<T extends TreeNode>(
  data: T[],
  keyFieldName: keyof T = 'key',
  childrenFieldName: keyof T = 'children'
): Map<string | number | symbol, T> {
  const map = new Map<string | number | symbol, T>()
  traverseTreeDFS(
    data,
    (node) => {
      const key = node[keyFieldName]
      if (typeof key !== 'string' && typeof key !== 'number' && typeof key !== 'symbol') {
        throw new Error(`Invalid key type for field ${String(keyFieldName)}`)
      }
      if (map.has(key)) {
        console.warn(`Duplicate key found: ${String(key)}`)
      }
      map.set(key, node)
    },
    childrenFieldName
  )
  return map
}
