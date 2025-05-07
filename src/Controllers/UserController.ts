import { Response, Request } from "express";
import { Cliente } from "../Models/Cliente";
import { Auth } from "../Models/Auth";
import { IAuthenticatedRequest } from "../Types/IUser";

export class UserController {
  static async getUserFromToken(req: IAuthenticatedRequest, res: Response) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        return res.status(401).json({ msg: "Token não fornecido" });
      }

      const clsAuth = new Auth();
      const userId = await clsAuth.parseTokenToId(token);
      if (!userId) {
        return res.status(401).json({ msg: "Token inválido" });
      }

      const clsCliente = new Cliente();
      const user = await clsCliente.getClienteById(userId);
      if (!user) {
        return res.status(404).json({ msg: "Usuário não encontrado" });
      }

      return res.json(user);
    } catch (error) {
      console.error("Error in getUserFromToken:", error);
      if (error instanceof Error) {
        if (error.message === "Token expirado") {
          return res.status(401).json({ msg: error.message });
        }
        if (error.message === "Token inválido") {
          return res.status(401).json({ msg: error.message });
        }
      }
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }

  static async getUserInfo(req: IAuthenticatedRequest, res: Response) {
    try {
      if (!req.userId) {
        return res.status(401).json({ msg: "Usuário não autenticado" });
      }

      const clsCliente = new Cliente();
      const user = await clsCliente.getClienteById(req.userId);
      if (!user) {
        return res.status(404).json({ msg: "Usuário não encontrado" });
      }

      return res.json(user);
    } catch (error) {
      console.error("Error in getUserInfo:", error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }

  static async getAllUsers(req: IAuthenticatedRequest, res: Response) {
    try {
      if (!req.userId) {
        return res.status(401).json({ msg: "Usuário não autenticado" });
      }

      const clsCliente = new Cliente();
      const users = await clsCliente.getAllClientes();
      return res.json(users);
    } catch (error) {
      console.error("Error in getAllUsers:", error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }

  static async getUserById(req: IAuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ msg: "ID do usuário não fornecido" });
      }

      if (!req.userId) {
        return res.status(401).json({ msg: "Usuário não autenticado" });
      }

      const clsCliente = new Cliente();
      const user = await clsCliente.getClienteById(id);
      if (!user) {
        return res.status(404).json({ msg: "Usuário não encontrado" });
      }

      return res.json(user);
    } catch (error) {
      console.error("Error in getUserById:", error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }

  static async updateUser(req: IAuthenticatedRequest, res: Response) {
    try {
      const { nome, email, telefone } = req.body;

      if (!req.userId) {
        return res.status(401).json({ msg: "Usuário não autenticado" });
      }

      const clsCliente = new Cliente();
      const updatedUser = await clsCliente.updateCliente(req.userId, { nome, email, telefone });
      if (!updatedUser) {
        return res.status(404).json({ msg: "Usuário não encontrado" });
      }

      return res.json(updatedUser);
    } catch (error) {
      console.error("Error in updateUser:", error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }

  static async deleteUser(req: IAuthenticatedRequest, res: Response) {
    try {

      if (!req.userId) {
        return res.status(401).json({ msg: "Usuário não autenticado" });
      }

      const clsCliente = new Cliente();
      const deletedUser = await clsCliente.deleteCliente(req.userId);
      if (!deletedUser) {
        return res.status(404).json({ msg: "Usuário não encontrado" });
      }

      return res.json({ msg: "Usuário deletado com sucesso" });
    } catch (error) {
      console.error("Error in deleteUser:", error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }
}