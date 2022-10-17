import HttpException from "../HttpException";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  error: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let customError;

  if (!(error instanceof HttpException)) {
    customError = new HttpException(500, "Something went wrong!");
  } else customError = error;

  res.status(customError.statusCode).send({
    errors: customError.message,
  });
};
