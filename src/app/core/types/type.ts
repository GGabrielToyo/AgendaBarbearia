export interface Usuario {
    id: number | null,
    nome: string,
    nascimento: string,
    telefone: string,
    login: string,
    senha: string,
}

export interface DadosAutenticacao {
    login: string,
    senha: string
}

export interface AuthResponse {
    token: string;
  }

  export interface Barbeiro {
    id: number,
    nome: string,
    email: string
  }

  export interface Pageable {
    content: Barbeiro[],
    empty: boolean,
    number: number,
    totalElements: number,
    totalPages: number
  }

  export interface Agendamento {
    id?: number,
    idBarbeiro: number,
    idUsuario: number | null,
    data: string
  }

  export interface MensagemErro {
    campo: string,
    mensagem: string
  }