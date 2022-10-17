import * as dotenv from "dotenv";
dotenv.config();
import express from "express";
import * as winston from "winston";
import * as expressWinston from "express-winston";
import cors from "cors";
import helmet from "helmet";
import recipesRouter from "./recipes/recipes.routes";
import authRouter from "./auth/auth.routes";
import userRouter from "./users/users.routes";
import { errorHandler } from "./common/middleware/error.middleware";
import { notFoundHandler } from "./common/middleware/notFound.middleware";

const app: express.Application = express();

app.use(helmet());
app.use(express.json());
app.use(cors());

const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  ),
};

if (!process.env.DEBUG) {
  loggerOptions.meta = false;
}

app.use(expressWinston.logger(loggerOptions));
app.use("/auth", authRouter);
app.use("/recipes", recipesRouter);
app.use("/users", userRouter);
app.use(errorHandler);
app.use(notFoundHandler);

export default app;
