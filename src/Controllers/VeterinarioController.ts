import { Response, Request } from "express";
import { Veterinario } from "../Models/Veterinario";
import { IAuthenticatedRequest } from "../Types/IUser";

export class VeterinarioController {
  private static getVeterinarioInstance() {
    return new Veterinario();
  }

  static async getAllVeterinarios(req: Request, res: Response) {
    try {
      const clsVeterinario = this.getVeterinarioInstance();
      const veterinarios = await clsVeterinario.getAllVeterinarios();
      return res.json(veterinarios);
    } catch (error) {
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }

  static async getVeterinarioById(req: Request, res: Response) {
    try {
      const clsVeterinario = this.getVeterinarioInstance();
      const veterinario = await clsVeterinario.getVeterinarioById(req.params.id);
      if (!veterinario) return res.status(404).json({ msg: "Veterinário não encontrado" });
      return res.json(veterinario);
    } catch (error) {
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }

  static async createVeterinario(req: IAuthenticatedRequest, res: Response) {
    try {
      const clsVeterinario = this.getVeterinarioInstance();
      const newVeterinario = await clsVeterinario.createVeterinario(req.body);
      return res.status(201).json(newVeterinario);
    } catch (error) {
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }

  static async updateVeterinario(req: IAuthenticatedRequest, res: Response) {
    try {
      const clsVeterinario = this.getVeterinarioInstance();
     // const updatedVeterinario = await clsVeterinario.updateVeterinario(req.userId!, req.body);
     // if (!updatedVeterinario) return res.status(404).json({ msg: "Veterinário não encontrado" });
     // return res.json(updatedVeterinario);
    } catch (error) {
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }

  static async deleteVeterinario(req: IAuthenticatedRequest, res: Response) {
    try {
      const clsVeterinario = this.getVeterinarioInstance();
      //const deleted = await clsVeterinario.deleteVeterinario(req.userId!);
      //if (!deleted) return res.status(404).json({ msg: "Veterinário não encontrado" });
      //return res.json({ msg: "Veterinário deletado com sucesso" });
    } catch (error) {
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }
}
