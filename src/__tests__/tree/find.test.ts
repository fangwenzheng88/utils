import { test, expect, describe } from 'vitest'
import { findTreeNode, findTreeNodes, findTreeParents, findTreeParent } from '../../tree'

const treeDataArr = [
  {
    key: '1',
    children: [
      {
        key: '1-1',
      },
      {
        key: '1-2',
        children: [
          {
            key: '1-2-1',
          },
          {
            key: '1-2-2',
          },
        ],
      },
    ],
  },
  {
    key: '2',
    children: [
      {
        key: '2-1',
        children: [
          {
            key: '2-1-1',
          },
        ],
      },
    ],
  },
]

describe('findTreeNode', () => {
  test('查找节点，返回找到的第一项', () => {
    const result = findTreeNode(treeDataArr, (node) => {
      return node.key === '1-2-1'
    })
    expect(result).toEqual({
      key: '1-2-1',
    })
  })

  test('找子节点，不存在返回undefined', () => {
    const result = findTreeNode(treeDataArr, () => {
      return false
    })
    expect(result).toBe(undefined)
  })

  test('非数组参数', () => {
    expect(
      // @ts-expect-error
      findTreeNode(null, () => {
        return true
      })
    ).toEqual(undefined)
  })
})

describe('findTreeNodes', () => {
  test('查找节点', () => {
    const result = findTreeNodes(treeDataArr, (node) => {
      return node.key === '1-2-1'
    })
    expect(result).toEqual([
      {
        key: '1-2-1',
      },
    ])
  })

  test('查找节点，不存在返回空数组', () => {
    const result = findTreeNodes(treeDataArr, () => {
      return false
    })
    expect(result).toEqual([])
  })

  test('非数组参数', () => {
    expect(
      // @ts-expect-error
      findTreeNodes(null, () => {
        return true
      })
    ).toEqual([])
  })
})

describe('findTreeParents', () => {
  test('找父节点及祖先节点', () => {
    const result = findTreeParents(treeDataArr, (node) => {
      return node.key === '1-2-1'
    })
    expect(result.map((item) => item.key)).toEqual(['1', '1-2'])
  })

  test('找父节点及祖先节点，找不到返回空数组', () => {
    const result = findTreeParents(treeDataArr, () => {
      return false
    })
    expect(result).toEqual([])
  })
})

describe('findTreeParent', () => {
  test('找父节点', () => {
    const result = findTreeParent(treeDataArr, (node) => {
      return node.key === '1-2-1'
    })
    expect(result).toEqual({
      key: '1-2',
      children: [
        {
          key: '1-2-1',
        },
        {
          key: '1-2-2',
        },
      ],
    })
  })

  test('找子父节点，找不到返回undefined', () => {
    const result = findTreeParent(treeDataArr, () => {
      return false
    })
    expect(result).toBe(undefined)
  })

  test('非数组参数', () => {
    expect(
      // @ts-expect-error
      findTreeParent(null, () => {
        return true
      })
    ).toEqual(undefined)
  })
})
