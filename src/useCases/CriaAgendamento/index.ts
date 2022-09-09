import { Agendamento } from '../../entities/Agendamentos'
import { RepositorioAgendamento } from '../../repositories/repositorioAgendamento'

interface RequisitarCriarAgendamento {
  cliente: string;
  inicioAg: Date;
  fimAg: Date;
}
type RespostaCriarAgendamento = Agendamento;

export class CriarAgendamento {
  constructor (
    private repositorioAgendamento: RepositorioAgendamento
  ) {}

  async executa ({
    cliente,
    inicioAg,
    fimAg
  }: RequisitarCriarAgendamento): Promise<RespostaCriarAgendamento> {
    const sobreposicaoAgendamento = await this.repositorioAgendamento.encontrarSobreposicaoAgendamento(
      inicioAg,
      fimAg
    )

    if (sobreposicaoAgendamento) {
      throw new Error('Outro Agendamento sobreposto em data agendada')
    }

    const agendamento = new Agendamento({
      cliente,
      inicioAg,
      fimAg
    })

    await this.repositorioAgendamento.create(agendamento)

    return agendamento
  }
}
