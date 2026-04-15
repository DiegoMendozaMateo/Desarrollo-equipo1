import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import {
  getUserByEmail,
  getUserByTelefono,
  createUser,
} from "@/models/usuarios.model";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nombre, email, numero_empleado, telefono, rol_id, turno } = body;

    // 1. Validaciones básicas
    if (!nombre || !email || !numero_empleado || !rol_id || !telefono) {
      return NextResponse.json(
        { error: "Faltan datos obligatorios: nombre, email, numero_empleado, telefono y rol_id son requeridos" },
        { status: 400 }
      );
    }

    // 2. Verificar duplicados
    const [emailExists, telefonoExists] = await Promise.all([
      getUserByEmail(email),
      getUserByTelefono(telefono),
    ]);

    if (emailExists) {
      return NextResponse.json(
        { error: "El email ya está registrado" },
        { status: 400 }
      );
    }
    if (telefonoExists) {
      return NextResponse.json(
        { error: "El teléfono ya está registrado" },
        { status: 400 }
      );
    }

    // 3. Generar contraseña temporal y hashear
    const tempPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    // 4. Campos extra en datos_adicionales (no existen como columnas en la BD)
    const datos_adicionales = {
      numero_empleado,
      turno: turno ?? null,
      requiere_cambio_password: true,
      activo: true,
    };

    // 5. Crear usuario
    const userId = await createUser(
      nombre,
      Number(telefono),
      email,
      hashedPassword,
      Number(rol_id),
      datos_adicionales
    );

    // 6. Aquí enviarías el email con la contraseña temporal
    console.log(`Email enviado a ${email}. Pass temporal: ${tempPassword}`);

    return NextResponse.json(
      {
        message: "Usuario registrado con éxito",
        userId,
      },
      { status: 201 }
    );

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message ?? "Error interno del servidor" },
      { status: 500 }
    );
  }
}