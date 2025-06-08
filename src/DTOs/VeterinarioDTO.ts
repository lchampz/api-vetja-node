export interface IVeterinario {
  idVeterinario: string;
  nome: string;
  crmv: string;

}

export interface ICreateVeterinario {
  nome: string;
  crmv: string;
  email: string;
  telefone: string;
} 