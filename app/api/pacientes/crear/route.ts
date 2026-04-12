import { NextRequest, NextResponse } from "next/server";
import {createPaciente} from "@/models/pacientes.model";

export async function POST(req: NextRequest) {
  try {
    const { nombre, edad, genero, direccion, telefono, nombre_representante, telefono_representante } = await req.json();

    if (!nombre || !edad || !genero || !direccion || !telefono) {
      return NextResponse.json(
        { error: "Todos los campos son requeridos" },
        { status: 400 }
      );
    }

    // Validar que el teléfono sea un número    
    if (isNaN(telefono)) {
      return NextResponse.json(
        { error: "El teléfono debe ser un número" },
        { status: 400 }
      );
    }

    // Validar que la edad sea un número
    if (isNaN(edad)) {
      return NextResponse.json(
        { error: "La edad debe ser un número" },
        { status: 400 }
      );
    }

    // Validar que telefono_representante sea un número si se proporciona
    if (telefono_representante && isNaN(telefono_representante)) {
      return NextResponse.json(
        { error: "El teléfono del representante debe ser un número" },
        { status: 400 }
      );
    }

    const id = await createPaciente(nombre, edad, genero, direccion, telefono, nombre_representante, telefono_representante);
    return NextResponse.json(
      { message: "Paciente creado exitosamente", id },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Error al crear paciente" },
      { status: 500 }
    );
  }
}