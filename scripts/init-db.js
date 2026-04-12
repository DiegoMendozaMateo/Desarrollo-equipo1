const fs = require('fs');
const path = require('path');
require('dotenv').config();
const mysql = require('mysql2/promise');

async function initDB() {
  try {
    // Ruta al archivo SQL
    const schemaPath = path.join(__dirname, './schema.sql');
    const schema = await fs.promises.readFile(schemaPath, 'utf8');

    // Conexión a MariaDB usando variables de entorno
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root',
      port: Number(process.env.DB_PORT) || 3306,
      multipleStatements: true
    });


    // Ejecutar el script SQL
    await connection.query(schema);
    console.log('Base de datos Hospital inicializada correctamente en MariaDB');

    await connection.end();
  } catch (err) {
    console.error('Error al inicializar la base de datos:', err);
    process.exit(1);
  }
}

initDB();
