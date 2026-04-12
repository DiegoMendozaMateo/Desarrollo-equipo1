import pool from "@/lib/db";

export interface Paciente {
    id: number;
    nombre: string;
    edad: number;
    genero: string;
    direccion: string;
    telefono: number;
    email: string;
    nombre_representante?: string;
    telefono_representante?: number;
    created_at: Date;
}

// Obtener todos los pacientes
export async function getAllPacientes() {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM pacientes");
    conn.release();
    return rows as Paciente[];
}

// Obtener paciente por ID
export async function getPacienteById(id: number) {
    const conn = await pool.getConnection();
    const rows = await conn.query("SELECT * FROM pacientes WHERE id = ?", [id]);
    conn.release();
    return rows[0] as Paciente | undefined;
}

// Crear nuevo paciente
export async function createPaciente(nombre: string, edad: number, genero: string, direccion: string, telefono: number, email: string, nombre_representante?: string, telefono_representante?: number) {
    const conn = await pool.getConnection();
    const [result] = await conn.query(
        "INSERT INTO pacientes (nombre, edad, genero, direccion, telefono, email, nombre_representante, telefono_representante) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        [nombre, edad, genero, direccion, telefono, email, nombre_representante || null, telefono_representante || null]
    );
    conn.release();
    return result.insertId;
}