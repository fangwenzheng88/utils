export interface TreeDataStandardConfig<T = Record<string, any>, P = {}> {
  key?: string
  parentKey?: string
  title?: string
  children?: string
  /**
   *
   * @param node
   * @param level
   * @returns
   */
  extra?: (node: T, level: number) => P
}

export type TreeDataStandard<T = Record<string, any>, P = {}> = {
  key: string
  title: string
  parentKey?: string
  data: T
  children?: TreeDataStandard<T, P>[]
  level: number
} & P

/**
 * 将树形数据转换为标准的树形数据结构
 * @category tree/convertToStandardTreeData
 * @param treeData 原始树形数据
 * @param config 转换配置
 * @returns 标准的树形数据结构
 */
export function convertToStandardTreeData<T extends Record<string, any>, P extends Record<string, any> = {}>(
  treeData: readonly T[],
  config?: TreeDataStandardConfig<T, P>
): TreeDataStandard<T, P>[] {
  return convert(treeData, config)
}

function convert<T extends Record<string, any>, P extends Record<string, any> = {}>(
  treeData: readonly T[],
  config?: TreeDataStandardConfig<T, P>,
  parentKey: string | undefined = undefined,
  level: number = 0
): TreeDataStandard<T, P>[] {
  const defaultConfig: Required<TreeDataStandardConfig<T, P>> = {
    key: 'key',
    parentKey: 'parentKey',
    title: 'title',
    children: 'children',
    extra() {
      return {} as P
    }
  }
  const treeDataConfig: Required<TreeDataStandardConfig<T, P>> = { ...defaultConfig, ...config }

  return treeData.map((item) => {
    const key = item[treeDataConfig.key]
    const title = item[treeDataConfig.title]
    const data = item
    const initialChildren = item[treeDataConfig.children]
    let children: TreeDataStandard<T, P>[] | undefined
    if (initialChildren) {
      children = convert(initialChildren, treeDataConfig, key, level + 1)
    }
    const extraData = treeDataConfig.extra(item, level)

    return {
      key,
      parentKey,
      title,
      data,
      children,
      level,
      ...extraData
    }
  })
}
