import { prisma } from "./Prisma";
import { IServico, ICreateServico } from "../DTOs/ServicoDTO";
import { v4 as uuidv4 } from 'uuid';

export class Servico {
  async getAllServicos(): Promise<IServico[]> {
    return await prisma.servico.findMany({
      select: {
        idServico: true,
        nome: true,
        descricao: true
      }
    });
  }

  async getServicoById(idServico: string): Promise<IServico | null> {
    return await prisma.servico.findUnique({
      where: { idServico },
      select: {
        idServico: true,
        nome: true,
        descricao: true
      }
    });
  }

  async createServico(data: ICreateServico): Promise<IServico> {
    return await prisma.servico.create({
      data: {
        idServico: uuidv4(),
        ...data
      },
      select: {
        idServico: true,
        nome: true,
        descricao: true
      }
    });
  }

  async updateServico(idServico: string, data: Partial<ICreateServico>): Promise<IServico> {
    return await prisma.servico.update({
      where: { idServico },
      data,
      select: {
        idServico: true,
        nome: true,
        descricao: true
      }
    });
  }

  async deleteServico(idServico: string): Promise<IServico> {
    return await prisma.servico.delete({
      where: { idServico },
      select: {
        idServico: true,
        nome: true,
        descricao: true
      }
    });
  }
}
