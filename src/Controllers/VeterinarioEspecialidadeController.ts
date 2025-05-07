import { Response, Request } from "express";
import { VeterinarioEspecialidade } from "../Models/VeterinarioEspecialidade";
import { IAuthenticatedRequest } from "../Types/IUser";

export class VeterinarioEspecialidadeController {
  static async getAllVeterinarioEspecialidades(req: IAuthenticatedRequest, res: Response) {
    try {
      if (!req.userId) {
        return res.status(401).json({ msg: "Usuário não autenticado" });
      }

      const clsVeterinarioEspecialidade = new VeterinarioEspecialidade();
      const veterinarioEspecialidades = await clsVeterinarioEspecialidade.getAllVeterinarioEspecialidades();
      return res.json(veterinarioEspecialidades);
    } catch (error) {
      console.error("Error in getAllVeterinarioEspecialidades:", error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }

  static async getVeterinarioEspecialidadeById(req: IAuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ msg: "ID da especialidade do veterinário não fornecido" });
      }

      if (!req.userId) {
        return res.status(401).json({ msg: "Usuário não autenticado" });
      }

      const clsVeterinarioEspecialidade = new VeterinarioEspecialidade();
      const veterinarioEspecialidade = await clsVeterinarioEspecialidade.getVeterinarioEspecialidadeById(id);
      if (!veterinarioEspecialidade) {
        return res.status(404).json({ msg: "Especialidade do veterinário não encontrada" });
      }

      return res.json(veterinarioEspecialidade);
    } catch (error) {
      console.error("Error in getVeterinarioEspecialidadeById:", error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }

  static async createVeterinarioEspecialidade(req: IAuthenticatedRequest, res: Response) {
    try {
      const { idVeterinario, idEspecialidade } = req.body;

      if (!idVeterinario || !idEspecialidade) {
        return res.status(400).json({ msg: "Todos os campos são obrigatórios" });
      }

      if (!req.userId) {
        return res.status(401).json({ msg: "Usuário não autenticado" });
      }

      const clsVeterinarioEspecialidade = new VeterinarioEspecialidade();
      const veterinarioEspecialidade = await clsVeterinarioEspecialidade.createVeterinarioEspecialidade({
        idVeterinario,
        idEspecialidade
      });
      return res.status(201).json(veterinarioEspecialidade);
    } catch (error) {
      console.error("Error in createVeterinarioEspecialidade:", error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }

  static async deleteVeterinarioEspecialidade(req: IAuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ msg: "ID da especialidade do veterinário não fornecido" });
      }

      if (!req.userId) {
        return res.status(401).json({ msg: "Usuário não autenticado" });
      }

      const clsVeterinarioEspecialidade = new VeterinarioEspecialidade();
      const veterinarioEspecialidade = await clsVeterinarioEspecialidade.deleteVeterinarioEspecialidade(id);
      if (!veterinarioEspecialidade) {
        return res.status(404).json({ msg: "Especialidade do veterinário não encontrada" });
      }

      return res.json({ msg: "Especialidade do veterinário deletada com sucesso" });
    } catch (error) {
      console.error("Error in deleteVeterinarioEspecialidade:", error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }
} 