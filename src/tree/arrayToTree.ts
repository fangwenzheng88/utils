import { isArray, isFunction } from '../is'
import { TreeNode } from './types'

interface TreeConfig<T extends Record<string, any>> {
  key?: string
  parentKey?: string
  parentCondition?: string | null | undefined | number | ((data: T) => boolean)
}

const defaultTreeConfig: Required<TreeConfig<Record<string, any>>> = {
  key: 'key',
  parentKey: 'parentKey',
  parentCondition: -1,
}

/**
 * @category tree
 * @param array
 * @param treeConfig
 * @returns
 */
export function arrayToTree<T extends Record<string, any>>(array: T[], treeConfig?: TreeConfig<T>): TreeNode[] {
  if (!isArray(array)) {
    return []
  }

  const config = { ...defaultTreeConfig, ...treeConfig }
  const result: TreeNode[] = []
  const itemMap: Record<string, TreeNode> = {}

  for (const item of array) {
    const itemId = item[config.key]
    const parentItemId = item[config.parentKey]

    if (itemMap[itemId]) {
      itemMap[itemId] = {
        ...item,
        children: itemMap[itemId].children,
      }
    } else {
      itemMap[itemId] = {
        ...item,
      }
    }

    const treeItem = itemMap[itemId]

    const { parentCondition } = config
    if (isFunction(parentCondition) ? parentCondition(item) : parentCondition === parentItemId) {
      result.push(treeItem)
    } else {
      const children = itemMap[parentItemId]?.children ?? []
      children.push(treeItem)
      if (!itemMap[parentItemId]) {
        itemMap[parentItemId] = { children }
      } else {
        itemMap[parentItemId].children = children
      }
    }
  }

  return result
}
