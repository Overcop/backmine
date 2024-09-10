import express, { Router } from "express";
import { resolve } from "path";
import loadRoutes from "./utils/loadRoutes.js";

const app = express();
const apiRouter = Router();
await loadRoutes(apiRouter, resolve("./src/routes"));

app.use("/api", apiRouter);

export default app;