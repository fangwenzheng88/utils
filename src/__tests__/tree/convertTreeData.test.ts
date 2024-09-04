import { test, expect, describe, assertType } from 'vitest'
import { convertTreeData } from '../../tree'

interface TreeData {
  id: string
  name: string
  childrenNodes?: TreeData[]
}

const treeDataArr: TreeData[] = [
  {
    id: '1',
    name: 'Node 1',
    childrenNodes: [
      {
        id: '2',
        name: 'Node 1.1',
        childrenNodes: [],
      },
      {
        id: '3',
        name: 'Node 1.2',
        childrenNodes: [
          { id: '4', name: 'Node 1.2.1' },
          { id: '5', name: 'Node 1.2.2' },
        ],
      },
    ],
  },
  {
    id: '6',
    name: 'Node 2',
    childrenNodes: [],
  },
]

describe('convertTreeData', () => {
  test('转换非标准treeData为标准格式', () => {
    const result = convertTreeData(treeDataArr, (node, level) => {
      return {
        key: node.id,
        label: node.name,
        level,
      }
    })
    expect(result).toMatchSnapshot()
  })

  test('转换非标准treeData为标准格式', () => {
    const result = convertTreeData(
      treeDataArr,
      (node, level) => {
        return {
          key: node.id,
          label: node.name,
          level,
        }
      },
      'childrenNodes'
    )
    expect(result).toMatchSnapshot()
  })

  test('转换后类型测试', () => {
    const result = convertTreeData(treeDataArr, (node, level) => {
      return {
        key: node.id,
        label: node.name,
        level,
      }
    })

    assertType<TreeData['id']>(result[0].key)
    assertType<TreeData['name']>(result[0].label)
  })
})
