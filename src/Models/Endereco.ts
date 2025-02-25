import { prisma } from "./Prisma";

export class Endereco {
  async getAllEnderecos(idCliente: string) {
    return await prisma.endereco.findMany({ where: {idCliente} });
  }

  async getEnderecoById(idEndereco: string) {
    return await prisma.endereco.findUnique({ where: { idEndereco } });
  }

  async createEndereco(data: any) {
    return await prisma.endereco.create({ data });
  }

  async updateEndereco(idEndereco: string, data: any) {
    return await prisma.endereco.update({
      where: { idEndereco },
      data,
    });
  }

  async deleteEndereco(idEndereco: string) {
    return await prisma.endereco.delete({ where: { idEndereco } });
  }
}
