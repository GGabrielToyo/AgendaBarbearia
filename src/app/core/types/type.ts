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