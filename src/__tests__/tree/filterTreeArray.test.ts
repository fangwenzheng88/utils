import { test, expect, describe } from 'vitest'
import { filterTreeArray, filterTreeArray2, filterTreeArray3 } from '../../tree'

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

describe('filterTreeArray', () => {
  test('过滤子节点，满足条件的节点以及其父节点都会被保留', () => {
    const result = filterTreeArray(treeDataArr, (node) => {
      return node.key === '1-2-1'
    })
    expect(result).toEqual([
      {
        key: '1',
        children: [
          {
            key: '1-2',
            children: [
              {
                key: '1-2-1',
              },
            ],
          },
        ],
      },
    ])
  })

  test('过滤父节点，满足条件的父节点和所有子节点都被保留', () => {
    const result = filterTreeArray(treeDataArr, (node) => {
      return node.key === '1'
    })
    expect(result).toEqual([
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
    ])
  })

  test('所有都不满足，返回空数组', () => {
    const result = filterTreeArray(treeDataArr, () => {
      return false
    })
    expect(result).toEqual([])
  })

  test('非数组参数', () => {
    expect(
      // @ts-expect-error
      filterTreeArray3(null, () => {
        return true
      })
    ).toEqual([])
  })
})

describe('filterTreeArray2', () => {
  test('子节点满足，父节点将会被保留', () => {
    const result = filterTreeArray2(treeDataArr, (node) => {
      return node.key === '1-2-1'
    })
    expect(result).toEqual([
      {
        key: '1',
        children: [
          {
            key: '1-2',
            children: [
              {
                key: '1-2-1',
              },
            ],
          },
        ],
      },
    ])
  })

  test('父节点满足，子节点不满足将会被过滤掉', () => {
    const result = filterTreeArray2(treeDataArr, (node) => {
      return node.key === '1'
    })
    expect(result).toEqual([
      {
        key: '1',
        children: [],
      },
    ])
  })

  test('保留满足条件的节点和其父节点', () => {
    const result = filterTreeArray2(treeDataArr, (node) => {
      return ['1', '2-1-1'].includes(node.key)
    })
    expect(result).toEqual([
      {
        key: '1',
        children: [],
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
    ])
  })

  test('所有都不满足，返回空数组', () => {
    const result = filterTreeArray2(treeDataArr, () => {
      return false
    })
    expect(result).toEqual([])
  })

  test('非数组参数', () => {
    expect(
      // @ts-expect-error
      filterTreeArray3(null, () => {
        return true
      })
    ).toEqual([])
  })
})

describe('filterTreeArray3', () => {
  test('子节点满足，父节点不满足，不保留', () => {
    const result = filterTreeArray3(treeDataArr, (node) => {
      return node.key === '1-2-1'
    })
    expect(result).toEqual([])
  })

  test('父节点满足，子节点不满足被过滤掉', () => {
    const result = filterTreeArray3(treeDataArr, (node) => {
      return node.key === '1'
    })
    expect(result).toEqual([
      {
        key: '1',
        children: [],
      },
    ])
  })

  test('孙节点满足，父节点不满足不保留', () => {
    const result = filterTreeArray3(treeDataArr, (node) => {
      return ['2', '2-1-1'].includes(node.key)
    })
    expect(result).toEqual([
      {
        key: '2',
        children: [],
      },
    ])
  })

  test('所有都不满足，返回空数组', () => {
    const result = filterTreeArray3(treeDataArr, () => {
      return false
    })
    expect(result).toEqual([])
  })

  test('非数组参数', () => {
    expect(
      // @ts-expect-error
      filterTreeArray3(null, () => {
        return true
      })
    ).toEqual([])
  })
})
