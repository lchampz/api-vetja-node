export interface IAnimal {
  IDAnimal: number;
  RGA: number | null;
  Nome: string;
  IDCliente: number | null;
  Especie: string;
  Raca: string | null;
  Cor: string;
  Idade: number;
  Observacoes: string | null;
}

export interface ICreateAnimal {
  RGA?: number;
  Nome: string;
  IDCliente?: number;
  Especie: string;
  Raca?: string;
  Cor: string;
  Idade: number;
  Observacoes?: string;
}