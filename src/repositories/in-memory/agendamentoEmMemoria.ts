import { areIntervalsOverlapping } from 'date-fns'
import { Agendamento } from '../../entities/Agendamentos'
import { RepositorioAgendamento } from '../repositorioAgendamento'

export class AgendamentoEmMemoria implements RepositorioAgendamento {
  public items: Agendamento[] = []

  async create (agendamento: Agendamento): Promise<void> {
    this.items.push(agendamento)
  }

  async encontrarSobreposicaoAgendamento (inicioAg: Date, fimAg: Date): Promise<Agendamento | null> {
    const SobreposicaoAgendament = this.items.find(Agendamento => {
      return areIntervalsOverlapping(
        { start: inicioAg, end: fimAg },
        { start: Agendamento.inicioAg, end: Agendamento.fimAg },
        { inclusive: true }
      )
    })

    if (!SobreposicaoAgendament) {
      return null
    }
    return SobreposicaoAgendament
  }
}
