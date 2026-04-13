import { NextRequest, NextResponse } from "next/server";
import {createDiagnostico} from "@/models/diagnostico.model";

export async function POST(req: NextRequest) {
  try {
    const { datos_clinicos_id, diagnostico, tratamiento } = await req.json();

    if (!datos_clinicos_id || !diagnostico || !tratamiento) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 }
      );
    }

    const id = await createDiagnostico(datos_clinicos_id, diagnostico, tratamiento);
    return NextResponse.json(
      { message: "Diagnóstico registrado exitosamente", id },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Error al registrar diagnóstico" },
      { status: 500 }
    );
  }
}
