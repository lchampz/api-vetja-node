import { Response, Request } from "express";
import { Cliente } from "../Models/Cliente";
import { IAuthenticatedRequest } from "../Types/IUser";

export class ClienteController {
  private static getClienteInstance() {
    return new Cliente();
  }

  static async getUserInfo(req: IAuthenticatedRequest, res: Response) {
    try {
      const clsUser = this.getClienteInstance();
      const user = await clsUser.getUserInfo(req.userId!);
      if (!user) return res.status(401).json({ msg: "Não autorizado" });
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }
  //n sei se vamos usar
  static async getAllUsers(req: Request, res: Response) {
    try {
      const clsUser = this.getClienteInstance();
      const users = await clsUser.getAllUsers();
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }

  static async getUserById(req: Request, res: Response) {
    try {
      const clsUser = this.getClienteInstance();
      const user = await clsUser.getUserById(req.params.id);
      if (!user) return res.status(404).json({ msg: "Usuário não encontrado" });
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }

  static async updateUser(req: IAuthenticatedRequest, res: Response) {
    try {
      const clsUser = this.getClienteInstance();
      const updatedUser = await clsUser.updateUser(req.userId!, req.body);
      if (!updatedUser) return res.status(404).json({ msg: "Usuário não encontrado" });
      return res.json(updatedUser);
    } catch (error) {
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }

  static async deleteUser(req: IAuthenticatedRequest, res: Response) {
    try {
      const clsUser = this.getClienteInstance();
      const deleted = await clsUser.deleteUser(req.userId!);
      if (!deleted) return res.status(404).json({ msg: "Usuário não encontrado" });
      return res.json({ msg: "Usuário deletado com sucesso" });
    } catch (error) {
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }
}