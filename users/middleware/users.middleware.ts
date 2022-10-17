import { Request, Response, NextFunction } from "express";
import usersService from "../services/users.service";

export async function checkIfEmailAlreadyExist(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = await usersService.getUserByEmailWithPassword(req.body.email);
  if (user) {
    res.status(400).json({ errors: [`Email address already exists`] });
  } else next();
}
