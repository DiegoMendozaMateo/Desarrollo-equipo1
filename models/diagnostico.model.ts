import pool from "@/lib/db";

export interface Diagnostico {
  id: number;
  datos_clinicos_id: number;
  diagnostico: string;
  tratamiento: string;
}

// Obtener diagnósticos por ID de datos clínicos
export async function getDiagnosticoByDatosClinicosId(datos_clinicos_id: number) {
  const conn = await pool.getConnection();
  const rows = await conn.query(
    "SELECT * FROM diagnostico WHERE datos_clinicos_id = ?",
    [datos_clinicos_id]
  );
  conn.release();
  return rows as Diagnostico[];
}

// Crear nuevo registro de diagnóstico
export async function createDiagnostico(datos_clinicos_id: number, diagnostico: string, tratamiento: string) {
  const conn = await pool.getConnection();
  const [result] = await conn.query(
    "INSERT INTO diagnostico (datos_clinicos_id, diagnostico, tratamiento, created_at) VALUES (?, ?, ?, NOW())",
    [datos_clinicos_id, diagnostico, tratamiento]
  );
  conn.release();
  return result.insertId;
}