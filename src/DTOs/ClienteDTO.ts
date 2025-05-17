export interface ICliente {
  IDCliente: number;
  CPF: string | null;
  Nome: string;
  Telefone: string;
  Email: string;
  Senha?: string;
}

export interface IUpdateCliente {
  Nome?: string;
  Email?: string;
  Telefone?: string;
  Especialidade?: string;
}