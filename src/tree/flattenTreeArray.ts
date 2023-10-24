import type { TreeNode } from './types'

/**
 * 扁平化树结构数组
 * @category tree/flattenTreeArray
 * @param treeData 树结构数组
 * @param childrenFieldName 子节点字段名，默认为 'children'
 * @returns 扁平化后的树结构数组
 *
 * @example
 * ```typescript
 * interface MyTreeNode {
 *   id: number;
 *   name: string;
 *   children?: MyTreeNode[];
 * }
 *
 * const treeData: MyTreeNode[] = [
 *   {
 *     id: 1,
 *     name: 'Node 1',
 *     children: [
 *       {
 *         id: 2,
 *         name: 'Node 2',
 *       },
 *       {
 *         id: 3,
 *         name: 'Node 3',
 *         children: [
 *           {
 *             id: 4,
 *             name: 'Node 4',
 *           },
 *           {
 *             id: 5,
 *             name: 'Node 5',
 *           },
 *         ],
 *       },
 *     ],
 *   },
 *   {
 *     id: 6,
 *     name: 'Node 6',
 *   },
 * ];
 *
 * const flattenedData = flattenTreeArray(treeData);
 * ```
 */
export function flattenTreeArray<T extends TreeNode>(treeData: T[], childrenFieldName: keyof T = 'children'): T[] {
  const result: T[] = []
  for (const node of treeData) {
    result.push(node)
    const children = node[childrenFieldName]
    if (Array.isArray(children)) {
      result.push(...flattenTreeArray(children, childrenFieldName))
    }
  }
  return result
}
