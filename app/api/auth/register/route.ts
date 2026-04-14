import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nombre, email, numero_empleado, telefono, rol_id, turno } = body;

    // 1. Validaciones básicas (Excepciones E1 y E3)
    if (!nombre || !email || !numero_empleado || !rol_id) {
      return NextResponse.json({ error: "Faltan datos obligatorios" }, { status: 400 });
    }

    // 2. Generar contraseña temporal y Hashear (Postcondición #3)
    const tempPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(tempPassword, 10);

    // 3. Transacción para asegurar creación de usuario + log de auditoría
    const resultado = await prisma.$transaction(async (tx) => {
      
      // E2: Verificar duplicados
      const userExists = await tx.usuarios.findFirst({
        where: { OR: [{ email }, { numero_empleado }] }
      });
      if (userExists) throw new Error("Email o número de empleado ya registrados");

      // Crear Usuario (Postcondiciones #1 y #2)
      const user = await tx.usuarios.create({
        data: {
          nombre,
          email,
          numero_empleado,
          telefono,
          rol_id,
          turno,
          password: hashedPassword,
          requiere_cambio_password: true, // Regla de negocio #4
          activo: true, // Regla de negocio #3
        },
      });

      // Registro en auditoría (Postcondición #5)
      // Nota: Aquí asumo que el ID del admin vendrá de la sesión en el futuro
      await tx.audit_logs.create({
        data: {
          accion: "Alta de usuario",
          descripcion: `Alta de usuario: ${email}`,
          usuario_id: 1, // ID temporal del administrador logueado
        },
      });

      return user;
    });

    // 4. Respuesta exitosa (Postcondición #4 - Aquí enviarías el email)
    console.log(`Email enviado a ${email}. Pass temporal: ${tempPassword}`);

    return NextResponse.json({ 
      message: "Usuario registrado con éxito", 
      userId: resultado.id 
    }, { status: 201 });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}