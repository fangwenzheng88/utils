import { test, expect, describe } from 'vitest'
import { sortTreeArray } from '../../tree'

export type TreeNode = {
  id: number
  name: string
  children?: TreeNode[]
}

const treeDataArr: TreeNode[] = [
  {
    id: 1,
    name: 'Node 1',
    children: [
      {
        id: 2,
        name: 'Node 1.2'
      },
      {
        id: 1,
        name: 'Node 1.1'
      }
    ]
  },
  {
    id: 2,
    name: 'Node 2',
    children: [
      {
        id: 4,
        name: 'Node 2.2'
      },
      {
        id: 3,
        name: 'Node 2.1'
      }
    ]
  }
]
describe('sortTreeArray', () => {
  test('验证排序是否有效', () => {
    const result = sortTreeArray(treeDataArr, (a, b) => {
      return a.id - b.id // 按 id 升序排序
    })
    expect(result).toEqual([
      {
        id: 1,
        name: 'Node 1',
        children: [
          {
            id: 1,
            name: 'Node 1.1'
          },
          {
            id: 2,
            name: 'Node 1.2'
          }
        ]
      },
      {
        id: 2,
        name: 'Node 2',
        children: [
          {
            id: 3,
            name: 'Node 2.1'
          },
          {
            id: 4,
            name: 'Node 2.2'
          }
        ]
      }
    ])
  })

  test('排序前后数组不变', () => {
    const originalArr = [...treeDataArr]
    sortTreeArray(treeDataArr, (a, b) => {
      return a.id - b.id // 按 id 升序排序
    })
    expect(treeDataArr).toEqual(originalArr)
  })

  test('空数组返回空数组', () => {
    const result = sortTreeArray([] as Record<string, any>[], (a, b) => {
      return a.id - b.id // 按 id 升序排序
    })
    expect(result).toEqual([])
  })

  test('只有根节点的情况', () => {
    const singleNodeArr = [
      {
        id: 1,
        name: 'Node 1'
      }
    ]
    const result = sortTreeArray(singleNodeArr, (a, b) => {
      return a.id - b.id // 按 id 升序排序
    })
    expect(result).toEqual([
      {
        id: 1,
        name: 'Node 1'
      }
    ])
  })

  test('没有子节点的情况', () => {
    const noChildrenArr = [
      {
        id: 2,
        name: 'Node 2'
      },
      {
        id: 1,
        name: 'Node 1'
      }
    ]
    const result = sortTreeArray(noChildrenArr, (a, b) => {
      return a.id - b.id // 按 id 升序排序
    })
    expect(result).toEqual([
      {
        id: 1,
        name: 'Node 1'
      },
      {
        id: 2,
        name: 'Node 2'
      }
    ])
  })
})
