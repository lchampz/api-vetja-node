import { prisma } from "./Prisma";
import { ISanitizeUser } from "../Types/IUser";
import { Auth } from "./Auth";

export class Cliente extends Auth {
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

  async getAllUsers() {
    return await prisma.cliente.findMany({
      select: {
        senha: false,
        email: true,
        nome: true,
        idCliente: true
      }
    });
  }

  async getUserByEmail(email: string) {
    return await prisma.cliente.findFirst({ where: { email } });
  }

  async getUserById(idCliente: string) {
    return await prisma.cliente.findUnique({ where: { idCliente } });
  }

  async updateUser(idCliente: string, data: any) {
    return await prisma.cliente.update({
      where: { idCliente },
      data,
    });
  }

  async deleteUser(email: string) {
    return await prisma.cliente.delete({ where: { email } });
  }

}