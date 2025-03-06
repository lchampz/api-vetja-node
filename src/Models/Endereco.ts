import { prisma } from "./Prisma";

export class Endereco {
  async getAllEnderecos(idCliente: string) {
    return await prisma.endereco.findMany({ where: {idCliente} });
  }

  async getEnderecoById(idEndereco: string, idCliente: string) {
    return await prisma.endereco.findUnique({ where: { idEndereco, idCliente } });
  }

  async createEndereco(data: any) {
    return await prisma.endereco.create({ data });
  }

  async updateEndereco(idEndereco: string, data: any) {
    const endereco = await prisma.endereco.findUnique({ where: { idEndereco } });
    if (endereco?.idCliente !== data.idCliente) {
      throw new Error("Cliente não autorizado a atualizar este endereço");
    }
    return await prisma.endereco.update({
      where: { idEndereco },
      data,
    });
  }

  async deleteEndereco(idEndereco: string, idCliente: string) {
    const endereco = await prisma.endereco.findUnique({ where: { idEndereco } });
    if (endereco?.idCliente !== idCliente) {
      throw new Error("Cliente não autorizado a excluir este endereço");
    }
    return await prisma.endereco.delete({ where: { idEndereco } });
  }
}
