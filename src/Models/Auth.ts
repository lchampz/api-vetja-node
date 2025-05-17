import { prisma } from "./Prisma";
import { ISignIn, ISignUp, ISanitizeUser } from "../Types/IUser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class Auth {
  async signIn(data: ISignIn): Promise<{ token: string; user: ISanitizeUser } | null> {
    try {
      if (!process.env.SECRET) {
        throw new Error("SECRET environment variable is not set");
      }

      const user = await prisma.cliente.findUnique({
        where: { email: data.email }
      });

      if (!user) {
        return null;
      }

      const isValidPassword = await bcrypt.compare(data.senha, user.senha);
      if (!isValidPassword) {
        return null;
      }

      const token = jwt.sign({ id: user.IDCliente }, process.env.SECRET, {
        expiresIn: "1d"
      });

      return {
        token,
        user: {
          nome: user.nome,
          email: user.email,
          IDCliente: user.IDCliente
        }
      };
    } catch (error) {
      console.error("Error in signIn:", error);
      throw error;
    }
  }

  async signUp(data: ISignUp): Promise<ISanitizeUser> {
    try {
      const existingUser = await prisma.cliente.findUnique({
        where: { email: data.email }
      });

      if (existingUser) {
        throw new Error("Email já cadastrado");
      }

      const hashedPassword = await bcrypt.hash(data.senha, 10);

      const user = await prisma.cliente.create({
        data: {
          nome: data.nome,
          email: data.email,
          senha: hashedPassword,
          cpf: data.cpf,
          telefone: data.telefone
        }
      });

      return {
        nome: user.nome,
        email: user.email,
        IDCliente: user.IDCliente
      };
    } catch (error) {
      console.error("Error in signUp:", error);
      throw error;
    }
  }

  async parseTokenToId(token: string): Promise<string> {
    try {
      if (!process.env.SECRET) {
        throw new Error("SECRET environment variable is not set");
      }

      const decoded = jwt.verify(token, process.env.SECRET) as { id: string };
      return decoded.id;
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        throw new Error("Token expirado");
      }
      if (error instanceof jwt.JsonWebTokenError) {
        throw new Error("Token inválido");
      }
      throw error;
    }
  }
}
