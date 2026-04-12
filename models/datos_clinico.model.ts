import pool from "@/lib/db";

export interface DatosClinicos {
  id: number;
  paciente_id: number;
  usuario_id: number;
  fecha_hora: Date;
  sintomas: string;
  altura: number;
  peso: number;
  presion_arterial: string;
  temperatura: number;
  saturacion_oxigeno: number;
  antecedentes?: string;
}

// Obtener datos clínicos por paciente ID
export async function getDatosClinicosByPacienteId(paciente_id: number) {
  const conn = await pool.getConnection();
  const rows = await conn.query(
    "SELECT * FROM datos_clinicos WHERE paciente_id = ? ORDER BY fecha_hora DESC",
    [paciente_id]
  );
  conn.release();
  return rows as DatosClinicos[];
}

// Crear nuevo registro de datos clínicos
export async function createDatosClinicos(paciente_id: number, usuario_id: number, sintomas: string, altura: number, peso: number, presion_arterial: string, temperatura: number, saturacion_oxigeno: number, antecedentes?: string) {
  const conn = await pool.getConnection();
  const [result] = await conn.query(
    "INSERT INTO datos_clinicos (paciente_id, usuario_id, fecha_hora, sintomas, altura, peso, presion_arterial, temperatura, saturacion_oxigeno, antecedentes) VALUES (?, ?, NOW(), ?, ?, ?, ?, ?, ?, ?)",
    [paciente_id, usuario_id, sintomas, altura, peso, presion_arterial, temperatura, saturacion_oxigeno, antecedentes]
  );
  conn.release();
  return result.insertId;
}