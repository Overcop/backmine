import { config } from "dotenv";

config();

export const PORT = process.env.PORT || 3000;
export const SECRET = process.env.SECRET || "SECRET";
export const DATABASE = process.env.DATABASE || "DATABASE";
export const DATABASE_HOST = process.env.DATABASE_HOST || "localhost";
export const DATABASE_PORT = process.env.DATABASE_PORT || 3306;
export const DATABASE_USER = process.env.DATABASE_USER || "USER";
export const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || "PASSWORD";