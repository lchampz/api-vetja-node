import { Response, Request } from "express";
import { Especialidade } from "../Models/Especialidade";
import { IAuthenticatedRequest } from "../Types/IUser";

export class EspecialidadeController {
  static async getAllEspecialidades(req: IAuthenticatedRequest, res: Response) {
    try {
      if (!req.userId) {
        return res.status(401).json({ msg: "Usuário não autenticado" });
      }

      const clsEspecialidade = new Especialidade();
      const especialidades = await clsEspecialidade.getAllEspecialidades();
      return res.json(especialidades);
    } catch (error) {
      console.error("Error in getAllEspecialidades:", error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }

  static async getEspecialidadeById(req: IAuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ msg: "ID da especialidade não fornecido" });
      }

      if (!req.userId) {
        return res.status(401).json({ msg: "Usuário não autenticado" });
      }

      const clsEspecialidade = new Especialidade();
      const especialidade = await clsEspecialidade.getEspecialidadeById(id);
      if (!especialidade) {
        return res.status(404).json({ msg: "Especialidade não encontrada" });
      }

      return res.json(especialidade);
    } catch (error) {
      console.error("Error in getEspecialidadeById:", error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }

  static async createEspecialidade(req: IAuthenticatedRequest, res: Response) {
    try {
      const { nome } = req.body;

      if (!nome) {
        return res.status(400).json({ msg: "Nome da especialidade é obrigatório" });
      }

      if (!req.userId) {
        return res.status(401).json({ msg: "Usuário não autenticado" });
      }

      const clsEspecialidade = new Especialidade();
      const especialidade = await clsEspecialidade.createEspecialidade({ nome });
      return res.status(201).json(especialidade);
    } catch (error) {
      console.error("Error in createEspecialidade:", error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }

  static async updateEspecialidade(req: IAuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      const { nome } = req.body;

      if (!id) {
        return res.status(400).json({ msg: "ID da especialidade não fornecido" });
      }

      if (!nome) {
        return res.status(400).json({ msg: "Nome da especialidade é obrigatório" });
      }

      if (!req.userId) {
        return res.status(401).json({ msg: "Usuário não autenticado" });
      }

      const clsEspecialidade = new Especialidade();
      const especialidade = await clsEspecialidade.updateEspecialidade(id, { nome });
      if (!especialidade) {
        return res.status(404).json({ msg: "Especialidade não encontrada" });
      }

      return res.json(especialidade);
    } catch (error) {
      console.error("Error in updateEspecialidade:", error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }

  static async deleteEspecialidade(req: IAuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ msg: "ID da especialidade não fornecido" });
      }

      if (!req.userId) {
        return res.status(401).json({ msg: "Usuário não autenticado" });
      }

      const clsEspecialidade = new Especialidade();
      const especialidade = await clsEspecialidade.deleteEspecialidade(id);
      if (!especialidade) {
        return res.status(404).json({ msg: "Especialidade não encontrada" });
      }

      return res.json({ msg: "Especialidade deletada com sucesso" });
    } catch (error) {
      console.error("Error in deleteEspecialidade:", error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }
} 