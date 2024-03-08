import { test, expect, describe } from 'vitest'
import { filterTreeWithoutEmptyChildren } from '../../tree'

describe('filterTreeWithoutEmptyChildren', () => {
  test('过滤children:[]的节点', () => {
    expect(
      filterTreeWithoutEmptyChildren([
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
          children: [],
        },
      ])
    ).toEqual([
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

    expect(
      filterTreeWithoutEmptyChildren([
        {
          key: '1',
          children: [
            {
              key: '1-1',
            },
            {
              key: '1-2',
              children: [],
            },
          ],
        },
        {
          key: '2',
          children: [],
        },
      ])
    ).toEqual([
      {
        key: '1',
        children: [
          {
            key: '1-1',
          },
        ],
      },
    ])

    expect(
      filterTreeWithoutEmptyChildren([
        {
          key: '1',
          children: [
            {
              key: '1-1',
              children: [],
            },
            {
              key: '1-2',
              children: [],
            },
          ],
        },
        {
          key: '2',
          children: [],
        },
      ])
    ).toEqual([])

    expect(
      filterTreeWithoutEmptyChildren([
        {
          key: '1',
          children: [
            {
              key: '1-1',
              children: [
                {
                  key: '1-1-1',
                  children: [],
                },
              ],
            },
            {
              key: '1-2',
              children: [],
            },
          ],
        },
        {
          key: '2',
          children: [],
        },
      ])
    ).toEqual([])
  })
})
