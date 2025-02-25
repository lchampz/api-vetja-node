import { Request, Response } from "express";
import { Cliente } from "../Models/Cliente";

export class AuthController {
  static async signUp(req: Request, res: Response) {
    try {
      const {  senha, nome, email, cpf, telefone } = req.body;
      const response = await new Cliente().signUp({ senha, nome, email, cpf, telefone });
      return res.json(response);
    } catch (error) {
      return res.status(500).json({ message: "Erro ao criar usuário", error });
    }
  }

  static async signIn(req: Request, res: Response) {
    const { email, senha } = req.body;
    const response = await new Cliente().signIn({ email, senha });
    return res.json(response);
  }
}