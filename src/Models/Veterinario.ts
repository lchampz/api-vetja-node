import { prisma } from "./Prisma";

export class Veterinario {
  async getAllVeterinarios() {
    return await prisma.veterinario.findMany();
  }

  async getVeterinarioById(idVeterinario: string) {
    return await prisma.veterinario.findUnique({ where: { idVeterinario } });
  }

  async createVeterinario(data: any) {
    return await prisma.veterinario.create({ data });
  }

  async updateVeterinario(idVeterinario: string, data: any) {
    return await prisma.veterinario.update({
      where: { idVeterinario },
      data,
    });
  }

  async deleteVeterinario(idVeterinario: string) {
    return await prisma.veterinario.delete({ where: { idVeterinario } });
  }
}
