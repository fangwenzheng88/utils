import { test, expect, describe } from 'vitest'
import { flattenTreeArray } from '../../tree'

const treeDataArr = [
  {
    key: '1',
    children: [
      {
        key: '1-1'
      },
      {
        key: '1-2',
        children: [
          {
            key: '1-2-1',
            test: 123
          },
          {
            key: '1-2-2'
          }
        ]
      }
    ]
  },
  {
    key: '2',
    children: [
      {
        key: '2-1',
        children: [
          {
            key: '2-1-1'
          }
        ]
      }
    ]
  }
]

describe('flattenTreeArray', () => {
  test('treeArray 数据扁平化', () => {
    const result = flattenTreeArray(treeDataArr)
    expect(result).toMatchSnapshot()
  })
})
