import { test, expect, describe, assertType } from 'vitest'
import { convertToStandardTreeData } from '../../tree'

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

describe('convertToStandardTreeData', () => {
  test('转换非标准treeData为标准格式', () => {
    const result = convertToStandardTreeData(treeDataArr, {
      key: 'id',
      title: 'name',
      children: 'childrenNodes',
    })
    expect(result).toMatchSnapshot()
  })

  test('添加自定义字段', () => {
    const result = convertToStandardTreeData(treeDataArr, {
      key: 'id',
      title: 'name',
      children: 'childrenNodes',
      extra(node) {
        return { isLeaf: !Array.isArray(node.childrenNodes) }
      },
    })
    expect(result).toMatchSnapshot()
  })

  test('转换后类型测试', () => {
    const result = convertToStandardTreeData(treeDataArr, {
      key: 'id',
      title: 'name',
      children: 'childrenNodes',
      extra(node) {
        return { isLeaf: !Array.isArray(node.childrenNodes), number: 1 as const }
      },
    })

    assertType<TreeData['id']>(result[0].key)
    assertType<TreeData['name']>(result[0].title)
    assertType<boolean>(result[0].isLeaf)
    assertType<TreeData>(result[0].data)
    assertType<1>(result[0].number)
  })
})
