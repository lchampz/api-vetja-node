export interface IAnimal {
  idAnimal: string;
  nome: string;
  raca: string;
  idade: number;
  idCliente: string;
}

export interface ICreateAnimal {
  nome: string;
  raca: string;
  idade: number;
  idCliente: string;
} 