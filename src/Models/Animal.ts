import { prisma } from "./Prisma";
import { IAnimal, ICreateAnimal } from "../DTOs/AnimalDTO";

export class Animal {
  async getAllAnimais(): Promise<IAnimal[]> {
    return await prisma.animal.findMany({
      select: {
        idAnimal: true,
        nome: true,
        gato: true,
        macho: true,
        idade: true,
        idCliente: true
      }
    });
  }

  async getAnimalById(idAnimal: string): Promise<IAnimal | null> {
    return await prisma.animal.findUnique({
      where: { idAnimal },
      select: {
        idAnimal: true,
        nome: true,
        gato: true,
        idade: true,
        macho: true,
        idCliente: true
      }
    });
  }

  async createAnimal(data: ICreateAnimal): Promise<IAnimal> {
    return await prisma.animal.create({
      data,
      select: {
        idAnimal: true,
        nome: true,
        gato: true,
        macho: true,
        idade: true,
        idCliente: true
      }
    });
  }

  async updateAnimal(idAnimal: string, data: Partial<ICreateAnimal>): Promise<IAnimal> {
    return await prisma.animal.update({
      where: { idAnimal },
      data,
      select: {
        idAnimal: true,
        nome: true,
        gato: true,
        macho: true, 
        
        idade: true,
        idCliente: true
      }
    });
  }

  async deleteAnimal(idAnimal: string): Promise<IAnimal> {
    return await prisma.animal.delete({
      where: { idAnimal },
      select: {
        idAnimal: true,
        nome: true,
        macho: true,
        gato: true,
        idade: true,
        idCliente: true
      }
    });
  }
}
