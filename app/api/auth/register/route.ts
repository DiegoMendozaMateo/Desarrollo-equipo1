import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import pool from "@/lib/db";

export async function POST(req: NextRequest) {
  try {
    const { nombre, email, password, rol_id } = await req.json();

    if (!nombre || !email || !password || !rol_id) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 }
      );
    }

    const conn = await pool.getConnection();

    // Verificar si el email ya existe
    const existing = await conn.query(
      "SELECT id FROM usuarios WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      conn.release();
      return NextResponse.json(
        { error: "El correo ya está registrado" },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await conn.query(
      "INSERT INTO usuarios (nombre, email, password, rol_id) VALUES (?, ?, ?, ?)",
      [nombre, email, hashedPassword, rol_id]
    );
    conn.release();

    return NextResponse.json(
      { message: "Usuario creado exitosamente" },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Error al crear usuario" },
      { status: 500 }
    );
  }
}