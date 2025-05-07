import { prisma } from "./Prisma";
import { IVeterinario, ICreateVeterinario } from "../DTOs/VeterinarioDTO";

export class Veterinario {
  async getAllVeterinarios(): Promise<IVeterinario[]> {
    return await prisma.veterinario.findMany({
      select: {
        idVeterinario: true,
        nome: true,
        crmv: true,
        email: true,
        telefone: true
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
        email: true,
        telefone: true
      }
    });
  }

  async createVeterinario(data: ICreateVeterinario): Promise<IVeterinario> {
    return await prisma.veterinario.create({
      data,
      select: {
        idVeterinario: true,
        nome: true,
        crmv: true,
        email: true,
        telefone: true
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
        crmv: true,
        email: true,
        telefone: true
      }
    });
  }

  async deleteVeterinario(idVeterinario: string): Promise<IVeterinario> {
    return await prisma.veterinario.delete({
      where: { idVeterinario },
      select: {
        idVeterinario: true,
        nome: true,
        crmv: true,
        email: true,
        telefone: true
      }
    });
  }
}
