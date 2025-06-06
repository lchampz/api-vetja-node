export interface ICliente {
  idCliente: string;
  nome: string;
  email: string;
  telefone: string;
}

export interface IUpdateCliente {
  nome?: string;
  email?: string;
  telefone?: string;
} 