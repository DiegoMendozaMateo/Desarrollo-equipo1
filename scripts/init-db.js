
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

async function initDB() {
  try {
    // Leer el archivo SQL
    const schemaPath = path.join(__dirname, '../sql/hospital_schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    // Conexión a MariaDB
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USER || 'user',
      port: Number(process.env.DB_PORT) || 3306,
      password: process.env.DB_PASSWORD || 'pass', // cámbialo según tu configuración
      multipleStatements: true
    });

    // Ejecutar el script
    await connection.query(schema);
    console.log('✅ Base de datos inicializada correctamente');

    await connection.end();
  } catch (err) {
    console.error('❌ Error al inicializar la base de datos:', err);
    process.exit(1);
  }
}

initDB();
