import * as argon2 from "argon2";
import { Request, Response } from "express";
import userService from "../services/users.service";

class UsersController {
  async createUser(req: Request, res: Response) {
    try {
      req.body.password = await argon2.hash(req.body.password);
      const userId = await userService.createUser(req.body);
      res.status(201).send(userId);
    } catch (error) {
      res.status(500).send({ errors: "Something went wrong" });
    }
  }
}

export default new UsersController();
