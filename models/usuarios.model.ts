import pool from "@/lib/db";

export interface Usuario {
  id: number;
  nombre: string;
  telefono: number;
  email: string;
  password_hash: string;
  rol_id: number;
  datos_adicionales?: any;
  created_at?: Date;
}

// Obtener usuario por correo electrónico
export async function getUserByEmail(email: string): Promise<Usuario | undefined> {
  const conn = await pool.getConnection();
  try {
    const rows = await conn.query(
      "SELECT * FROM usuarios WHERE email = ?",
      [email]
    );
    return rows[0] as Usuario | undefined;
  } finally {
    conn.release();
  }
}

// Obtener usuario por teléfono
export async function getUserByTelefono(telefono: number): Promise<Usuario | undefined> {
  const conn = await pool.getConnection();
  try {
    const rows = await conn.query(
      "SELECT * FROM usuarios WHERE telefono = ?",
      [telefono]
    );
    return rows[0] as Usuario | undefined;
  } finally {
    conn.release();
  }
}

// Obtener el siguiente ID disponible
async function getNextId(conn: any): Promise<number> {
  const rows = await conn.query("SELECT COALESCE(MAX(id), 0) + 1 AS next_id FROM usuarios");
  return rows[0].next_id as number;
}

// Crear nuevo usuario
export async function createUser(
  nombre: string,
  telefono: number,
  email: string,
  password_hash: string,
  rol_id: number,
  datos_adicionales?: any
): Promise<number> {
  const conn = await pool.getConnection();
  try {
    const id = await getNextId(conn);
    await conn.query(
      "INSERT INTO usuarios (id, nombre, telefono, email, password_hash, rol_id, datos_adicionales) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [id, nombre, telefono, email, password_hash, rol_id, datos_adicionales ? JSON.stringify(datos_adicionales) : null]
    );
    return id;
  } finally {
    conn.release();
  }
}

// Actualizar usuario
export async function updateUser(
  id: number,
  telefono: number,
  email: string,
  password_hash: string,
  rol_id: number,
  datos_adicionales?: any
): Promise<void> {
  const conn = await pool.getConnection();
  try {
    await conn.query(
      "UPDATE usuarios SET telefono = ?, email = ?, password_hash = ?, rol_id = ?, datos_adicionales = ? WHERE id = ?",
      [telefono, email, password_hash, rol_id, datos_adicionales ? JSON.stringify(datos_adicionales) : null, id]
    );
  } finally {
    conn.release();
  }
}

// Eliminar usuario por id o email
export async function deleteUser(id?: number, email?: string): Promise<void> {
  const conn = await pool.getConnection();
  try {
    await conn.query(
      "DELETE FROM usuarios WHERE id = ? OR email = ?",
      [id ?? null, email ?? null]
    );
  } finally {
    conn.release();
  }
}