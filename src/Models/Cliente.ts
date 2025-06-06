import { prisma } from "./Prisma";
import { ICliente, IUpdateCliente } from "../DTOs/ClienteDTO";
import { ISanitizeUser } from "../Types/IUser";
import { Auth } from "./Auth";

export class Cliente extends Auth {
  async getAllClientes(): Promise<ICliente[]> {
    return await prisma.cliente.findMany({
      select: {
        idCliente: true,
        nome: true,
        email: true,
        telefone: true
      }
    });
  }

  async getClienteById(idCliente: string): Promise<ICliente | null> {
    return await prisma.cliente.findUnique({
      where: { idCliente },
      select: {
        idCliente: true,
        nome: true,
        email: true,
        telefone: true
      }
    });
  }

  async updateCliente(idCliente: string, data: IUpdateCliente): Promise<ICliente> {
    return await prisma.cliente.update({
      where: { idCliente },
      data,
      select: {
        idCliente: true,
        nome: true,
        email: true,
        telefone: true
      }
    });
  }

  async deleteCliente(idCliente: string): Promise<ICliente> {
    return await prisma.cliente.delete({
      where: { idCliente },
      select: {
        idCliente: true,
        nome: true,
        email: true,
        telefone: true
      }
    });
  }

  async getUserInfo(id: string): Promise<ISanitizeUser | null> {
    const user = await prisma.cliente.findFirst({
      where: { idCliente: id },
      select: {
        senha: false,
        email: true,
        nome: true,
        idCliente: true
      },
    });
    return user;
  }

  async getAllUsers(): Promise<ICliente[]> {
    return await prisma.cliente.findMany();
  }

  async getUserById(idCliente: string): Promise<ICliente | null> {
    return await prisma.cliente.findUnique({ where: { idCliente } });
  }

  async updateUser(idCliente: string, data: IUpdateCliente): Promise<ICliente> {
    return await prisma.cliente.update({
      where: { idCliente },
      data,
    });
  }

  async deleteUser(idCliente: string): Promise<ICliente> {
    return await prisma.cliente.delete({ where: { idCliente } });
  }
}