import * as mariadb from "mariadb";

const pool = mariadb.createPool({
  host:     process.env.DB_HOST     || "127.0.0.1",
  port:     Number(process.env.DB_PORT) || 3306,
  user:     process.env.DB_USER     || "dev_user",
  password: process.env.DB_PASSWORD || "password123",
  database: process.env.DB_NAME     || "Hospital",
  connectionLimit: 5,
  connectTimeout:  10000,
});

export default pool;