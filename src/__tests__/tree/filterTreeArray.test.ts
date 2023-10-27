import { test, expect, describe } from 'vitest'
import { filterTreeArray } from '../../tree'

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
})
