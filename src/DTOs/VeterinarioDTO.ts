export interface IVeterinario {
  IDVeterinario: number;
  CRMV: number;
  Nome: string;
  Especialidade: string;
  Telefone: string;
  Email: string;
  CEP: string;
}

export interface ICreateVeterinario {
  CRMV: number;
  Nome: string;
  Especialidade: string;
  Telefone: string;
  Email: string;
  CEP: string;
}