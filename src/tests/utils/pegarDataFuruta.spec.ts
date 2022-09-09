import { expect, test } from 'vitest'
import { pegarDataFutura } from './pegarDataFuruta'

test('aumenta a data com um ano', () => {
  const year = new Date().getFullYear()
  expect(pegarDataFutura(`${year}-08-10`).getFullYear()).toEqual(2023)
})
