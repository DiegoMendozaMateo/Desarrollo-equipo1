import pool from  "@/lib/db";

export interface Rol {
  id: number;
  nombre: string;
}

// Obtener todos los roles
export async function getAllRoles() {
  const conn = await pool.getConnection();
  const rows = await conn.query("SELECT * FROM roles");
  conn.release();
  return rows as Rol[];
}

// Obtener rol por ID
export async function getRolById(id: number) {
  const conn = await pool.getConnection();
  const rows = await conn.query("SELECT * FROM roles WHERE id = ?", [id]);
  conn.release();
  return rows[0] as Rol | undefined;
}
