# Desarrollo de Software-Equipo1
### Proyecto de la materia Desarrollo de Software. 
### Equipo 1

## Integrantes
- Sanchez Cortez Luis German(Backend)
- Mendoza Mateo Diego (Backend)
- Gonzales Gomez Abdiel (Backend)
- Herera Machorro Guadalupe  (Frontend)
- Vasquez Aquino Johan Antonio (Frontend)

## Propuesta
### Aplicacion Web de Gestion de un Hospital

## 🛠️ Stack tecnológico

| Capa | Tecnología |
|------|------------|
| Backend / API REST | Node.js|
| Base de datos | MariaDB |
| Diseño de pantallas |  |
| Frontend | |

---

## Estructura 
```
Desarrollo-Equipo1/
├── README.md
├── schema.sql                        ← Script de creación de BD (MariaDB)
├── .env                      ← Plantilla de variables de entorno
├── package.json
├── next.config.ts
├── propuesta/
│   └── screens/                      ← Imágenes exportadas de Stitch
├── README.md                     ← Pantallas y modelo de BD explicados
├── app/
│   ├── layout.tsx                    ← Layout raíz
│   ├── page.tsx                      ← Login / Registro (/)
│   └── api/
│       └─ auth/
│           ├── register/route.ts     ← POST /api/auth/register
│           └── login/route.ts        ← POST /api/auth/login
├── lib/
│   ├── db.js                         ← Pool de conexión a MariaDB
│   └── auth.ts                       ← Helpers JWT
├── models/
│   └── user.model.ts                 ← Queries de usuarios
├── middleware.ts                     ← Verificación JWT (Next.js middleware)
└── public/                           ← Assets estáticos
```
    Se estan verificando rutas

### 




*Proyecto · Desarrollo Web 2026 LGSC*
