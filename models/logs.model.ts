import pool from "@/lib/db";

export async function createLog(usuario_id: number, accion: string) {
    const conn = await pool.getConnection();
    await conn.query(
        "INSERT INTO logs (usuario_id, accion, fecha_hora) VALUES (?, ?, NOW())",
        [usuario_id, accion]
    );
    conn.release();
    return true;
}