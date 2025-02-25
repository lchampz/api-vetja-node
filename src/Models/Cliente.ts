import { prisma } from "./Prisma";
import { ISanitizeUser } from "../Types/IUser";
import { Auth } from "./Auth";

export class Cliente extends Auth {
  async getUserInfo(id: string): Promise<ISanitizeUser | null> {
    const user = await prisma.cliente.findFirst({
      where: { idCliente: id },
    });
    return user;
  }

  async getAllUsers() {
    return await prisma.cliente.findMany();
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

  async deleteUser(idCliente: string) {
    return await prisma.cliente.delete({ where: { idCliente } });
  }
}