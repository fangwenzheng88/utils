// tree.test.ts

import { test, expect, describe, vi } from 'vitest'
import { treeArrayToMap } from '../../tree'

export type TestTreeNode = {
  id: string
  children?: TestTreeNode[]
}

const treeData: TestTreeNode[] = [
  {
    id: '1',
    children: [
      {
        id: '1-1',
        children: [{ id: '1-1-1' }, { id: '1-1-2' }],
      },
      { id: '1-2' },
    ],
  },
  {
    id: '2',
    children: [{ id: '2-1' }],
  },
]

describe('treeArrayToMap', () => {
  test('should convert tree array to map correctly', () => {
    const treeMap = treeArrayToMap(treeData, 'id', 'children')

    expect(treeMap.size).toBe(7)

    // 验证根节点是否存在
    expect(treeMap.get('1')).toEqual(treeData[0])
    expect(treeMap.get('2')).toEqual(treeData[1])

    // 验证子节点是否存在
    expect(treeMap.get('1-1')).toEqual(treeData[0].children![0])
    expect(treeMap.get('1-2')).toEqual(treeData[0].children![1])
    expect(treeMap.get('1-1-1')).toEqual(treeData[0].children![0].children![0])
    expect(treeMap.get('1-1-2')).toEqual(treeData[0].children![0].children![1])
    expect(treeMap.get('2-1')).toEqual(treeData[1].children![0])
  })

  test('should handle duplicate keys correctly', () => {
    const consoleWarnSpy = vi.spyOn(console, 'warn')

    const duplicateTreeData: TestTreeNode[] = [
      { id: 'duplicate', children: [] },
      { id: 'duplicate', children: [] },
    ]
    const treeMap = treeArrayToMap(duplicateTreeData, 'id', 'children')

    expect(treeMap.size).toBe(1)
    expect(treeMap.get('duplicate')).toEqual(duplicateTreeData[0]) // 可能获取到任何一个重复键对应的节点
    expect(consoleWarnSpy).toHaveBeenCalledTimes(1)
    expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringContaining('Duplicate key found: duplicate'))
  })

  test('非数组参数', () => {
    expect(
      // @ts-expect-error
      treeArrayToMap(null)
    ).toEqual(new Map())
  })
})
