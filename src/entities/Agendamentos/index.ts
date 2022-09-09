interface AgendamentoProps{
  cliente: string
  inicioAg: Date
  fimAg: Date
}

export class Agendamento {
  private props: AgendamentoProps

  get cliente () {
    return this.props.cliente
  }

  get inicioAg () {
    return this.props.inicioAg
  }

  get fimAg () {
    return this.props.fimAg
  }

  constructor (props: AgendamentoProps) {
    const { inicioAg, fimAg } = props

    if (inicioAg <= new Date()) {
      throw new Error('data inicial menor ou  igual a data atual')
    }

    if (fimAg <= inicioAg) {
      throw new Error('data final menor ou  igual a data inicio')
    }

    this.props = props
  }
}
