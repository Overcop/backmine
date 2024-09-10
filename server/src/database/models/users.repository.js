import { AbstractRepository } from "./abstract.repository.js";

export class UsersRepository extends AbstractRepository {
    constructor(pool) {
        super('USERS', pool);
    }

    async findByEmail(email) {
        const [rows] = await this.pool.query(`SELECT * FROM ${this.tableName} WHERE email = ?`, [email]);
        return rows[0];
    }
}