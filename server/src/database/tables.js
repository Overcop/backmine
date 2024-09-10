import pool from "./pool.js";
import { UsersRepository } from "./models/users.repository.js";

const table = {};

table.users = new UsersRepository(pool);

export default table;