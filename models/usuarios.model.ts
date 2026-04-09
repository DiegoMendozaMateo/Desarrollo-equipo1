import pool from "@/lib/db";

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  password: string;
  rol_id: number;
}

// Obtener usuarios por correo electrónico
export async function getUserByEmail(email: string) {
  const conn = await pool.getConnection();
  const rows = await conn.query(
    "SELECT * FROM usuarios WHERE email = ?",
    [email]
  );
  conn.release();
  return rows[0] as Usuario | undefined;
}

// Crear nuevo usuario
export async function createUser(nombre: string, email: string, password: string, rol_id: number) {
  const conn = await pool.getConnection();
  const [result] = await conn.query(
    "INSERT INTO usuarios (nombre, email, password, rol_id) VALUES (?, ?, ?, ?)",
    [nombre, email, password, rol_id]
  );
  conn.release();
  return result.insertId;
}

// Actualizar usuario
export async function updateUser(id: number, email: string, password: string, rol_id: number) {
  const conn = await pool.getConnection();
  await conn.query(
    "UPDATE usuarios SET email = ?, password = ?, rol_id = ? WHERE id = ?",
    [email, password, rol_id, id]
  );
  conn.release();
}

// Eliminar usuario con id o correo electrónico
export async function deleteUser(id?: number, email?: string) {
  const conn = await pool.getConnection();
  await conn.query(
    "DELETE FROM usuarios WHERE id = ? OR email = ?",
    [id, email]
  );
  conn.release();
}