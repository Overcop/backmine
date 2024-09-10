import express, { Router } from "express";
import { resolve } from "path";
import loadRoutes from "./utils/loader/loadRoutes.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import loggerMiddleware from "./middlewares/logger.middleware.js";
import bodyParser from "body-parser";

const app = express();
const apiRouter = Router();

app.use(bodyParser.json());
app.use(loggerMiddleware);

await loadRoutes(apiRouter, resolve("./src/routes"));

app.use("/api", apiRouter);

app.use(errorMiddleware);

export default app;