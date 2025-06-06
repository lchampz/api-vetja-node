export interface IAnimal {
  idAnimal: string;
  nome: string;
  idade: number;
  gato: boolean;
  macho: boolean;
  idCliente: string;
}

export interface ICreateAnimal {
  nome: string;
  idade: number;
  gato: boolean;
  macho: boolean;
  idCliente: string;
}