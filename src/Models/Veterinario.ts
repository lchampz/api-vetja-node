import { prisma } from "./Prisma";
import { IVeterinario, ICreateVeterinario } from "../DTOs/VeterinarioDTO";
import { v4 as uuidv4 } from 'uuid';

export class Veterinario {
  async getAllVeterinarios(): Promise<IVeterinario[]> {
    return await prisma.veterinario.findMany({
      select: {
        idVeterinario: true,
        nome: true,
        crmv: true,
      }
    });
  }

  async getVeterinarioById(idVeterinario: string): Promise<IVeterinario | null> {
    return await prisma.veterinario.findUnique({
      where: { idVeterinario },
      select: {
        idVeterinario: true,
        nome: true,
        crmv: true,
      }
    });
  }

  async createVeterinario(data: ICreateVeterinario): Promise<IVeterinario> {
    return await prisma.veterinario.create({
      data: {
        idVeterinario: uuidv4(),
        ...data
      },
      select: {
        idVeterinario: true,
        nome: true,
        crmv: true,
      }
    });
  }

  async updateVeterinario(idVeterinario: string, data: Partial<ICreateVeterinario>): Promise<IVeterinario> {
    return await prisma.veterinario.update({
      where: { idVeterinario },
      data,
      select: {
        idVeterinario: true,
        nome: true,
        crmv: true
      }
    });
  }

  async deleteVeterinario(idVeterinario: string): Promise<IVeterinario> {
    return await prisma.veterinario.delete({
      where: { idVeterinario },
      select: {
        idVeterinario: true,
        nome: true,
        crmv: true
      }
    });
  }
}
