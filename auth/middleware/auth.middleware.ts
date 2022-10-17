import { Request, Response, NextFunction } from "express";
import usersService from "../../users/services/users.service";
import * as argon2 from "argon2";
import jwt from "jsonwebtoken";
import debug from "debug";
import crypto from "crypto";
import { jwtType } from "../../common/types/jwtType";

const log: debug.IDebugger = debug("app:auth-middleware");
// @ts-expect-error
const jwtSecret: string = process.env.JWT_SECRET;

export async function checkIfCredentialsValid(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user = await usersService.getUserByEmailWithPassword(req.body.email);
  log(user);
  if (user) {
    const passwordHash = user.password;
    if (await argon2.verify(passwordHash, req.body.password)) {
      req.body = {
        userId: user._id,
        email: user.email,
        permissionLevel: user.permissionLevel,
      };
      return next();
    }
  }
  res.status(400).json({ errors: ["Invalid email and/or password"] });
}

export async function checkIfRefreshTokenIsValid(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const user: any = await usersService.getUserByEmailWithPassword(
    res.locals.jwt.email
  );
  const salt = crypto.createSecretKey(
    Buffer.from(res.locals.jwt.refreshKey.data)
  );
  const hash = crypto
    .createHmac("sha512", salt)
    .update(res.locals.jwt.userId + jwtSecret)
    .digest("base64");
  if (hash === req.body.refreshToken) {
    req.body = {
      userId: user._id,
      email: user.email,
      permissionLevel: user.permissionLevel,
    };
    return next();
  } else {
    return res.status(400).send({ errors: ["Invalid refresh token"] });
  }
}

export async function checkIfTokenIsValid(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.headers["authorization"]) {
    try {
      const authorization = req.headers["authorization"].split(" ");
      if (authorization[0] !== "Bearer") {
        return res.status(401).send();
      } else {
        log(res.locals);
        res.locals.jwt = jwt.verify(authorization[1], jwtSecret) as jwtType;
        log(res.locals);
        next();
      }
    } catch (err) {
      return res.status(403).send(err);
    }
  } else {
    return res.status(401).send();
  }
}
