import jwt from "jsonwebtoken";

interface Payload {
  id: number;
  name: string;
  rol_id: number;
  aleatory: number;
}

type Rol_id = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export function crearToken(id: number, name: string, rol_id: number): string {
  const payload: Payload = { id, name, rol_id, aleatory: Math.floor(Math.random() * 1000) };
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "24h" });
}

export function validarToken(token?: string): Payload {
  if (!token) throw new Error("Acceso denegado");
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as Payload;
    } catch {
    throw new Error("Token inválido o expirado");
  }
}

export function verificarRol(token: string | undefined, rolesPermitidos: Rol_id[]): Payload {
  const payload = validarToken(token);

  if (!rolesPermitidos.includes(payload.rol_id)) {
    throw new Error("No tienes permisos para esta acción");
  }

  return payload;
}

export function requiereRol(...rolesPermitidos: Rol_id[]) {
  return (req: Request, res: Response, next: Function) => {
    try {
      const token = req.headers.get("authorization")?.split(" ")[1];
      const payload = validarToken(token);

      if (!rolesPermitidos.includes(payload.rol_id)) {
        return res.status(403).json({ mensaje: "Acceso prohibido" });
      }

      req.user = payload; // disponible en el siguiente handler
      next();
    } catch (error) {
      res.status(401).json({ mensaje: error.message });
    }
  };
}

// Uso en las rutas:
/*router.get("/admin/dashboard", requiereRol(1), dashboardController);
router.post("/articulos", requiereRol(1, 2), crearArticuloController);*/