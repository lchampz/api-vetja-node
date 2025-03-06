import { Response, Request } from "express";
import { Endereco } from "../Models/Endereco";
import { IAuthenticatedRequest } from "../Types/IUser";
import { ClienteController } from "../Controllers/UserController";

export class EnderecoController {
  private static getEnderecoInstance() {
    return new Endereco();
  }

  private static getClienteInstance() {
    return new ClienteController();
  }

  static async getAllEnderecos(req: IAuthenticatedRequest, res: Response) {
    try {
      const clsEndereco = this.getEnderecoInstance();
      const clsCliente = this.getClienteInstance();
     
      //const enderecos = await clsEndereco.getAllEnderecos(req.userId!);
      //return res.json(enderecos);
    } catch (error) {
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }

  static async getEnderecoById(req: Request, res: Response) {
    try {
      const clsEndereco = this.getEnderecoInstance();
      const endereco = await clsEndereco.getEnderecoById(req.params.id, "1");
      if (!endereco) return res.status(404).json({ msg: "Endereço não encontrado" });
      return res.json(endereco);
    } catch (error) {
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }

  static async createEndereco(req: IAuthenticatedRequest, res: Response) {
    try {
      const clsEndereco = this.getEnderecoInstance();
      const newEndereco = await clsEndereco.createEndereco(req.body);
      return res.status(201).json(newEndereco);
    } catch (error) {
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }

  static async updateEndereco(req: IAuthenticatedRequest, res: Response) {
    try {
      const clsEndereco = this.getEnderecoInstance();
      const updatedEndereco = await clsEndereco.updateEndereco(req.params.id, req.body);
      if (!updatedEndereco) return res.status(404).json({ msg: "Endereço não encontrado" });
      return res.json(updatedEndereco);
    } catch (error) {
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }

  static async deleteEndereco(req: IAuthenticatedRequest, res: Response) {
    try {
      const clsEndereco = this.getEnderecoInstance();
     // const deleted = await clsEndereco.deleteEndereco(req.params.id, );
     // if (!deleted) return res.status(404).json({ msg: "Endereço não encontrado" });
      return res.json({ msg: "Endereço deletado com sucesso" });
    } catch (error) {
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }
}
