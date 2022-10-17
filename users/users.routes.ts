import express from "express";
import UsersController from "./controllers/users.controller";
import { validateBody } from "../common/middleware/body.validator.middleware";
import { checkIfEmailAlreadyExist } from "./middleware/users.middleware";
import { body } from "express-validator";

const usersRouter = express.Router();

usersRouter
  .route("/register")
  .post(
    body("email").isEmail(),
    body("password")
      .isLength({ min: 5 })
      .withMessage("Must include password (5+ characters)"),
    validateBody,
    checkIfEmailAlreadyExist,
    UsersController.createUser
  );

export default usersRouter;
