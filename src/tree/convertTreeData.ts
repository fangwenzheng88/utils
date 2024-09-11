import { isArray } from '../native-is'

/**
 * @category tree
 */
type ConvertedTreeData<T = Record<string, any>, P = {}> = {
  children?: ConvertedTreeData<T, P>[]
} & P

/**
 * 将树形数据转换为需要的格式
 * @category tree
 * @param treeData 原始树形数据
 * @returns 树形数据结构
 */
export function convertTreeData<T extends Record<string, any>, P extends Record<string, any>>(
  treeData: readonly T[],
  callback: (node: T, level: number) => P,
  childrenFieldName: keyof T = 'children',
  level: number = 0
): ConvertedTreeData<T, P>[] {
  if (!isArray(treeData)) {
    return []
  }

  return treeData.map((item) => {
    const initialChildren = item[childrenFieldName]
    let children: ConvertedTreeData<T, P>[] | undefined
    if (initialChildren) {
      children = convertTreeData(initialChildren, callback, childrenFieldName, level + 1)
    }

    const treeData = callback(item, level)

    return {
      ...treeData,
      children,
    }
  })
}
