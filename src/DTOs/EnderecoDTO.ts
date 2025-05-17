export interface IEndereco {
  IDEndereco: number;
  IDCliente: number | null;
  Logradouro: string;
  Numero: number;
  Complemento: string;
  Bairro: string;
  Cidade: string;
  CEP: string;
}

export interface ICreateEndereco {
  IDCliente?: number;
  Logradouro: string;
  Numero: number;
  Complemento: string;
  Bairro: string;
  Cidade: string;
  CEP: string;
}