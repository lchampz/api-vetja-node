import { Response, Request } from "express";
import { Animal } from "../Models/Animal";
import { IAuthenticatedRequest } from "../Types/IUser";

export class AnimalController {

  static async getAnimalByUserId(req: IAuthenticatedRequest, res: Response) {
    try {
      const { userId } = req.params;
      if (!userId) {
        return res.status(400).json({ msg: "ID do usuário não fornecido" });
      }

      if (!req.userId) {
        return res.status(401).json({ msg: "Usuário não autenticado" });
      }

      const clsAnimal = new Animal();
      const animais = await clsAnimal.getAnimalByUserId(userId);
      if (animais.length === 0) {
        return res.status(404).json({ msg: "Nenhum animal encontrado para este usuário" });
      }

      return res.json(animais);
    } catch (error) {
      console.error("Error in getAnimalByUserId:", error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }

  static async getAllAnimais(req: IAuthenticatedRequest, res: Response) {
    try {
      if (!req.userId) {
        return res.status(401).json({ msg: "Usuário não autenticado" });
      }

      const clsAnimal = new Animal();
      const animais = await clsAnimal.getAllAnimais();
      return res.json(animais);
    } catch (error) {
      console.error("Error in getAllAnimais:", error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }

  static async getAnimalById(req: IAuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ msg: "ID do animal não fornecido" });
      }

      if (!req.userId) {
        return res.status(401).json({ msg: "Usuário não autenticado" });
      }

      const clsAnimal = new Animal();
      const animal = await clsAnimal.getAnimalById(id);
      if (!animal) {
        return res.status(404).json({ msg: "Animal não encontrado" });
      }

      return res.json(animal);
    } catch (error) {
      console.error("Error in getAnimalById:", error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }

  static async createAnimal(req: IAuthenticatedRequest, res: Response) {
    try {
      const { nome, idade, gato, macho } = req.body;

      if (
        typeof nome !== "string" ||
        typeof idade !== "number" ||
        typeof gato !== "boolean" ||
        typeof macho !== "boolean"
      ) {
        return res.status(400).json({ msg: "Campos obrigatórios: nome (string), idade (number), gato (boolean), macho (boolean)" });

      }

      if (!req.userId) {
        return res.status(401).json({ msg: "Usuário não autenticado" });
      }

      const clsAnimal = new Animal();
      const animal = await clsAnimal.createAnimal({
        nome,
        idade,
        gato,
        macho,
        idCliente: req.userId
      });
      return res.status(201).json(animal);
    } catch (error) {
      console.error("Error in createAnimal:", error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }

  static async updateAnimal(req: IAuthenticatedRequest, res: Response) {
    try {
      const clsAnimal = new Animal();
      const { id } = req.params;
      
      const updateData: { nome?: string; idade?: number; gato?: boolean; macho?: boolean } = {};

      if (!id) {
        return res.status(400).json({ msg: "ID do animal não fornecido" });
      }

      if (!req.userId) {
        return res.status(401).json({ msg: "Usuário não autenticado" });
      }

      const isAnimalExists = await clsAnimal.getAnimalById(id);
      if (!isAnimalExists) {
        return res.status(404).json({ msg: "Animal não encontrado" });
      }

      const { nome, idade, gato, macho } = req.body;
      if (typeof nome === "string") updateData.nome = nome;
      if (typeof idade === "number") updateData.idade = idade;
      if (typeof gato === "boolean") updateData.gato = gato;
      if (typeof macho === "boolean") updateData.macho = macho;

      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ msg: "Nenhum campo válido para atualizar" });
      }

      const animal = await clsAnimal.updateAnimal(id, updateData);
      if (!animal) {
        return res.status(404).json({ msg: "Animal não encontrado" });
      }

      return res.json(animal);
    } catch (error) {
      console.error("Error in updateAnimal:", error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }

  static async deleteAnimal(req: IAuthenticatedRequest, res: Response) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ msg: "ID do animal não fornecido" });
      }

      if (!req.userId) {
        return res.status(401).json({ msg: "Usuário não autenticado" });
      }

      const clsAnimal = new Animal();
      const animal = await clsAnimal.deleteAnimal(id);
      if (!animal) {
        return res.status(404).json({ msg: "Animal não encontrado" });
      }

      return res.json({ msg: "Animal deletado com sucesso" });
    } catch (error) {
      console.error("Error in deleteAnimal:", error);
      return res.status(500).json({ msg: "Erro interno do servidor" });
    }
  }
}
