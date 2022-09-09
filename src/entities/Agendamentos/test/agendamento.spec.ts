import { expect, test } from 'vitest'
import { Agendamento } from '..'
import { pegarDataFutura } from '../../../tests/utils/pegarDataFuruta'

test('criar agendamento', () => {
  const inicioAg = pegarDataFutura('2022-08-10')
  const fimAg = pegarDataFutura('2022-08-11')

  const agendamento = new Agendamento({
    cliente: 'John Doe',
    inicioAg,
    fimAg
  })

  expect(agendamento).toBeInstanceOf(Agendamento)
  expect(agendamento.cliente).toBe('John Doe')
})

test('não pode criar agendamento com data de término antes da data de início', () => {
  const fimAg = pegarDataFutura('2022-08-09')
  const inicioAg = pegarDataFutura('2022-08-10')

  expect(() => {
    return new Agendamento({
      cliente: 'John Doe',
      inicioAg,
      fimAg
    })
  }).toThrow()
})

test('não pode criar agendamento com data de inicio menor que a data atual', () => {
  const inicioAg = new Date()
  const fimAg = new Date()

  inicioAg.setDate(inicioAg.getDate() - 1)

  expect(() => {
    return new Agendamento({
      cliente: 'John Doe',
      inicioAg,
      fimAg
    })
  }).toThrow()
})
