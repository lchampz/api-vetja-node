import { IResponse, IResponseUser } from '../Types/IResponse';
import { prisma } from "./Prisma";
import { IUser, ISignIn, IUserToken, ISignUp } from "../Types/IUser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET = process.env.SECRET as string;

export class Auth {
  async signIn(user: ISignIn): Promise<IResponseUser> {
    const findedEmail = await prisma.user.findFirst({where: {email: user.email}});

    if(!findedEmail) return { message: "Email ou senha incorretos.", status: false, token: null };

    const verifyPass = await bcrypt.compare(user.password, findedEmail.password);

    if (!verifyPass)
      return { message: "Email ou senha incorretos.", status: false, token: null };
    
    const token = jwt.sign({id: findedEmail.id }, SECRET, {expiresIn: '8h'});
    
    const date = new Date()

    await prisma.user.update({where: {email: findedEmail.email}, data: {last_login: date.toISOString()}})

    return {message: "Login efetuado.", status: true, token: token};
  }

  async signUp(user: ISignUp): Promise<IResponse> {
    const userExists = await prisma.user.findFirst({
      where: {
        email: user.email,
      },
    });

    if (userExists) return { message: "Email já utilizado.", status: false };

    const hashPassword = await bcrypt.hash(user.password, 10);

    const newUser = await prisma.user.create({
      data: {
        email: user.email,
        name: user.name,
        password: hashPassword,
      },
    });

    if(newUser) return {message: "Usuário cadastrado com sucesso.", status: true}
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
