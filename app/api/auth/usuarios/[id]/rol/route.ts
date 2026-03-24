import { NextResponse } from "next/server";
import { requiereRol } from "@/lib/auth";
import prisma from "@/lib/prisma"; // conexión a la BD

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const usuarioIdObjetivo = parseInt(params.id);
    const body = await req.json();
    const { nuevoRolId } = body;

    // ¿Es administrador?
    // Asumimos que Rol 1 (Director) y 2 (Subdirector) son los únicos "Administradores"
    const auth = requiereRol(req, [1, 2]);

    if (auth.error) {
      // Registrar el intento de violación de seguridad
      // Aunque falló, lo guardamos en el log (requiere que el token sea válido al menos para saber quién fue)

      
      return auth.error; 
    }

    const administrador = auth.usuario;

    //  Validar que el usuario objetivo existe
    const usuarioExiste = await prisma.usuario.findUnique({
      where: { id: usuarioIdObjetivo }
    });

    if (!usuarioExiste) {
      return NextResponse.json({ mensaje: "El usuario a modificar no existe." }, { status: 404 });
    }

    // 3. Transacción Segura
    // Usamos $transaction para asegurar que se cambie el rol Y se guarde el log al mismo tiempo.
    const resultado = await prisma.$transaction(async (tx) => {
      
      //  Actualizar el rol en la base de datos
      const usuarioActualizado = await tx.usuario.update({
        where: { id: usuarioIdObjetivo },
        data: { rol_id: nuevoRolId }
      });

      // Registrar en el log de auditoría
      await tx.auditLog.create({
        data: {
          accion: "CAMBIO_DE_ROL",
          descripcion: `Asignación de rol ${nuevoRolId} al usuario: ${usuarioExiste.correo}`,
          usuarioId: administrador.id, // Quién hizo el cambio
        }
      });

      return usuarioActualizado;
    });

    // Finaliza con éxito
    return NextResponse.json({
      mensaje: "Rol actualizado exitosamente",
      datos: { id: resultado.id, nuevoRol: resultado.rol_id }
    });

  } catch (error) {
    return NextResponse.json({ mensaje: "Error interno del servidor" }, { status: 500 });
  }
}