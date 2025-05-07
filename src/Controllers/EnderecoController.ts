import { Response, Request } from "express";
import { Endereco } from "../Models/Endereco";
import { IAuthenticatedRequest } from "../Types/IUser";
import { UserController as ClienteController } from "../Controllers/UserController";

export class EnderecoController {
  static async getAllEnderecos(req: IAuthenticatedRequest, res: Response) {
    try {
      if (!req.userId) {
        return res.status(401).json({ msg: "Usuário não autenticado" });
      }

      const clsEndereco = new Endereco();
      const enderecos = await clsEndereco.getAllEnderecos();
      return res.json(enderecos);
    } catch (error) {
      console.error('Error in getAllEnderecos:', error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }

  static async getEnderecoById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ msg: "ID do endereço não fornecido" });
      }

      const clsEndereco = new Endereco();
      const endereco = await clsEndereco.getEnderecoById(id);
      if (!endereco) return res.status(404).json({ msg: "Endereço não encontrado" });
      return res.json(endereco);
    } catch (error) {
      console.error('Error in getEnderecoById:', error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }

  static async createEndereco(req: IAuthenticatedRequest, res: Response) {
    try {
      const { rua, numero, bairro, cidade, estado, cep } = req.body;

      if (!rua || !numero || !bairro || !cidade || !estado || !cep) {
        return res.status(400).json({ msg: "Todos os campos obrigatórios devem ser preenchidos" });
      }

      if (!req.userId) {
        return res.status(401).json({ msg: "Usuário não autenticado" });
      }

      const clsEndereco = new Endereco();
      const newEndereco = await clsEndereco.createEndereco({
        rua,
        numero,
        bairro,
        cidade,
        estado,
        cep,
        idCliente: req.userId
      });
      return res.status(201).json(newEndereco);
    } catch (error) {
      console.error('Error in createEndereco:', error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }

  static async updateEndereco(req: IAuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      const { rua, numero, bairro, cidade, estado, cep } = req.body;

      if (!id) {
        return res.status(400).json({ msg: "ID do endereço não fornecido" });
      }

      if (!req.userId) {
        return res.status(401).json({ msg: "Usuário não autenticado" });
      }

      const clsEndereco = new Endereco();
      const updatedEndereco = await clsEndereco.updateEndereco(id, {
        rua,
        numero,
        bairro,
        cidade,
        estado,
        cep,
        idCliente: req.userId
      });
      if (!updatedEndereco) return res.status(404).json({ msg: "Endereço não encontrado" });
      return res.json(updatedEndereco);
    } catch (error) {
      console.error('Error in updateEndereco:', error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }

  static async deleteEndereco(req: IAuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ msg: "ID do endereço não fornecido" });
      }

      if (!req.userId) {
        return res.status(401).json({ msg: "Usuário não autenticado" });
      }

      const clsEndereco = new Endereco();
      const deleted = await clsEndereco.deleteEndereco(id);
      if (!deleted) return res.status(404).json({ msg: "Endereço não encontrado" });
      return res.json({ msg: "Endereço deletado com sucesso" });
    } catch (error) {
      console.error('Error in deleteEndereco:', error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }
}
