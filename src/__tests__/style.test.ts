import { test, expect, describe } from 'vitest'
import { addStyleUnit } from '../dom/style'

describe('style', () => {
  test('addStyleUnit', () => {
    expect(addStyleUnit(undefined)).eq('')
    expect(addStyleUnit(null)).eq('')
    expect(addStyleUnit('')).eq('')
    expect(addStyleUnit(0)).eq('0px')
    expect(addStyleUnit(10)).eq('10px')
    expect(addStyleUnit('10')).eq('10px')
    expect(addStyleUnit('10px')).eq('10px')
    expect(addStyleUnit('10%')).eq('10%')
  })
})
