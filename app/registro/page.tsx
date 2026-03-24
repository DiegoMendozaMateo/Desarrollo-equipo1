"use client";

import { useState } from "react";

interface Rol {
  id: number;
  nombre: string;
}

interface FormState {
  nombre: string;
  email: string;
  password: string;
  confirmar_password: string;
  rol_id: string;

}

interface FormErrors {
  nombre?: string;
  email?: string;
  password?: string;
  confirmar_password?: string;
  rol_id?: string;

}

// En producción trae estos datos desde tu API / DB
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
  email: "",
  password: "",
  confirmar_password: "",
  rol_id: "",

};

export default function RegistroUsuario() {
  const [form, setForm] = useState<FormState>(INITIAL_STATE);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!form.nombre.trim()) e.nombre = "Requerido";
    if (!form.email.trim()) e.email = "Requerido";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Correo inválido";
    if (!form.password) e.password = "Requerido";
    else if (form.password.length < 8)
      e.password = "Mínimo 8 caracteres";
    if (!form.confirmar_password)
      e.confirmar_password = "Requerido";
    else if (form.password !== form.confirmar_password)
      e.confirmar_password = "Las contraseñas no coinciden";
    if (!form.rol_id) e.rol_id = "Selecciona un rol";
    return e;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors])
      setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    // Aquí conectas con tu API / Server Action
    const { confirmar_password, ...payload } = form;
    console.log("Payload:", payload);
    setSubmitted(true);
  };

  const handleReset = () => {
    setForm(INITIAL_STATE);
    setErrors({});
    setSubmitted(false);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-10 max-w-md w-full text-center space-y-4">
          <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto">
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#059669"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-slate-800">
            Usuario registrado
          </h2>
          <p className="text-slate-500 text-sm">
            El acceso de{" "}
            <span className="font-medium text-slate-700">{form.nombre}</span>{" "}
            fue creado correctamente.
          </p>
          <button
            onClick={handleReset}
            className="mt-2 w-full py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
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
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-slate-800 leading-tight">
              Registro de usuario
            </h1>
            <p className="text-sm text-slate-400">Nuevo personal hospitalario</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Datos de acceso */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
              Datos de acceso
            </h2>

            <Field label="Nombre completo" error={errors.nombre}>
              <input
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                placeholder="Ej. Dr. Carlos Mendoza"
                className={inputCls(errors.nombre)}
              />
            </Field>

            <Field label="Correo electrónico" error={errors.email}>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="correo@hospital.com"
                className={inputCls(errors.email)}
              />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field label="Contraseña" error={errors.password}>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Mínimo 8 caracteres"
                    className={inputCls(errors.password) + " pr-10"}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    tabIndex={-1}
                  >
                    {showPassword ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                        <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                        <line x1="1" y1="1" x2="23" y2="23" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                    )}
                  </button>
                </div>
              </Field>

              <Field label="Confirmar contraseña" error={errors.confirmar_password}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmar_password"
                  value={form.confirmar_password}
                  onChange={handleChange}
                  placeholder="Repite la contraseña"
                  className={inputCls(errors.confirmar_password)}
                />
              </Field>
            </div>
          </section>

          {/* Rol */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 space-y-4">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
              Rol y permisos
            </h2>
            <Field label="Rol asignado" error={errors.rol_id}>
              <select
                name="rol_id"
                value={form.rol_id}
                onChange={handleChange}
                className={inputCls(errors.rol_id)}
              >
                <option value="">Seleccionar rol…</option>
                {ROLES.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.nombre}
                  </option>
                ))}
              </select>
            </Field>
          </section>

          {/* Acciones */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="px-5 py-2.5 rounded-xl border border-slate-200 text-sm font-medium text-slate-600 hover:bg-slate-100 transition-colors"
            >
              Limpiar
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 rounded-xl bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 active:scale-[0.99] transition-all"
            >
              Guardar usuario
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function Field({
  label,
  hint,
  error,
  children,
}: {
  label: string;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline justify-between">
        <label className="text-sm font-medium text-slate-700">{label}</label>
        {hint && <span className="text-xs text-slate-400">{hint}</span>}
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
      {children}
    </div>
  );
}

function inputCls(error?: string): string {
  return [
    "w-full px-3 py-2 rounded-xl border text-sm text-slate-800 bg-white",
    "placeholder:text-slate-300 focus:outline-none focus:ring-2 transition-all",
    error
      ? "border-red-300 focus:ring-red-200"
      : "border-slate-200 focus:ring-blue-100 focus:border-blue-400",
  ].join(" ");
}