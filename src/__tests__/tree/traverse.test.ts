import { test, expect, describe } from 'vitest'
import { traverseTreeBFS, traverseTreeDFS, traverseTreeDFSCallbackAfter } from '../../tree'

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

describe('traverseTreeBFS', () => {
  test('广度优先', () => {
    const result: string[] = []
    traverseTreeBFS(treeDataArr, (node, [parentNode]) => {
      result.push(node.key)
      console.log(node)
      console.log(parentNode)
      console.log('--------------------------')
    })
    expect(result).toEqual(['1', '2', '1-1', '1-2', '2-1', '1-2-1', '1-2-2', '2-1-1'])
  })

  test('广度优先,自定义children字段', () => {
    const result: string[] = []
    traverseTreeBFS(
      [
        {
          key: '2',
          childrens: [
            {
              key: '2-1',
              childrens: [
                {
                  key: '2-1-1',
                },
              ],
            },
          ],
        },
      ],
      (node) => {
        result.push(node.key)
      },
      'childrens'
    )
    expect(result).toEqual(['2', '2-1', '2-1-1'])
  })
})

describe('traverseTreeDFS', () => {
  test('深度优先，callback在子节点遍历前执行', () => {
    const result: string[] = []
    traverseTreeDFS(treeDataArr, (node, [parentNode]) => {
      result.push(node.key)
      console.log(node)
      console.log(parentNode)
      console.log('--------------------------')
    })
    expect(result).toEqual(['1', '1-1', '1-2', '1-2-1', '1-2-2', '2', '2-1', '2-1-1'])
  })

  test('深度优先，callback在子节点遍历后执行', () => {
    const result: string[] = []
    traverseTreeDFSCallbackAfter(treeDataArr, (node) => {
      result.push(node.key)
    })
    expect(result).toEqual(['1-1', '1-2-1', '1-2-2', '1-2', '1', '2-1-1', '2-1', '2'])
  })

  test('深度优先,自定义children字段', () => {
    const result: string[] = []
    traverseTreeDFS(
      [
        {
          key: '2',
          childrens: [
            {
              key: '2-1',
              childrens: [
                {
                  key: '2-1-1',
                },
              ],
            },
          ],
        },
      ],
      (node) => {
        result.push(node.key)
      },
      'childrens'
    )
    expect(result).toEqual(['2', '2-1', '2-1-1'])
  })
})

describe('traverseTreeDFSCallbackAfter', () => {
  test('深度优先，callback在子节点遍历后执行', () => {
    const result: string[] = []
    traverseTreeDFSCallbackAfter(treeDataArr, (node) => {
      result.push(node.key)
    })
    expect(result).toEqual(['1-1', '1-2-1', '1-2-2', '1-2', '1', '2-1-1', '2-1', '2'])
  })
})
