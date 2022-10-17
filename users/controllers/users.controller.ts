import * as argon2 from "argon2";
import { Request, Response } from "express";
import userService from "../services/users.service";

class UsersController {
  async createUser(req: Request, res: Response) {
    req.body.password = await argon2.hash(req.body.password);
    const userId = await userService.createUser(req.body);
    res.status(201).send(userId);
  }
}

export default new UsersController();
