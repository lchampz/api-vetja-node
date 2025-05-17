import { Response } from "express";
import { Servico } from "../Models/Servico";
import { IAuthenticatedRequest } from "../Types/IUser";

export class ServicoController {
  static async getAllServicos(req: IAuthenticatedRequest, res: Response) {
    try {
      if (!req.userId) {
        return res.status(401).json({ msg: "Usuário não autenticado" });
      }
      const clsServico = new Servico();
      const servicos = await clsServico.getAllServicos();
      return res.json(servicos);
    } catch (error) {
      console.error("Error in getAllServicos:", error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }

  static async getServicoById(req: IAuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ msg: "ID do serviço não fornecido" });
      }
      if (!req.userId) {
        return res.status(401).json({ msg: "Usuário não autenticado" });
      }
      const clsServico = new Servico();
      const servico = await clsServico.getServicoById(id);
      if (!servico) {
        return res.status(404).json({ msg: "Serviço não encontrado" });
      }
      return res.json(servico);
    } catch (error) {
      console.error("Error in getServicoById:", error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }

  static async createServico(req: IAuthenticatedRequest, res: Response) {
    try {
      const { nome, descricao } = req.body;
      if (!nome || !descricao) {
        return res.status(400).json({ msg: "Todos os campos são obrigatórios" });
      }
      if (!req.userId) {
        return res.status(401).json({ msg: "Usuário não autenticado" });
      }
      const clsServico = new Servico();
      const servico = await clsServico.createServico({ nome, descricao });
      return res.status(201).json(servico);
    } catch (error) {
      console.error("Error in createServico:", error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }

  static async updateServico(req: IAuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      const { nome, descricao } = req.body;
      if (!id) {
        return res.status(400).json({ msg: "ID do serviço não fornecido" });
      }
      if (!req.userId) {
        return res.status(401).json({ msg: "Usuário não autenticado" });
      }
      const clsServico = new Servico();
      const servico = await clsServico.updateServico(id, { nome, descricao });
      if (!servico) {
        return res.status(404).json({ msg: "Serviço não encontrado" });
      }
      return res.json(servico);
    } catch (error) {
      console.error("Error in updateServico:", error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }

  static async deleteServico(req: IAuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ msg: "ID do serviço não fornecido" });
      }
      if (!req.userId) {
        return res.status(401).json({ msg: "Usuário não autenticado" });
      }
      const clsServico = new Servico();
      const servico = await clsServico.deleteServico(id);
      if (!servico) {
        return res.status(404).json({ msg: "Serviço não encontrado" });
      }
      return res.json({ msg: "Serviço deletado com sucesso" });
    } catch (error) {
      console.error("Error in deleteServico:", error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }
}
