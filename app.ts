import express from "express";
import * as winston from "winston";
import * as expressWinston from "express-winston";
import cors from "cors";
import debug from "debug";
import helmet from "helmet";
import recipesRouter from "./recipes/recipes.routes";

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
app.use("/recipes", recipesRouter);

export default app;
