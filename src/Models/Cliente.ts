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
        telefone: true,
        cpf: true
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
        telefone: true,
        cpf: true
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
        telefone: true,
        cpf: true
      }
    });
  }

  async deleteCliente(idCliente: string): Promise<ICliente> {
     try {
      // Exemplo: deletar pets do cliente antes (ajuste conforme seu modelo)
      await prisma.animal.deleteMany({ where: { idCliente } });
      // Exemplo: deletar agendamentos do cliente antes (ajuste conforme seu modelo)
      await prisma.endereco.deleteMany({ where: { idCliente } });

      // Agora pode deletar o cliente
      return await prisma.cliente.delete({
        where: { idCliente },
        select: {
          idCliente: true,
          nome: true,
          email: true,
          telefone: true,
          cpf: true
        }
      });
    } catch (error: any) {
      if (error.code === 'P2003') {
        throw new Error('Não é possível deletar o cliente pois existem registros relacionados.');
      }
      throw error;
    }
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