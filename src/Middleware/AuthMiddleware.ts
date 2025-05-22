import { Response, NextFunction } from "express";
import { Cliente } from "../Models/Cliente";
import { IAuthenticatedRequest } from "../Types/IUser";

export const AuthMiddleware = async (req: IAuthenticatedRequest, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ msg: "Token não fornecido" });
    }

    const token = authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "Formato do token inválido" });
    }

    const clsCliente = new Cliente();

    let userId: string;
    try {
      userId = await clsCliente.parseTokenToId(token);
    } catch (error: any) {
      // Aqui você já pode capturar a mensagem personalizada
      return res.status(401).json({ msg: error.message || "Token inválido ou expirado" });
    }

    if (!userId) {
      return res.status(401).json({ msg: "Token inválido ou expirado" });
    }

    req.userId = userId;
    next();
  } catch (error) {
    console.error("Erro no AuthMiddleware:", error);
    return res.status(401).json({ msg: "Erro na autenticação" });
  }
};
