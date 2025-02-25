import { prisma } from "./Prisma";

export class Especialidade {
  async getAllEspecialidades() {
    return await prisma.especialidade.findMany();
  }

  async createEspecialidade(data: any) {
    return await prisma.especialidade.create({ data });
  }

  async updateEspecialidade(idEspecialidade: string, data: any) {
    return await prisma.especialidade.update({
      where: { idEspecialidade },
      data,
    });
  }

  async deleteEspecialidade(idEspecialidade: string) {
    return await prisma.especialidade.delete({ where: { idEspecialidade } });
  }
}
