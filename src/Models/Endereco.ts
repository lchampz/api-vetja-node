import { prisma } from "./Prisma";
import { IEndereco, ICreateEndereco } from "../DTOs/EnderecoDTO";

export class Endereco {
  async getAllEnderecos(): Promise<IEndereco[]> {
    return await prisma.endereco.findMany({
      select: {
        idEndereco: true,
        rua: true,
        numero: true,
        bairro: true,
        cidade: true,
        estado: true,
        cep: true,
        idCliente: true
      }
    });
  }

  async getEnderecoById(idEndereco: string): Promise<IEndereco | null> {
    return await prisma.endereco.findUnique({
      where: { idEndereco },
      select: {
        idEndereco: true,
        rua: true,
        numero: true,
        bairro: true,
        cidade: true,
        estado: true,
        cep: true,
        idCliente: true
      }
    });
  }

  async createEndereco(data: ICreateEndereco): Promise<IEndereco> {
    return await prisma.endereco.create({
      data,
      select: {
        idEndereco: true,
        rua: true,
        numero: true,
        bairro: true,
        cidade: true,
        estado: true,
        cep: true,
        idCliente: true
      }
    });
  }

  async updateEndereco(idEndereco: string, data: Partial<ICreateEndereco>): Promise<IEndereco> {
    return await prisma.endereco.update({
      where: { idEndereco },
      data,
      select: {
        idEndereco: true,
        rua: true,
        numero: true,
        bairro: true,
        cidade: true,
        estado: true,
        cep: true,
        idCliente: true
      }
    });
  }

  async deleteEndereco(idEndereco: string): Promise<IEndereco> {
    return await prisma.endereco.delete({
      where: { idEndereco },
      select: {
        idEndereco: true,
        rua: true,
        numero: true,
        bairro: true,
        cidade: true,
        estado: true,
        cep: true,
        idCliente: true
      }
    });
  }
}
