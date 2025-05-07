import { Request } from "express";

export interface IUser {
  id: number;
  nome: string;
  senha: string;
  email: string;
}

export interface ISignUp {
  nome: string;
  email: string;
  senha: string;
  cpf: string;
  telefone: string;
}

export interface ISignIn {
  email: string;
  senha: string;
}

export interface IUserToken {
  id: string;
}

export interface ISanitizeUser {
  nome: string;
  email: string;
  idCliente: string;
}

export interface IAuthenticatedRequest extends Request {
  token?: string;
  userId?: string;
}