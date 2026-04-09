import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { crearToken } from "@/lib/auth";
import {getUserByEmail, createUser} from "@/models/usuarios.model";

export async function POST(req: NextRequest) {
  try {
    const { nombre, email, password, rol_id } = await req.json();

    if (!nombre || !email || !password || !rol_id) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 }
      );
    }

    // Verificar si el email ya existe
    const existing = await getUserByEmail(email);
    if (existing) {
      return NextResponse.json(
        { error: "El correo ya está registrado" },
        { status: 409 }
      );
    }

    // Verificar correo electrónico válido
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Correo electrónico no válido" },
        { status: 400 }
      );
    }

    // validar contraseña con 6 caracteres
    if (password.length < 6) {
      return NextResponse.json(
        { error: "La contraseña debe tener al menos 6 caracteres" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await createUser(nombre, email, hashedPassword, rol_id);
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