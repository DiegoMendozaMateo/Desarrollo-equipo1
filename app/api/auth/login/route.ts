import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // 1. Validar que vengan los datos
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email y contraseña son requeridos" },
        { status: 400 }
      );
    }

    // 2. Buscar al usuario en la base de datos
    // Incluimos el rol para saber qué permisos tendrá
    const usuario = await prisma.usuarios.findUnique({
      where: { email },
      include: { roles: true }
    });

    if (!usuario) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    // 3. Verificar si el usuario está activo
    if (!usuario.activo) {
      return NextResponse.json(
        { error: "Tu cuenta está desactivada. Contacta al administrador." },
        { status: 403 }
      );
    }

    // 4. Comparar la contraseña ingresada con la de la DB
    const passwordMatch = await bcrypt.compare(password, usuario.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { error: "Credenciales inválidas" },
        { status: 401 }
      );
    }

    // 5. Lógica de "Postcondición" (Log de auditoría)
    await prisma.audit_logs.create({
      data: {
        accion: "Inicio de sesión",
        descripcion: `El usuario ${usuario.email} ha ingresado al sistema.`,
        usuario_id: usuario.id,
      },
    });

    // 6. Respuesta exitosa
    // Aquí podrías configurar una cookie o devolver los datos del usuario
    return NextResponse.json({
      message: "Login exitoso",
      user: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.roles.nombre,
        requiere_cambio_password: usuario.requiere_cambio_password
      }
    }, { status: 200 });

  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}