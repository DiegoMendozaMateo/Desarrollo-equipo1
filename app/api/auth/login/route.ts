import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { crearToken } from "@/lib/auth";
import { Usuario ,getUserByEmail } from "@/models/usuarios.model";

export async function GET(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 }
      );
    }

    const user: Usuario | undefined = await getUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        { mensaje: "Datos inválidas" },
        { status: 401 }
      );
    }

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return NextResponse.json(
        { mensaje: "Contraseña incorrecta" },
        { status: 401 }
      );
    }

    const token = crearToken(user.id, user.nombre, user.rol_id);
    return NextResponse.json({ token });
    } catch {
    return NextResponse.json(
      { error: "Error en el servidor" },
      { status: 500 }
    );
  }
}