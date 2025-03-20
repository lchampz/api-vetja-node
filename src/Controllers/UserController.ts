import { Response, Request } from "express";
import { Cliente } from "../Models/Cliente";
import { IAuthenticatedRequest } from "../Types/IUser";
import { Auth } from "../Models/Auth";

export class ClienteController {

  private static getClienteInstance() {
    return new Cliente();
  }

  private static getAuthInstance() {
    return new Auth();
  }

   static async getUserFromToken(req: Request) {
    const clsUser = this.getClienteInstance();
    const clsAuth = this.getAuthInstance();

    const { authorization } = req.headers;
    const token = authorization!.split(" ")[1];
    const responseToken = clsAuth.parseTokenToId(token);

    if (!responseToken.status) throw new Error(responseToken.message);

    const user = await clsUser.getUserInfo(responseToken.message);
    if (!user) throw new Error("Não autorizado");

    return user;
  }

  static async getUserInfo(req: Request, res: Response) {
    try {
      const user = await this.getUserFromToken(req);
      return res.json(user);
    } catch (error) {
      return res.status(500).json({ msg: "Erro interno do servidor", error: req.headers });
    }
  }

  static async getAllUsers(req: Request, res: Response) {
    try {
      const clsUser = new Cliente();
      const users = await clsUser.getAllUsers();
      return res.json(users);
    } catch (error) {
      return res.status(500).json({ msg: "Erro interno do servidor", error });
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
      const user = await this.getUserFromToken(req);
      const clsUser = this.getClienteInstance();
      const updatedUser = await clsUser.updateUser(user.idCliente, req.body);
      if (!updatedUser) return res.status(404).json({ msg: "Usuário não encontrado" });
      return res.json(updatedUser);
    } catch (error) {
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }

  static async deleteUser(req: IAuthenticatedRequest, res: Response) {
    try {
      const user = await this.getUserFromToken(req);
      const clsUser = this.getClienteInstance();
      const deleted = await clsUser.deleteUser(user.idCliente);
      if (!deleted) return res.status(404).json({ msg: "Usuário não encontrado" });
      return res.json({ msg: "Usuário deletado com sucesso" });
    } catch (error) {
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }
}