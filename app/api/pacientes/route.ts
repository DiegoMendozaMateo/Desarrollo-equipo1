import { NextRequest, NextResponse } from "next/server";
import {getAllPacientes} from "@/models/pacientes.model";

export async function GET(req: NextRequest) {
  try {
    const pacientes = await getAllPacientes();
    return NextResponse.json(pacientes);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al obtener pacientes" },
      { status: 500 }
    );
  }
}