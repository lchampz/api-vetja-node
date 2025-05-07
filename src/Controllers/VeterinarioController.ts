import { Response, Request } from "express";
import { Veterinario } from "../Models/Veterinario";
import { IAuthenticatedRequest } from "../Types/IUser";

export class VeterinarioController {
  static async getAllVeterinarios(req: IAuthenticatedRequest, res: Response) {
    try {
      if (!req.userId) {
        return res.status(401).json({ msg: "Usuário não autenticado" });
      }

      const clsVeterinario = new Veterinario();
      const veterinarios = await clsVeterinario.getAllVeterinarios();
      return res.json(veterinarios);
    } catch (error) {
      console.error("Error in getAllVeterinarios:", error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }

  static async getVeterinarioById(req: IAuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ msg: "ID do veterinário não fornecido" });
      }

      if (!req.userId) {
        return res.status(401).json({ msg: "Usuário não autenticado" });
      }

      const clsVeterinario = new Veterinario();
      const veterinario = await clsVeterinario.getVeterinarioById(id);
      if (!veterinario) {
        return res.status(404).json({ msg: "Veterinário não encontrado" });
      }

      return res.json(veterinario);
    } catch (error) {
      console.error("Error in getVeterinarioById:", error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }

  static async createVeterinario(req: IAuthenticatedRequest, res: Response) {
    try {
      const { nome, crmv, email, telefone } = req.body;

      if (!nome || !crmv || !email || !telefone) {
        return res.status(400).json({ msg: "Todos os campos são obrigatórios" });
      }

      if (!req.userId) {
        return res.status(401).json({ msg: "Usuário não autenticado" });
      }

      const clsVeterinario = new Veterinario();
      const veterinario = await clsVeterinario.createVeterinario({
        nome,
        crmv,
        email,
        telefone
      });
      return res.status(201).json(veterinario);
    } catch (error) {
      console.error("Error in createVeterinario:", error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }

  static async updateVeterinario(req: IAuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      const { nome, crmv, email, telefone } = req.body;

      if (!id) {
        return res.status(400).json({ msg: "ID do veterinário não fornecido" });
      }

      if (!req.userId) {
        return res.status(401).json({ msg: "Usuário não autenticado" });
      }

      const clsVeterinario = new Veterinario();
      const veterinario = await clsVeterinario.updateVeterinario(id, {
        nome,
        crmv,
        email,
        telefone
      });
      if (!veterinario) {
        return res.status(404).json({ msg: "Veterinário não encontrado" });
      }

      return res.json(veterinario);
    } catch (error) {
      console.error("Error in updateVeterinario:", error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }

  static async deleteVeterinario(req: IAuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ msg: "ID do veterinário não fornecido" });
      }

      if (!req.userId) {
        return res.status(401).json({ msg: "Usuário não autenticado" });
      }

      const clsVeterinario = new Veterinario();
      const veterinario = await clsVeterinario.deleteVeterinario(id);
      if (!veterinario) {
        return res.status(404).json({ msg: "Veterinário não encontrado" });
      }

      return res.json({ msg: "Veterinário deletado com sucesso" });
    } catch (error) {
      console.error("Error in deleteVeterinario:", error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }
}
