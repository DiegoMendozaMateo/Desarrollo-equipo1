// components/RegistroUsuario.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Rol {
  id: number;
  nombre: string;
}

interface FormState {
  nombre: string;
  numero_empleado: string;
  email: string;
  telefono: string;
  rol_id: string;
  datos_adicionales: string;
}

interface FormErrors {
  nombre?: string;
  numero_empleado?: string;
  email?: string;
  telefono?: string;
  rol_id?: string;
}

const ROLES: Rol[] = [
  { id: 1, nombre: "Director General" },
  { id: 2, nombre: "Subdirector Administrativo" },
  { id: 3, nombre: "Médico Especialista" },
  { id: 4, nombre: "Personal de Enfermería" },
  { id: 5, nombre: "Responsable de Servicios Generales" },
  { id: 6, nombre: "Personal de Apoyo Clínico" },
  { id: 7, nombre: "Trabajador Social" },
  { id: 8, nombre: "Personal Operativo" },
];

const INITIAL_STATE: FormState = {
  nombre: "",
  numero_empleado: "",
  email: "",
  telefono: "",
  rol_id: "",
  datos_adicionales: "",
};

export default function RegistroUsuario() {
  const router = useRouter();

  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = (): FormErrors => {
    const e: FormErrors = {};

    if (!form.nombre.trim()) e.nombre = "Requerido";

    if (!form.numero_empleado.trim())
      e.numero_empleado = "Requerido";

    if (!form.email.trim()) e.email = "Requerido";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Correo inválido";

    if (!form.telefono.trim()) e.telefono = "Requerido";
    else if (isNaN(Number(form.telefono))) e.telefono = "Solo números";
    else if (form.telefono.length < 10)
      e.telefono = "Mínimo 10 dígitos";

    if (!form.rol_id) e.rol_id = "Selecciona un rol";

    return e;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 409) {
          setErrors({ email: data.error });
        } else {
          setErrors({ email: data.error ?? "Error al registrar usuario" });
        }
        return;
      }

      setSubmitted(true);

      // 🔥 Redirección automática después de 2 segundos
      setTimeout(() => {
        router.push("/login");
      }, 2000);

    } catch {
      setErrors({ email: "No se pudo conectar con el servidor" });
    }
  };

  const handleReset = () => {
    setForm(INITIAL_STATE);
    setErrors({});
    setSubmitted(false);
  };

  // 🎉 Pantalla de éxito
  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-10 max-w-md w-full text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#059669" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <h2 className="text-xl font-semibold text-slate-800">
            Usuario registrado
          </h2>

          <p className="text-slate-500 text-sm">
            Se envió una contraseña temporal al correo de{" "}
            <span className="font-medium text-slate-700">
              {form.email}
            </span>
          </p>

          <p className="text-xs text-slate-400">
            Redirigiendo al login...
          </p>

          <button
            onClick={handleReset}
            className="mt-2 w-full py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Registrar otro usuario
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-slate-800">
              Registro de usuario
            </h1>
            <p className="text-sm text-slate-400">
              Nuevo personal hospitalario
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          <section className="bg-white rounded-2xl border p-6 space-y-4">
            <h2 className="text-sm font-semibold text-slate-500 uppercase">
              Datos de acceso
            </h2>

            <Field label="Nombre completo" error={errors.nombre}>
              <input name="nombre" value={form.nombre} onChange={handleChange} className={inputCls(errors.nombre)} />
            </Field>

            <Field label="Número de empleado" error={errors.numero_empleado}>
              <input name="numero_empleado" value={form.numero_empleado} onChange={handleChange} className={inputCls(errors.numero_empleado)} />
            </Field>

            <Field label="Correo electrónico" error={errors.email}>
              <input type="email" name="email" value={form.email} onChange={handleChange} className={inputCls(errors.email)} />
            </Field>

            <Field label="Teléfono" error={errors.telefono}>
              <input name="telefono" value={form.telefono} onChange={handleChange} className={inputCls(errors.telefono)} />
            </Field>
          </section>

          <section className="bg-white rounded-2xl border p-6 space-y-4">
            <h2 className="text-sm font-semibold text-slate-500 uppercase">
              Rol
            </h2>

            <Field label="Rol" error={errors.rol_id}>
              <select name="rol_id" value={form.rol_id} onChange={handleChange} className={inputCls(errors.rol_id)}>
                <option value="">Seleccionar…</option>
                {ROLES.map((r) => (
                  <option key={r.id} value={r.id}>{r.nombre}</option>
                ))}
              </select>
            </Field>
          </section>

          <section className="bg-white rounded-2xl border p-6 space-y-4">
            <h2 className="text-sm font-semibold text-slate-500 uppercase">
              Información adicional
            </h2>

            <Field label="Notas">
              <textarea
                name="datos_adicionales"
                value={form.datos_adicionales}
                onChange={handleChange}
                rows={4}
                className={inputCls()}
              />
            </Field>
          </section>

          <div className="flex gap-3">
            <button type="button" onClick={handleReset} className="px-5 py-2.5 border rounded-xl">
              Limpiar
            </button>

            <button type="submit" className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white">
              Guardar usuario
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}

function Field({ label, error, children }: any) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between">
        <label className="text-sm font-medium">{label}</label>
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
      {children}
    </div>
  );
}

function inputCls(error?: string) {
  return `w-full px-3 py-2 rounded-xl border ${
    error ? "border-red-300" : "border-slate-200"
  }`;
}