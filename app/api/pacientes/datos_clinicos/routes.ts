import { NextRequest, NextResponse } from "next/server";
import {createDatosClinicos} from "@/models/datos_clinico.model";

export async function POST(req: NextRequest) {
  try {
    const { paciente_id, usuario_id, sintomas, altura, peso, presion_arterial, temperatura, saturacion_oxigeno, antecedentes } = await req.json();

    if (!paciente_id || !usuario_id || !sintomas || !altura || !peso || !presion_arterial || !temperatura || !saturacion_oxigeno) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 }
      );
    }

    const id = await createDatosClinicos(paciente_id, usuario_id, sintomas, altura, peso, presion_arterial, temperatura, saturacion_oxigeno, antecedentes);
    return NextResponse.json(
      { message: "Datos clínicos registrados exitosamente", id },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Error al registrar datos clínicos" },
      { status: 500 }
    );
  }
}