import pool from "./pool.js";
import { UsersRepository } from "./models/users.repository.js";

const tables = {};

tables.users = new UsersRepository(pool);

export default tables;