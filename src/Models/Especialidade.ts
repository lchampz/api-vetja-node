import { prisma } from "./Prisma";
import { IEspecialidade, ICreateEspecialidade } from "../DTOs/EspecialidadeDTO";
import { v4 as uuidv4 } from 'uuid';

export class Especialidade {
  async getAllEspecialidades(): Promise<IEspecialidade[]> {
    return await prisma.especialidade.findMany({
      select: {
        idEspecialidade: true,
        nome: true
      }
    });
  }

  async getEspecialidadeById(idEspecialidade: string): Promise<IEspecialidade | null> {
    return await prisma.especialidade.findUnique({
      where: { idEspecialidade },
      select: {
        idEspecialidade: true,
        nome: true
      }
    });
  }

  async createEspecialidade(data: ICreateEspecialidade): Promise<IEspecialidade> {
    return await prisma.especialidade.create({
      data: {
        idEspecialidade: uuidv4(),
        ...data
      },
      select: {
        idEspecialidade: true,
        nome: true
      }
    });
  }

  async updateEspecialidade(idEspecialidade: string, data: ICreateEspecialidade): Promise<IEspecialidade> {
    return await prisma.especialidade.update({
      where: { idEspecialidade },
      data,
      select: {
        idEspecialidade: true,
        nome: true
      }
    });
  }

  async deleteEspecialidade(idEspecialidade: string): Promise<IEspecialidade> {
    return await prisma.especialidade.delete({
      where: { idEspecialidade },
      select: {
        idEspecialidade: true,
        nome: true
      }
    });
  }
}
