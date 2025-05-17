import { prisma } from "./Prisma";
import { IEspecialidade, ICreateEspecialidade } from "../DTOs/EspecialidadeDTO";

export class Especialidade {
  async getAllEspecialidades(): Promise<IEspecialidade[]> {
    return await prisma.Especialidade.findMany({
      select: {
        IDEspecialidade: true,
        Nome: true
      }
    });
  }

  async getEspecialidadeById(IDEspecialidade: number): Promise<IEspecialidade | null> {
    return await prisma.Especialidade.findUnique({
      where: { IDEspecialidade },
      select: {
        IDEspecialidade: true,
        Nome: true
      }
    });
  }

  async createEspecialidade(data: ICreateEspecialidade): Promise<IEspecialidade> {
    return await prisma.Especialidade.create({
      data,
      select: {
        IDEspecialidade: true,
        Nome: true
      }
    });
  }

  async updateEspecialidade(IDEspecialidade: number, data: ICreateEspecialidade): Promise<IEspecialidade> {
    return await prisma.Especialidade.update({
      where: { IDEspecialidade },
      data,
      select: {
        IDEspecialidade: true,
        Nome: true
      }
    });
  }

  async deleteEspecialidade(IDEspecialidade: number): Promise<IEspecialidade> {
    return await prisma.Especialidade.delete({
      where: { IDEspecialidade },
      select: {
        IDEspecialidade: true,
        Nome: true
      }
    });
  }
}
