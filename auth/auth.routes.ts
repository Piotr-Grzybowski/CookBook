import authController from "./controllers/auth.controller";
import {
  checkIfCredentialsValid,
  checkIfRefreshTokenIsValid,
  checkIfTokenIsValid,
} from "./middleware/auth.middleware";
import express from "express";
import { validateBody } from "../common/middleware/body.validator.middleware";
import { body } from "express-validator";

const authRouter = express.Router();

authRouter
  .route("/login")
  .post(
    body("email").isEmail(),
    body("password").isString(),
    validateBody,
    checkIfCredentialsValid,
    authController.createJWT
  );

authRouter
  .route("/refresh-token")
  .post(
    checkIfTokenIsValid,
    checkIfRefreshTokenIsValid,
    authController.createJWT
  );

export default authRouter;
