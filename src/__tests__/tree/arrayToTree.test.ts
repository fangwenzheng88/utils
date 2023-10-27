import { test, expect, describe } from 'vitest'
import { arrayToTree } from '../../tree'

describe('arrayToTree', () => {
  test('数组转树形结构数据', () => {
    const array = [
      { id: 5, name: '部门5', pid: 4 },
      { id: 2, name: '部门2', pid: 1 },
      { id: 4, name: '部门4', pid: 3 },
      { id: 1, name: '部门1', pid: -1 },
      { id: 3, name: '部门3', pid: 1 },
    ]
    expect(arrayToTree(array, { key: 'id', parentKey: 'pid' })).toEqual([
      {
        id: 1,
        name: '部门1',
        pid: -1,
        children: [
          {
            id: 2,
            name: '部门2',
            pid: 1,
          },
          {
            id: 3,
            name: '部门3',
            pid: 1,
            children: [
              {
                id: 4,
                name: '部门4',
                pid: 3,
                children: [
                  {
                    id: 5,
                    name: '部门5',
                    pid: 4,
                  },
                ],
              },
            ],
          },
        ],
      },
    ])
  })

  test('自定义顶级节点条件', () => {
    const array = [
      { id: 1, name: '部门1', pid: 0 },
      { id: 2, name: '部门2', pid: 1 },
      { id: 5, name: '部门5', pid: 4 },
      { id: 4, name: '部门4', pid: 3 },
      { id: 3, name: '部门3', pid: 1 },
    ]

    const result = arrayToTree(array, { key: 'id', parentKey: 'pid', parentCondition: 0 })
    expect(result).toEqual([
      {
        id: 1,
        name: '部门1',
        pid: 0,
        children: [
          {
            id: 2,
            name: '部门2',
            pid: 1,
          },
          {
            id: 3,
            name: '部门3',
            pid: 1,
            children: [
              {
                id: 4,
                name: '部门4',
                pid: 3,
                children: [
                  {
                    id: 5,
                    name: '部门5',
                    pid: 4,
                  },
                ],
              },
            ],
          },
        ],
      },
    ])
  })
})
