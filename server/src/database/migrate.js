import mysql from 'mysql2/promise';
import fs from 'fs/promises';
import path from 'path';
import { DATABASE_HOST, DATABASE_USER, DATABASE_PASSWORD, DATABASE } from '../utils/env.js';

const dbConfig = {
  host: DATABASE_HOST,
  user: DATABASE_USER,
  password: DATABASE_PASSWORD,
};

async function migrate() {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('🔌 Connecté à la base de données MySQL');

    const schemaPath = path.join(process.cwd(), 'src/database/schema.sql');
    const schemaSql = await fs.readFile(schemaPath, 'utf8');

    console.log(`🗑️ Suppression de la base de données ${DATABASE} si elle existe...`);
    await connection.query(`DROP DATABASE IF EXISTS ${DATABASE}`);
    console.log(`✅ Base de données ${DATABASE} supprimée (si elle existait)`);

    console.log(`🏗️ Création de la base de données ${DATABASE}...`);
    await connection.query(`CREATE DATABASE ${DATABASE}`);
    console.log(`✅ Base de données ${DATABASE} créée`);

    await connection.query(`USE ${DATABASE}`);
    console.log(`🔀 Utilisation de la base de données ${DATABASE}`);

    console.log('🚀 Exécution des migrations...');
    const sqlStatements = schemaSql.split(';').filter(statement => statement.trim() !== '');
    
    for (const statement of sqlStatements) {
      await connection.query(statement);
    }
    console.log('✅ Migrations terminées avec succès');

  } catch (error) {
    console.error('❌ Erreur lors de la migration:', error);
  } finally {
    if (connection) {
      await connection.end();
      console.log('👋 Connexion à la base de données fermée');
    }
  }
}

migrate();