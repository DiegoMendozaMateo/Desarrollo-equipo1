import pool from "@/lib/db";

export const conn = await pool.getConnection();

// Obtener usuarios por correo electrónico
export async function getUserByEmail(email: string) {
  const [rows] = await conn.query(
    "SELECT * FROM usuarios WHERE email = ?",
    [email]
  );
  return rows[0];
}

// Crear nuevo usuario
export async function createUser(nombre: string, email: string, password: string, rol_id: number) {
  const [result] = await conn.query(
    "INSERT INTO usuarios (nombre, email, password, rol_id) VALUES (?, ?, ?, ?)",
    [nombre, email, password, rol_id]
  );
  return result.insertId;
}