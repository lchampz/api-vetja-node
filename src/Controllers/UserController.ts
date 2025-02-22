import { Response } from "express";
import { User } from "../Models/User";
import { IAuthenticatedRequest } from "../Types/IUser";

export class UserController {
  static async getUserInfo(req: IAuthenticatedRequest, res: Response) {
    const clsUser = new User();

    const user = await clsUser.getUserInfo(req.userId!);
    if (!user) return res.status(401).json({ msg: "Não autorizado" });

    return res.json(user);
  }
}