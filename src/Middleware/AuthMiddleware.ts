import {  Response, NextFunction } from "express";
import { Cliente } from "../Models/Cliente";
import { IAuthenticatedRequest } from "../Types/IUser";

export const AuthMiddleware = async (req: IAuthenticatedRequest, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ msg: "Não autorizado" });

  const token = authorization.split(" ")[1];
  const response = new Cliente().parseTokenToId(token);

  if (!response.status) return res.status(401).json({ message: response.message });

  req.userId = response.message;
  next();

}