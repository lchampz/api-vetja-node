import { prisma } from "./Prisma";
import { IEndereco, ICreateEndereco } from "../DTOs/EnderecoDTO";

export class Endereco {
  async getAllEnderecos(): Promise<IEndereco[]> {
    return await prisma.endereco.findMany({
      select: {
        IDEndereco: true,
        Logradouro: true,
        Numero: true,
        Bairro: true,
        Cidade: true,
        Estado: true,
        Cep: true,
        IDCliente: true
      }
    });
  }

  async getEnderecoById(IDEndereco: number): Promise<IEndereco | null> {
    return await prisma.endereco.findUnique({
      where: { IDEndereco },
      select: {
        IDEndereco: true,
        Logradouro: true,
        Numero: true,
        Bairro: true,
        Cidade: true,
        Complemento: true,
        CEP: true,
        IDCliente: true
      }
    });
  }

  async createEndereco(data: ICreateEndereco): Promise<IEndereco> {
    return await prisma.endereco.create({
      data,
      select: {
        IDEndereco: true,
        Logradouro: true,
        Numero: true,
        Bairro: true,
        Cidade: true,
        Complemento: true,
        CEP: true,
        IDCliente: true
      }
    });
  }

  async updateEndereco(IDEndereco: number, data: Partial<ICreateEndereco>): Promise<IEndereco> {
    return await prisma.endereco.update({
      where: { IDEndereco },
      data,
      select: {
        IDEndereco: true,
        Logradouro: true,
        Numero: true,
        Bairro: true,
        Cidade: true,
        Complemento: true,
        CEP: true,
        IDCliente: true
      }
    });
  }

  async deleteEndereco(IDEndereco: number): Promise<IEndereco> {
    return await prisma.endereco.delete({
      where: { IDEndereco },
      select: {
        IDEndereco: true,
        Logradouro: true,
        Numero: true,
        Bairro: true,
        Cidade: true,
        Complemento: true,
        CEP: true,
        IDCliente: true
      }
    });
  }
}
