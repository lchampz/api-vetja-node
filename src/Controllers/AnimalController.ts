import { Response, Request } from "express";
import { Animal } from "../Models/Animal";
import { IAuthenticatedRequest } from "../Types/IUser";

export class AnimalController {
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
      const { nome, gato, macho, idade } = req.body;

      const isValid =  [nome, gato, macho, idade]

      if (isValid.every(Boolean)) {
        return res.status(400).json({ msg: "Todos os campos são obrigatórios" });
      }

      if (!req.userId) {
        return res.status(401).json({ msg: "Usuário não autenticado" });
      }

      const clsAnimal = new Animal();
      const animal = await clsAnimal.createAnimal({
        nome,
        gato,
        macho,
        idade: Number(idade),
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
      const updateData: { nome?: string; gato?: boolean; idade?: number, macho?: boolean } = {};

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

      const { nome, gato, idade, macho } = req.body;
      if (nome) updateData.nome = nome;
      if (gato) updateData.gato = gato;
      if (macho) updateData.macho = macho;
      if (idade) updateData.idade = Number(idade);


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
