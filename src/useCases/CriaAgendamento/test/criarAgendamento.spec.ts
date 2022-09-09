import { describe, expect, it } from 'vitest'
import { CriarAgendamento } from '..'
import { Agendamento } from '../../../entities/Agendamentos'
import { pegarDataFutura } from '../../../tests/utils/pegarDataFuruta'
import { AgendamentoEmMemoria } from '../../../repositories/in-memory/agendamentoEmMemoria'

describe('Criar agendamento', () => {
  it('deveria ser possivel criar um agendamento', () => {
    const inicioAg = pegarDataFutura('2022-08-10')
    const fimAg = pegarDataFutura('2022-08-11')

    const compromissosRepositorio = new AgendamentoEmMemoria()
    const criarAgendamento = new CriarAgendamento(compromissosRepositorio)

    expect(
      criarAgendamento.executa({
        cliente: 'John Doe',
        inicioAg,
        fimAg
      })
    ).resolves.toBeInstanceOf(Agendamento)
  })

  it('não deveria ser possivel criar um agendamento sobreposto', async () => {
    const inicioAg = pegarDataFutura('2022-08-10')
    const fimAg = pegarDataFutura('2022-08-15')

    const compromissosRepositorio = new AgendamentoEmMemoria()
    const criarAgendamento = new CriarAgendamento(compromissosRepositorio)

    await criarAgendamento.executa({
      cliente: 'John Doe',
      inicioAg,
      fimAg
    })

    expect(
      criarAgendamento.executa({
        cliente: 'John Doe',
        inicioAg: pegarDataFutura('2022-08-14'),
        fimAg: pegarDataFutura('2022-08-18')
      })
    ).rejects.toBeInstanceOf(Error)

    expect(
      criarAgendamento.executa({
        cliente: 'John Doe',
        inicioAg: pegarDataFutura('2022-08-08'),
        fimAg: pegarDataFutura('2022-08-12')
      })
    ).rejects.toBeInstanceOf(Error)

    expect(
      criarAgendamento.executa({
        cliente: 'John Doe',
        inicioAg: pegarDataFutura('2022-08-08'),
        fimAg: pegarDataFutura('2022-08-17')
      })
    ).rejects.toBeInstanceOf(Error)

    expect(
      criarAgendamento.executa({
        cliente: 'John Doe',
        inicioAg: pegarDataFutura('2022-08-11'),
        fimAg: pegarDataFutura('2022-08-12')
      })
    ).rejects.toBeInstanceOf(Error)
  })
})
