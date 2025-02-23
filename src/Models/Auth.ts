import { IResponse, IResponseUser } from '../Types/IResponse';
import { prisma } from "./Prisma";
import { IUser, ISignIn, IUserToken, ISignUp } from "../Types/IUser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET as string;

export class Auth {
  async signIn(cliente: ISignIn): Promise<IResponseUser> {
    const findedEmail = await prisma.cliente.findFirst({where: {email: cliente.email}});

    if(!findedEmail) return { message: "Email ou senha incorretos.", status: false, token: null };

    const verifyPass = await bcrypt.compare(cliente.senha, findedEmail.senha);

    if (!verifyPass)
      return { message: "Email ou senha incorretos.", status: false, token: null };
    
    const token = jwt.sign({id: findedEmail.idCliente }, SECRET, {expiresIn: '8h'});
    
    return {message: "Login efetuado.", status: true, token: token};
  }

  async signUp(cliente: ISignUp): Promise<IResponse> {
    const clienteExists = await prisma.cliente.findFirst({
      where: {
        email: cliente.email,
      },
    });

    if (clienteExists) return { message: "Email já utilizado.", status: false };

    const hashPass = await bcrypt.hash(cliente.senha, 10);

    const newCustomer = await prisma.cliente.create({
      data: {
        email: cliente.email,
        nome: cliente.nome,
        senha: hashPass,
        cpf: cliente.cpf,
        telefone: cliente.telefone,
        
      },
    });

    if(newCustomer) return {message: "Usuário cadastrado com sucesso.", status: true}
    else return {message: "Erro ao cadastrar usuário.", status: false}
  }

  parseTokenToId(token: string): IResponse {
      try {
        const { id } = jwt.verify(
          token,
          process.env.SECRET as string
        ) as IUserToken;
       
        return {status: true, message: id};
      } catch (error) {
        return { status: false, message: "Token Expirado" };
      }
  }
}
