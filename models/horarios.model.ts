import pool from "@/lib/db";

export interface Horario {
  id: number;
  usuario_id: number;
  lunes_entrada: string;
  lunes_salida: string;
  martes_entrada: string;
  martes_salida: string;
  miercoles_entrada: string;
  miercoles_salida: string;
  jueves_entrada: string;
  jueves_salida: string;
  viernes_entrada: string;
  viernes_salida: string;
  sabado_entrada: string;
  sabado_salida: string;
  domingo_entrada: string;
  domingo_salida: string;
}

// Obtener horarios por usuario_id
export async function getHorariosByUsuarioId(usuario_id: number) {
  const conn = await pool.getConnection();
  const rows = await conn.query(
    "SELECT * FROM horarios WHERE usuario_id = ?",
    [usuario_id]
  );
  conn.release();
  return rows as Horario[];
}

// Crear nuevo horario
export async function createHorario(usuario_id: number, lunes_entrada: string, lunes_salida: string, martes_entrada: string, martes_salida: string, miercoles_entrada: string, miercoles_salida: string, jueves_entrada: string, jueves_salida: string, viernes_entrada: string, viernes_salida: string, sabado_entrada: string, sabado_salida: string, domingo_entrada: string, domingo_salida: string) {
  const conn = await pool.getConnection();
  const [result] = await conn.query(
    "INSERT INTO horarios (usuario_id, lunes_entrada, lunes_salida, martes_entrada, martes_salida, miercoles_entrada, miercoles_salida, jueves_entrada, jueves_salida, viernes_entrada, viernes_salida, sabado_entrada, sabado_salida, domingo_entrada, domingo_salida) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [usuario_id, lunes_entrada, lunes_salida, martes_entrada, martes_salida, miercoles_entrada, miercoles_salida, jueves_entrada, jueves_salida, viernes_entrada, viernes_salida, sabado_entrada, sabado_salida, domingo_entrada, domingo_salida]
  );
  conn.release();
  return result.insertId;
}

// Eliminar horarios por usuario_id
export async function deleteHorariosByUsuarioId(usuario_id: number) {
  const conn = await pool.getConnection();
  await conn.query(
    "DELETE FROM horarios WHERE usuario_id = ?",
    [usuario_id]
  );
  conn.release();
}

// Actualizar horario por usuario_id
export async function updateHorario(usuario_id: number, lunes_entrada: string, lunes_salida: string, martes_entrada: string, martes_salida: string, miercoles_entrada: string, miercoles_salida: string, jueves_entrada: string, jueves_salida: string, viernes_entrada: string, viernes_salida: string, sabado_entrada: string, sabado_salida: string, domingo_entrada: string, domingo_salida: string) {
  const conn = await pool.getConnection();
  await conn.query(
    "UPDATE horarios SET lunes_entrada = ?, lunes_salida = ?, martes_entrada = ?, martes_salida = ?, miercoles_entrada = ?, miercoles_salida = ?, jueves_entrada = ?, jueves_salida = ?, viernes_entrada = ?, viernes_salida = ?, sabado_entrada = ?, sabado_salida = ?, domingo_entrada = ?, domingo_salida = ? WHERE usuario_id = ?",
    [lunes_entrada, lunes_salida, martes_entrada, martes_salida, miercoles_entrada, miercoles_salida, jueves_entrada, jueves_salida, viernes_entrada, viernes_salida, sabado_entrada, sabado_salida, domingo_entrada, domingo_salida, usuario_id]
  );
  conn.release();
}