import jwt from "jsonwebtoken";
import { NextResponse } from "next/server"; 
interface Payload {
  id: number;
  name: string;
  rol_id: number;
  aleatory: number;
}

//roles del hospital
type Rol_id = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export function crearToken(id: number, name: string, rol_id: number): string {
  const payload: Payload = { id, name, rol_id, aleatory: Math.floor(Math.random() * 1000) };
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "24h" });
}

// Retorna null si falla
export function validarToken(token: string | null): Payload | null {
  if (!token) return null;
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as Payload;
  } catch {
    return null;
  }
}

// revisa el token, valida los roles y te devuelve un error o el usuario.
export function requiereRol(req: Request, rolesPermitidos: Rol_id[]) {
  // Extraemos el token del encabezado (headers) de la petición
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.split(" ")[1] || null;

  const payload = validarToken(token);

  // Existe y es valido
  if (!payload) {
    return { 
      error: NextResponse.json({ mensaje: "Acceso no autorizado. Token inválido o expirado." }, { status: 401 }) 
    };
  }

  // su rol está en la lista
  if (!rolesPermitidos.includes(payload.rol_id as Rol_id)) {
    return { 
      error: NextResponse.json({ mensaje: "Acceso prohibido. Tu rol no tiene permisos." }, { status: 403 }) 
    };
  }

  // Si pasa regresa datos del usuario
  return { usuario: payload };
}
