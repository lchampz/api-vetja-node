import { Request, Response } from "express";
import { Auth } from "../Models/Auth";
import { ISignIn, ISignUp } from "../Types/IUser";

export class AuthController {
  static async signUp(req: Request, res: Response) {
    try {
      const { nome, email, senha, cpf, telefone } = req.body;

      if (!nome || !email || !senha || !cpf || !telefone) {
        return res.status(400).json({ msg: "Todos os campos são obrigatórios" });
      }

      if (senha.length < 6) {
        return res.status(400).json({ msg: "A senha deve ter pelo menos 6 caracteres" });
      }

      if (!/^\d{11}$/.test(cpf)) {
        return res.status(400).json({ msg: "CPF inválido" });
      }

      const clsAuth = new Auth();
      const user = await clsAuth.signUp({ nome, email, senha, cpf, telefone });
      return res.status(201).json(user);
    } catch (error) {
      console.error("Error in signUp:", error);
      if (error instanceof Error && error.message === "Email já cadastrado") {
        return res.status(400).json({ msg: error.message });
      }
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }

  static async signIn(req: Request, res: Response) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({ msg: "Email e senha são obrigatórios" });
      }

      const clsAuth = new Auth();
      const result = await clsAuth.signIn({ email, senha });

      if (!result) {
        return res.status(401).json({ msg: "Email ou senha incorretos" });
      }

      return res.json(result);
    } catch (error) {
      console.error("Error in signIn:", error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }
}