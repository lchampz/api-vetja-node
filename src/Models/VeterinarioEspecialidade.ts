import { prisma } from "./Prisma";
import { IVeterinarioEspecialidade, ICreateVeterinarioEspecialidade } from "../DTOs/VeterinarioEspecialidadeDTO";
import { v4 as uuidv4 } from 'uuid';

export class VeterinarioEspecialidade {
  async getAllVeterinarioEspecialidades(): Promise<IVeterinarioEspecialidade[]> {
    return await prisma.veterinarioEspecialidade.findMany({
      select: {
        idVeterinarioEspecialidade: true,
        idVeterinario: true,
        idEspecialidade: true
      }
    });
  }

  async getVeterinarioEspecialidadeById(idVeterinarioEspecialidade: string): Promise<IVeterinarioEspecialidade | null> {
    return await prisma.veterinarioEspecialidade.findUnique({
      where: { idVeterinarioEspecialidade },
      select: {
        idVeterinarioEspecialidade: true,
        idVeterinario: true,
        idEspecialidade: true
      }
    });
  }

  async createVeterinarioEspecialidade(data: ICreateVeterinarioEspecialidade): Promise<IVeterinarioEspecialidade> {
    return await prisma.veterinarioEspecialidade.create({
      data: {
        idVeterinarioEspecialidade: uuidv4(),
        ...data
      },
      select: {
        idVeterinarioEspecialidade: true,
        idVeterinario: true,
        idEspecialidade: true
      }
    });
  }

  async deleteVeterinarioEspecialidade(idVeterinarioEspecialidade: string): Promise<IVeterinarioEspecialidade> {
    return await prisma.veterinarioEspecialidade.delete({
      where: { idVeterinarioEspecialidade },
      select: {
        idVeterinarioEspecialidade: true,
        idVeterinario: true,
        idEspecialidade: true
      }
    });
  }
} 