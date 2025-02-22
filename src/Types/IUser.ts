import { Request } from "express";

export interface IUser {
  id: number;
  name: string;
  password: string;
  email: string;
}

export interface ISignUp {
  name: string;
  email: string;
  password: string;
}

export interface ISignIn {
  email: string;
  password: string;
}

export interface IUserToken {
  id: string;
}

export interface ISanitizeUser {
  name: string;
  email: string;
  avatar: string;
  last_login?: Date | null;
  last_access?: Date | null;
}

export interface IAuthenticatedRequest extends Request {
    userId?: string;
  }