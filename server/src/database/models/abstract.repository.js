export class AbstractRepository {
    constructor(tableName, pool) {
      this.tableName = tableName;
      this.pool = pool;
    }
  
    async findAll() {
      const [rows] = await this.pool.query(`SELECT * FROM ${this.tableName}`);
      return rows;
    }
  
    async findById(id) {
      const [rows] = await this.pool.query(`SELECT * FROM ${this.tableName} WHERE id = ?`, [id]);
      return rows[0];
    }
  
    async create(data) {
      const columns = Object.keys(data).join(', ');
      const placeholders = Object.keys(data).map(() => '?').join(', ');
      const values = Object.values(data);
  
      const [result] = await this.pool.query(
        `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders})`,
        values
      );
      return result.insertId;
    }
  
    async update(id, data) {
      const setClause = Object.keys(data).map(key => `${key} = ?`).join(', ');
      const values = [...Object.values(data), id];
  
      const [result] = await this.pool.query(
        `UPDATE ${this.tableName} SET ${setClause} WHERE id = ?`,
        values
      );
      return result.affectedRows;
    }
  
    async delete(id) {
      const [result] = await this.pool.query(`DELETE FROM ${this.tableName} WHERE id = ?`, [id]);
      return result.affectedRows;
    }
  }