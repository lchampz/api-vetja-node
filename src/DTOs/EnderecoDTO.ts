export interface IEndereco {
  idEndereco: string;
  rua: string;
  numero: number;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  idCliente: string;
}

export interface ICreateEndereco {
  rua: string;
  numero: number;
  bairro: string;
  cidade: string;
  estado: string;
  cep: string;
  idCliente: string;
} 