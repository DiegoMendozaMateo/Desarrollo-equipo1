const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

async function initDB() {
  try {
    // Ruta al archivo SQL
    const schemaPath = path.join(__dirname, './schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');

    // Conexión a MariaDB usando variables de entorno
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || '127.0.0.1',
      user: process.env.DB_USER || 'dev_user',
      password: process.env.DB_PASSWORD || 'password123',
      port: Number(process.env.DB_PORT) || 3306,
      multipleStatements: true
    });

    // Ejecutar el script SQL
    await connection.query(schema);
    console.log('✅ Base de datos Hospital inicializada correctamente en MariaDB');

    await connection.end();
  } catch (err) {
    console.error('❌ Error al inicializar la base de datos:', err.message);
    process.exit(1);
  }
}

initDB();
