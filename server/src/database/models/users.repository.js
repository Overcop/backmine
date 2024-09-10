import { AbstractRepository } from "./abstract.repository.js";

export class UsersRepository extends AbstractRepository {
    constructor(pool) {
        super('USERS', pool);
    }

    async findByUsername(username) {
        const [rows] = await this.pool.query(`SELECT * FROM ${this.tableName} WHERE username = ?`, [username]);
        return rows[0];
    }
}