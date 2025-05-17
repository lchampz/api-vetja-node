import { prisma } from "./Prisma";
import { ICliente, IUpdateCliente } from "../DTOs/ClienteDTO";
import { ISanitizeUser } from "../Types/IUser";
import { Auth } from "./Auth";

export class Cliente extends Auth {
  async getAllClientes(): Promise<ICliente[]> {
    return await prisma.cliente.findMany({
      select: {
        IDCliente: true,
        Nome: true,
        Email: true,
        Telefone: true,
        CPF: true
      }
    });
  }

  async getClienteById(IDCliente: number): Promise<ICliente | null> {
    return await prisma.cliente.findUnique({
      where: { IDCliente },
      select: {
        IDCliente: true,
        Nome: true,
        Email: true,
        Telefone: true,
        CPF: true
      }
    });
  }

  async updateCliente(IDCliente: number, data: IUpdateCliente): Promise<ICliente> {
    return await prisma.cliente.update({
      where: { IDCliente },
      data,
      select: {
        IDCliente: true,
        Nome: true,
        Email: true,
        Telefone: true,
        CPF: true,
      }
    });
  }

  async deleteCliente(IDCliente: number): Promise<ICliente> {
    return await prisma.cliente.delete({
      where: { IDCliente }
    });
  }

  async getUserInfo(id: number): Promise<ISanitizeUser | null> {
    const user = await prisma.cliente.findFirst({
      where: { IDCliente: id },
      select: {
        Senha: false,
        Email: true,
        Nome: true,
        IDCliente: true
      },
    });
    return user;
  }

  async getAllUsers(): Promise<ICliente[]> {
    return await prisma.cliente.findMany();
  }

  async getUserById(IDCliente: number): Promise<ICliente | null> {
    return await prisma.cliente.findUnique({ where: { IDCliente } });
  }

  async updateUser(IDCliente: number, data: IUpdateCliente): Promise<ICliente> {
    return await prisma.cliente.update({
      where: { IDCliente },
      data,
    });
  }

  async deleteUser(IDCliente: number): Promise<ICliente> {
    return await prisma.cliente.delete({ where: { IDCliente } });
  }
}