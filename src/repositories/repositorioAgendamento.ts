import { Agendamento } from '../entities/Agendamentos'

export interface RepositorioAgendamento{
  create(agendamento: Agendamento): Promise<void>
  encontrarSobreposicaoAgendamento(inicioAg: Date, fimAg: Date): Promise<Agendamento | null>
}
