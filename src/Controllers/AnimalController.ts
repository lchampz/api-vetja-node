import { Response, Request } from "express";
import { Animal } from "../Models/Animal";
import { IAuthenticatedRequest } from "../Types/IUser";

export class AnimalController {
  private static getAnimalInstance() {
    return new Animal();
  }

  static async getAllAnimais(req: Request, res: Response) {
    try {
      const clsAnimal = this.getAnimalInstance();
      const animais = await clsAnimal.getAllAnimais();
      return res.json(animais);
    } catch (error) {
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }

  static async getAnimalById(req: Request, res: Response) {
    try {
      const clsAnimal = this.getAnimalInstance();
      const animal = await clsAnimal.getAnimalById(req.params.id);
      if (!animal) return res.status(404).json({ msg: "Animal não encontrado" });
      return res.json(animal);
    } catch (error) {
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }

  static async createAnimal(req: IAuthenticatedRequest, res: Response) {
    try {
      const clsAnimal = this.getAnimalInstance();
      const newAnimal = await clsAnimal.createAnimal(req.body);
      return res.status(201).json(newAnimal);
    } catch (error) {
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }

  static async updateAnimal(req: IAuthenticatedRequest, res: Response) {
    try {
      const clsAnimal = this.getAnimalInstance();
      const updatedAnimal = await clsAnimal.updateAnimal(req.params.id, req.body);
      if (!updatedAnimal) return res.status(404).json({ msg: "Animal não encontrado" });
      return res.json(updatedAnimal);
    } catch (error) {
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }

  static async deleteAnimal(req: IAuthenticatedRequest, res: Response) {
    try {
      const clsAnimal = this.getAnimalInstance();
      const deleted = await clsAnimal.deleteAnimal(req.params.id);
      if (!deleted) return res.status(404).json({ msg: "Animal não encontrado" });
      return res.json({ msg: "Animal deletado com sucesso" });
    } catch (error) {
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }
}
