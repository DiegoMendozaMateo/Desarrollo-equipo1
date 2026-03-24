"use client";
import { useState } from "react";

// ─── Icons (inline SVG helpers) ──────────────────────────────────────────────
const Icon = ({ d, size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d={d} />
  </svg>
);

const icons = {
  home: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  users: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2 M23 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
  role: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
  area: "M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z M3 9V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v2",
  assign: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2 M9 7a4 4 0 1 0 8 0 4 4 0 0 0-8 0 M22 21v-2a4 4 0 0 0-3-3.87 M16 3.13a4 4 0 0 1 0 7.75",
  patient: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2 M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8z M12 11v4 M10 13h4",
  clinical: "M9 12l2 2 4-4 M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z",
  diagnosis: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z M14 2v6h6 M16 13H8 M16 17H8 M10 9H8",
  logout: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9",
  bell: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9 M13.73 21a2 2 0 0 1-3.46 0",
  chevron: "M9 18l6-6-6-6",
  check: "M20 6L9 17l-5-5",
  plus: "M12 5v14 M5 12h14",
  search: "M21 21l-4.35-4.35 M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z",
  save: "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z M17 21v-8H7v8 M7 3v5h8",
  edit: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7 M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  trash: "M3 6h18 M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",
  pill: "M10.5 20H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.5 M14 4h5.5a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H14 M8 12h8",
};

// ─── Shared Layout ────────────────────────────────────────────────────────────
const navItems = [
  { id: "assign-role", label: "Asignar Rol", icon: "role" },
  { id: "register-area", label: "Dar de alta área", icon: "area" },
  { id: "assign-staff", label: "Asignar personal", icon: "assign" },
  { id: "patient-entry", label: "Ingreso de paciente", icon: "patient" },
  { id: "clinical-data", label: "Datos clínicos", icon: "clinical" },
  { id: "diagnosis", label: "Diagnóstico y tratamiento", icon: "diagnosis" },
];

function Sidebar({ active, onNavigate }) {
  return (
    <aside className="w-64 min-h-screen bg-white border-r border-slate-100 flex flex-col shadow-sm">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-slate-100">
        <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15v-4H7l5-8v4h4l-5 8z" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-bold text-blue-600 leading-tight">Sistema de Gestión</p>
          <p className="text-xs text-blue-500 leading-tight">Hospitalaria (SGH)</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
              active === item.id
                ? "bg-blue-50 text-blue-700 shadow-sm"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
            }`}
          >
            <Icon d={icons[item.icon]} size={17} />
            <span className="text-left leading-snug">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* User */}
      <div className="border-t border-slate-100 px-4 py-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
            AD
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-700 truncate">Administrador</p>
            <p className="text-xs text-slate-400 truncate">admin@sgh.mx</p>
          </div>
          <button className="text-slate-400 hover:text-slate-600">
            <Icon d={icons.logout} size={15} />
          </button>
        </div>
      </div>
    </aside>
  );
}

function TopBar({ title, subtitle }) {
  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-8 shadow-sm">
      <div>
        <h1 className="text-base font-bold text-slate-800">{title}</h1>
        {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-lg hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors">
          <Icon d={icons.bell} size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full" />
        </button>
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
          AD
        </div>
      </div>
    </header>
  );
}

// ─── Input & Select helpers ───────────────────────────────────────────────────
function Field({ label, required, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      {children}
    </div>
  );
}

const inputCls =
  "w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 transition-all";

const btnPrimary =
  "flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow transition-all duration-150 active:scale-95";

const btnSecondary =
  "flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-600 text-sm font-semibold border border-slate-200 transition-all duration-150 active:scale-95";

// ─── Badge ────────────────────────────────────────────────────────────────────
const Badge = ({ color, text }) => {
  const colors = {
    blue: "bg-blue-50 text-blue-700",
    green: "bg-emerald-50 text-emerald-700",
    yellow: "bg-amber-50 text-amber-700",
    red: "bg-red-50 text-red-700",
    purple: "bg-purple-50 text-purple-700",
    slate: "bg-slate-100 text-slate-600",
  };
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colors[color] || colors.slate}`}>
      {text}
    </span>
  );
};

// ─── Card ─────────────────────────────────────────────────────────────────────
function Card({ title, children, action }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      {title && (
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-50">
          <h2 className="text-sm font-bold text-slate-700">{title}</h2>
          {action}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CASO DE USO 3: ASIGNAR ROL
// ═══════════════════════════════════════════════════════════════════════════════
const usuarios = [
  { id: 1, nombre: "Dr. Carlos Méndez", area: "Medicina Interna", rol: "Médico Especialista", email: "c.mendez@sgh.mx" },
  { id: 2, nombre: "Enf. María López", area: "Urgencias", rol: "Personal de Enfermería", email: "m.lopez@sgh.mx" },
  { id: 3, nombre: "Lic. Juan Torres", area: "Administración", rol: "Personal Operativo", email: "j.torres@sgh.mx" },
  { id: 4, nombre: "T.S. Ana Ramos", area: "Trabajo Social", rol: "Trabajador Social", email: "a.ramos@sgh.mx" },
  { id: 5, nombre: "Ing. Pedro Cruz", area: "Sistemas", rol: "Personal de Apoyo Clínico", email: "p.cruz@sgh.mx" },
];

const roles = [
  "Director General",
  "Subdirector Administrativo",
  "Médico Especialista",
  "Personal de Enfermería",
  "Responsable de Servicios Generales",
  "Personal de Apoyo Clínico",
  "Trabajador Social",
  "Personal Operativo",
];

const rolColors = {
  "Médico Especialista": "blue",
  "Personal de Enfermería": "green",
  "Personal Operativo": "slate",
  "Trabajador Social": "purple",
  "Personal de Apoyo Clínico": "yellow",
  "Director General": "red",
  "Subdirector Administrativo": "blue",
  "Responsable de Servicios Generales": "slate",
};

function AsignarRol() {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [newRol, setNewRol] = useState("");
  const [list, setList] = useState(usuarios);
  const [saved, setSaved] = useState(false);

  const filtered = list.filter(
    (u) =>
      u.nombre.toLowerCase().includes(search.toLowerCase()) ||
      u.area.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelect = (u) => {
    setSelected(u);
    setNewRol(u.rol);
    setSaved(false);
  };

  const handleSave = () => {
    setList((prev) => prev.map((u) => (u.id === selected.id ? { ...u, rol: newRol } : u)));
    setSelected((s) => ({ ...s, rol: newRol }));
    setSaved(true);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
        {/* List */}
        <div className="col-span-2">
          <Card
            title="Usuarios del sistema"
            action={
              <div className="relative">
                <Icon d={icons.search} size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 bg-slate-50 focus:outline-none focus:ring-1 focus:ring-blue-200 w-48"
                  placeholder="Buscar usuario..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            }
          >
            <div className="space-y-2">
              {filtered.map((u) => (
                <button
                  key={u.id}
                  onClick={() => handleSelect(u)}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl border transition-all text-left ${
                    selected?.id === u.id
                      ? "border-blue-300 bg-blue-50"
                      : "border-slate-100 hover:border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {u.nombre.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-slate-700">{u.nombre}</p>
                    <p className="text-xs text-slate-400">{u.area} · {u.email}</p>
                  </div>
                  <Badge color={rolColors[u.rol] || "slate"} text={u.rol} />
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Form */}
        <div>
          <Card title="Asignación de rol">
            {selected ? (
              <div className="space-y-5">
                <div className="text-center py-3">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-lg font-bold mx-auto mb-2">
                    {selected.nombre.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                  </div>
                  <p className="font-bold text-slate-700 text-sm">{selected.nombre}</p>
                  <p className="text-xs text-slate-400">{selected.area}</p>
                </div>

                <Field label="Rol actual">
                  <div className="px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-100 text-sm text-slate-500">
                    {selected.rol}
                  </div>
                </Field>

                <Field label="Nuevo rol" required>
                  <select
                    className={inputCls}
                    value={newRol}
                    onChange={(e) => { setNewRol(e.target.value); setSaved(false); }}
                  >
                    {roles.map((r) => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </Field>

                {saved && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 rounded-xl text-emerald-700 text-xs font-semibold">
                    <Icon d={icons.check} size={14} />
                    Rol actualizado correctamente
                  </div>
                )}

                <div className="flex gap-2 pt-1">
                  <button className={btnSecondary} onClick={() => setSelected(null)}>
                    Cancelar
                  </button>
                  <button className={`${btnPrimary} flex-1 justify-center`} onClick={handleSave}>
                    <Icon d={icons.save} size={15} />
                    Guardar
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400">
                <Icon d={icons.users} size={36} className="mx-auto mb-2 opacity-30" />
                <p className="text-sm">Selecciona un usuario para asignar su rol</p>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CASO DE USO 4: DAR DE ALTA ÁREA
// ═══════════════════════════════════════════════════════════════════════════════
const areasInit = [
  { id: 1, nombre: "Urgencias", descripcion: "Atención de emergencias", ubicacion: "Planta baja, ala norte", estado: "Activa" },
  { id: 2, nombre: "Medicina Interna", descripcion: "Hospitalización general", ubicacion: "Piso 2", estado: "Activa" },
  { id: 3, nombre: "Pediatría", descripcion: "Atención pediátrica", ubicacion: "Piso 3", estado: "Activa" },
  { id: 4, nombre: "Rehabilitación", descripcion: "Terapia física y ocupacional", ubicacion: "Piso 1, ala sur", estado: "Inactiva" },
];

function DarDeAltaArea() {
  const [areas, setAreas] = useState(areasInit);
  const [form, setForm] = useState({ nombre: "", descripcion: "", ubicacion: "", estado: "Activa" });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.nombre.trim()) e.nombre = "Campo obligatorio";
    if (!form.ubicacion.trim()) e.ubicacion = "Campo obligatorio";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setAreas((prev) => [...prev, { id: Date.now(), ...form }]);
    setForm({ nombre: "", descripcion: "", ubicacion: "", estado: "Activa" });
    setErrors({});
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Form */}
      <div>
        <Card title="Nueva área hospitalaria">
          <div className="space-y-4">
            <Field label="Nombre del área" required>
              <input
                className={`${inputCls} ${errors.nombre ? "border-red-300 focus:ring-red-200" : ""}`}
                placeholder="Ej. Cardiología"
                value={form.nombre}
                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
              />
              {errors.nombre && <p className="text-xs text-red-500">{errors.nombre}</p>}
            </Field>

            <Field label="Descripción">
              <textarea
                className={`${inputCls} resize-none`}
                rows={3}
                placeholder="Descripción del área..."
                value={form.descripcion}
                onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
              />
            </Field>

            <Field label="Ubicación" required>
              <input
                className={`${inputCls} ${errors.ubicacion ? "border-red-300 focus:ring-red-200" : ""}`}
                placeholder="Ej. Piso 2, ala este"
                value={form.ubicacion}
                onChange={(e) => setForm({ ...form, ubicacion: e.target.value })}
              />
              {errors.ubicacion && <p className="text-xs text-red-500">{errors.ubicacion}</p>}
            </Field>

            <Field label="Estado inicial">
              <select
                className={inputCls}
                value={form.estado}
                onChange={(e) => setForm({ ...form, estado: e.target.value })}
              >
                <option>Activa</option>
                <option>Inactiva</option>
              </select>
            </Field>

            {success && (
              <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 rounded-xl text-emerald-700 text-xs font-semibold">
                <Icon d={icons.check} size={14} />
                Área registrada exitosamente
              </div>
            )}

            <button className={`${btnPrimary} w-full justify-center`} onClick={handleSubmit}>
              <Icon d={icons.plus} size={15} />
              Registrar área
            </button>
          </div>
        </Card>
      </div>

      {/* Table */}
      <div className="col-span-2">
        <Card title={`Áreas registradas (${areas.length})`}>
          <div className="space-y-2">
            {areas.map((a) => (
              <div key={a.id} className="flex items-center gap-4 px-4 py-3 rounded-xl border border-slate-100 hover:border-slate-200 hover:bg-slate-50 transition-all">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 flex-shrink-0">
                  <Icon d={icons.area} size={18} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-700">{a.nombre}</p>
                  <p className="text-xs text-slate-400">{a.ubicacion} · {a.descripcion}</p>
                </div>
                <Badge color={a.estado === "Activa" ? "green" : "slate"} text={a.estado} />
                <div className="flex gap-1">
                  <button className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition-colors">
                    <Icon d={icons.edit} size={14} />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors">
                    <Icon d={icons.trash} size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CASO DE USO 5: ASIGNAR PERSONAL A ÁREA
// ═══════════════════════════════════════════════════════════════════════════════
const personalList = [
  { id: 1, nombre: "Dr. Carlos Méndez", tipo: "Médico Especialista", activo: true, asignado: false },
  { id: 2, nombre: "Enf. María López", tipo: "Personal de Enfermería", activo: true, asignado: true },
  { id: 3, nombre: "T.F. Sofía Herrera", tipo: "Terapeuta Físico", activo: true, asignado: false },
  { id: 4, nombre: "Enf. Roberto Díaz", tipo: "Personal de Enfermería", activo: false, asignado: false },
  { id: 5, nombre: "Dr. Laura Vega", tipo: "Médico General", activo: true, asignado: false },
];

const areasList = ["Urgencias", "Medicina Interna", "Pediatría", "Cardiología", "Rehabilitación"];

function AsignarPersonal() {
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedPersonal, setSelectedPersonal] = useState(null);
  const [asignaciones, setAsignaciones] = useState([
    { personal: "Enf. María López", area: "Urgencias", tipo: "Personal de Enfermería", fecha: "2026-01-15" },
    { personal: "Dr. Ana García", area: "Medicina Interna", tipo: "Médico General", fecha: "2026-02-01" },
  ]);
  const [saved, setSaved] = useState(false);

  const handleAsignar = () => {
    if (!selectedArea || !selectedPersonal) return;
    setAsignaciones((prev) => [
      ...prev,
      {
        personal: selectedPersonal.nombre,
        area: selectedArea,
        tipo: selectedPersonal.tipo,
        fecha: new Date().toISOString().split("T")[0],
      },
    ]);
    setSelectedArea("");
    setSelectedPersonal(null);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="grid grid-cols-3 gap-6">
      {/* Form */}
      <div className="space-y-6">
        <Card title="Nueva asignación">
          <div className="space-y-4">
            <Field label="Área hospitalaria" required>
              <select className={inputCls} value={selectedArea} onChange={(e) => setSelectedArea(e.target.value)}>
                <option value="">Seleccionar área...</option>
                {areasList.map((a) => <option key={a}>{a}</option>)}
              </select>
            </Field>

            <Field label="Personal disponible" required>
              <div className="space-y-2 max-h-52 overflow-y-auto pr-1">
                {personalList.map((p) => (
                  <button
                    key={p.id}
                    disabled={p.asignado || !p.activo}
                    onClick={() => setSelectedPersonal(p)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl border text-left transition-all text-sm ${
                      selectedPersonal?.id === p.id
                        ? "border-blue-300 bg-blue-50"
                        : p.asignado || !p.activo
                        ? "border-slate-100 bg-slate-50 opacity-50 cursor-not-allowed"
                        : "border-slate-200 hover:border-blue-200 hover:bg-blue-50/30"
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      p.activo ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-500"
                    }`}>
                      {p.nombre.split(" ").map((n) => n[0]).slice(0, 2).join("")}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-slate-700 text-xs truncate">{p.nombre}</p>
                      <p className="text-xs text-slate-400 truncate">{p.tipo}</p>
                    </div>
                    {p.asignado && <Badge color="yellow" text="Asignado" />}
                    {!p.activo && <Badge color="slate" text="Inactivo" />}
                  </button>
                ))}
              </div>
            </Field>

            {saved && (
              <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 rounded-xl text-emerald-700 text-xs font-semibold">
                <Icon d={icons.check} size={14} />
                Asignación registrada
              </div>
            )}

            <button
              className={`${btnPrimary} w-full justify-center`}
              onClick={handleAsignar}
              disabled={!selectedArea || !selectedPersonal}
            >
              <Icon d={icons.check} size={15} />
              Confirmar asignación
            </button>
          </div>
        </Card>
      </div>

      {/* Historial */}
      <div className="col-span-2">
        <Card title={`Asignaciones activas (${asignaciones.length})`}>
          <div className="space-y-2">
            {asignaciones.map((a, i) => (
              <div key={i} className="flex items-center gap-4 px-4 py-3 rounded-xl border border-slate-100 hover:bg-slate-50 transition-all">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0">
                  <Icon d={icons.assign} size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-700">{a.personal}</p>
                  <p className="text-xs text-slate-400">{a.tipo}</p>
                </div>
                <div className="text-right">
                  <Badge color="blue" text={a.area} />
                  <p className="text-xs text-slate-400 mt-1">{a.fecha}</p>
                </div>
                <button className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors">
                  <Icon d={icons.trash} size={14} />
                </button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CASO DE USO 6: INGRESO DE PACIENTE
// ═══════════════════════════════════════════════════════════════════════════════
function IngresoPaciente() {
  const [step, setStep] = useState(1);
  const [paciente, setPaciente] = useState({
    nombre: "", apellidos: "", edad: "", genero: "", curp: "", telefono: "", direccion: "", estado: "Activo",
  });
  const [responsable, setResponsable] = useState({ nombre: "", telefono: "" });
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const validateStep1 = () => {
    const e = {};
    if (!paciente.nombre.trim()) e.nombre = "Requerido";
    if (!paciente.apellidos.trim()) e.apellidos = "Requerido";
    if (!paciente.curp.trim()) e.curp = "Requerido";
    return e;
  };

  const handleNext = () => {
    if (step === 1) {
      const e = validateStep1();
      if (Object.keys(e).length) { setErrors(e); return; }
      setErrors({});
    }
    setStep((s) => s + 1);
  };

  const handleSubmit = () => {
    setSuccess(true);
    setStep(3);
  };

  const steps = ["Datos del paciente", "Responsable", "Confirmación"];

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Stepper */}
      <div className="flex items-center gap-0">
        {steps.map((s, i) => (
          <div key={i} className="flex items-center flex-1 last:flex-none">
            <div className={`flex items-center gap-2 ${i + 1 === step ? "text-blue-600" : i + 1 < step ? "text-emerald-600" : "text-slate-400"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                i + 1 < step ? "bg-emerald-500 border-emerald-500 text-white" :
                i + 1 === step ? "border-blue-500 bg-blue-50 text-blue-600" :
                "border-slate-200 bg-white text-slate-400"
              }`}>
                {i + 1 < step ? <Icon d={icons.check} size={14} className="text-white" /> : i + 1}
              </div>
              <span className="text-xs font-semibold whitespace-nowrap">{s}</span>
            </div>
            {i < steps.length - 1 && <div className={`flex-1 h-px mx-3 ${i + 1 < step ? "bg-emerald-300" : "bg-slate-200"}`} />}
          </div>
        ))}
      </div>

      {/* Step 1: Datos paciente */}
      {step === 1 && (
        <Card title="Datos personales del paciente">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Nombre(s)" required>
              <input className={`${inputCls} ${errors.nombre ? "border-red-300" : ""}`} placeholder="Nombre(s)" value={paciente.nombre} onChange={(e) => setPaciente({ ...paciente, nombre: e.target.value })} />
              {errors.nombre && <p className="text-xs text-red-500">{errors.nombre}</p>}
            </Field>
            <Field label="Apellidos" required>
              <input className={`${inputCls} ${errors.apellidos ? "border-red-300" : ""}`} placeholder="Apellidos" value={paciente.apellidos} onChange={(e) => setPaciente({ ...paciente, apellidos: e.target.value })} />
              {errors.apellidos && <p className="text-xs text-red-500">{errors.apellidos}</p>}
            </Field>
            <Field label="CURP" required>
              <input className={`${inputCls} ${errors.curp ? "border-red-300" : ""}`} placeholder="CURP" value={paciente.curp} onChange={(e) => setPaciente({ ...paciente, curp: e.target.value })} />
              {errors.curp && <p className="text-xs text-red-500">{errors.curp}</p>}
            </Field>
            <Field label="Edad">
              <input className={inputCls} type="number" placeholder="Edad" value={paciente.edad} onChange={(e) => setPaciente({ ...paciente, edad: e.target.value })} />
            </Field>
            <Field label="Género">
              <select className={inputCls} value={paciente.genero} onChange={(e) => setPaciente({ ...paciente, genero: e.target.value })}>
                <option value="">Seleccionar...</option>
                <option>Masculino</option>
                <option>Femenino</option>
                <option>Otro</option>
              </select>
            </Field>
            <Field label="Teléfono">
              <input className={inputCls} placeholder="10 dígitos" value={paciente.telefono} onChange={(e) => setPaciente({ ...paciente, telefono: e.target.value })} />
            </Field>
            <div className="col-span-2">
              <Field label="Dirección">
                <input className={inputCls} placeholder="Calle, número, colonia, municipio" value={paciente.direccion} onChange={(e) => setPaciente({ ...paciente, direccion: e.target.value })} />
              </Field>
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <button className={btnPrimary} onClick={handleNext}>
              Siguiente <Icon d={icons.chevron} size={15} />
            </button>
          </div>
        </Card>
      )}

      {/* Step 2: Responsable */}
      {step === 2 && (
        <Card title="Datos del responsable / tutor">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Field label="Nombre completo del responsable">
                <input className={inputCls} placeholder="Nombre del responsable o tutor" value={responsable.nombre} onChange={(e) => setResponsable({ ...responsable, nombre: e.target.value })} />
              </Field>
            </div>
            <Field label="Teléfono de contacto">
              <input className={inputCls} placeholder="10 dígitos" value={responsable.telefono} onChange={(e) => setResponsable({ ...responsable, telefono: e.target.value })} />
            </Field>
          </div>
          <div className="flex justify-between pt-4">
            <button className={btnSecondary} onClick={() => setStep(1)}>Atrás</button>
            <button className={btnPrimary} onClick={handleSubmit}>
              <Icon d={icons.check} size={15} /> Registrar ingreso
            </button>
          </div>
        </Card>
      )}

      {/* Step 3: Confirmación */}
      {step === 3 && (
        <Card>
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto">
              <Icon d={icons.check} size={32} className="text-emerald-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-lg">Ingreso registrado exitosamente</h3>
              <p className="text-sm text-slate-500 mt-1">Se ha creado el expediente y la consulta inicial.</p>
            </div>
            <div className="bg-slate-50 rounded-xl p-4 text-left space-y-2">
              <div className="flex justify-between text-sm"><span className="text-slate-500">Paciente:</span><span className="font-semibold text-slate-700">{paciente.nombre} {paciente.apellidos}</span></div>
              <div className="flex justify-between text-sm"><span className="text-slate-500">CURP:</span><span className="font-semibold text-slate-700">{paciente.curp || "—"}</span></div>
              <div className="flex justify-between text-sm"><span className="text-slate-500">N° Expediente:</span><span className="font-semibold text-blue-600">EXP-{Date.now().toString().slice(-6)}</span></div>
            </div>
            <button className={`${btnPrimary} mx-auto`} onClick={() => { setStep(1); setPaciente({ nombre: "", apellidos: "", edad: "", genero: "", curp: "", telefono: "", direccion: "", estado: "Activo" }); setResponsable({ nombre: "", telefono: "" }); }}>
              <Icon d={icons.plus} size={15} /> Nuevo ingreso
            </button>
          </div>
        </Card>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CASO DE USO 7: REGISTRAR DATOS CLÍNICOS
// ═══════════════════════════════════════════════════════════════════════════════
function DatosClinicos() {
  const [expediente, setExpediente] = useState("");
  const [pacienteEncontrado, setPacienteEncontrado] = useState(null);
  const [datos, setDatos] = useState({
    temperatura: "", presionSistolica: "", presionDiastolica: "", frecuenciaCardiaca: "", frecuenciaRespiratoria: "", peso: "", talla: "", saturacion: "", sintomas: "", antecedentes: "",
  });
  const [saved, setSaved] = useState(false);

  const buscarPaciente = () => {
    setPacienteEncontrado({ nombre: "Juan García Pérez", edad: 45, curp: "GAPJ790315HDFRCN01", expediente });
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Buscar expediente */}
      <Card title="Buscar expediente del paciente">
        <div className="flex gap-3">
          <input
            className={`${inputCls} flex-1`}
            placeholder="Número de expediente o CURP..."
            value={expediente}
            onChange={(e) => setExpediente(e.target.value)}
          />
          <button className={btnPrimary} onClick={buscarPaciente}>
            <Icon d={icons.search} size={15} /> Buscar
          </button>
        </div>
        {pacienteEncontrado && (
          <div className="mt-4 flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
              {pacienteEncontrado.nombre.split(" ").map((n) => n[0]).slice(0, 2).join("")}
            </div>
            <div>
              <p className="font-bold text-slate-700">{pacienteEncontrado.nombre}</p>
              <p className="text-xs text-slate-500">{pacienteEncontrado.edad} años · {pacienteEncontrado.curp}</p>
            </div>
            <div className="ml-auto">
              <Badge color="green" text="Paciente activo" />
            </div>
          </div>
        )}
      </Card>

      {pacienteEncontrado && (
        <div className="grid grid-cols-3 gap-6">
          {/* Signos vitales */}
          <div className="col-span-2 space-y-6">
            <Card title="Signos vitales">
              <div className="grid grid-cols-4 gap-4">
                {[
                  { key: "temperatura", label: "Temperatura (°C)", placeholder: "37.0" },
                  { key: "presionSistolica", label: "Presión sistólica", placeholder: "120" },
                  { key: "presionDiastolica", label: "Presión diastólica", placeholder: "80" },
                  { key: "frecuenciaCardiaca", label: "Frec. cardíaca (lpm)", placeholder: "72" },
                  { key: "frecuenciaRespiratoria", label: "Frec. respiratoria", placeholder: "16" },
                  { key: "peso", label: "Peso (kg)", placeholder: "70" },
                  { key: "talla", label: "Talla (cm)", placeholder: "170" },
                  { key: "saturacion", label: "Saturación O₂ (%)", placeholder: "98" },
                ].map(({ key, label, placeholder }) => (
                  <Field key={key} label={label}>
                    <input
                      className={inputCls}
                      type="number"
                      placeholder={placeholder}
                      value={datos[key]}
                      onChange={(e) => setDatos({ ...datos, [key]: e.target.value })}
                    />
                  </Field>
                ))}
              </div>
            </Card>

            <Card title="Síntomas y antecedentes">
              <div className="grid grid-cols-2 gap-4">
                <Field label="Síntomas actuales">
                  <textarea
                    className={`${inputCls} resize-none`}
                    rows={4}
                    placeholder="Describe los síntomas reportados..."
                    value={datos.sintomas}
                    onChange={(e) => setDatos({ ...datos, sintomas: e.target.value })}
                  />
                </Field>
                <Field label="Antecedentes médicos">
                  <textarea
                    className={`${inputCls} resize-none`}
                    rows={4}
                    placeholder="Alergias, enfermedades previas, medicamentos..."
                    value={datos.antecedentes}
                    onChange={(e) => setDatos({ ...datos, antecedentes: e.target.value })}
                  />
                </Field>
              </div>
            </Card>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <Card title="Validación de datos">
              <div className="space-y-3">
                {[
                  { label: "Signos vitales", ok: Object.values(datos).slice(0, 8).some(Boolean) },
                  { label: "Síntomas registrados", ok: datos.sintomas.trim().length > 0 },
                  { label: "Datos obligatorios", ok: datos.temperatura && datos.presionSistolica },
                ].map(({ label, ok }) => (
                  <div key={label} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold ${ok ? "bg-emerald-50 text-emerald-700" : "bg-slate-50 text-slate-500"}`}>
                    <Icon d={ok ? icons.check : icons.plus} size={14} className={ok ? "text-emerald-600" : "text-slate-400 rotate-45"} />
                    {label}
                  </div>
                ))}

                {saved && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 rounded-xl text-emerald-700 text-xs font-semibold mt-2">
                    <Icon d={icons.check} size={14} />
                    Datos guardados
                  </div>
                )}

                <button className={`${btnPrimary} w-full justify-center mt-2`} onClick={handleSave}>
                  <Icon d={icons.save} size={15} />
                  Guardar datos clínicos
                </button>
              </div>
            </Card>

            <Card title="Prueba diagnóstica">
              <div className="space-y-3">
                <Field label="Tipo de prueba">
                  <select className={inputCls}>
                    <option value="">Seleccionar...</option>
                    <option>Laboratorio</option>
                    <option>Radiografía</option>
                    <option>Ultrasonido</option>
                    <option>Electrocardiograma</option>
                    <option>Tomografía</option>
                  </select>
                </Field>
                <Field label="Fecha programada">
                  <input type="date" className={inputCls} />
                </Field>
                <button className={`${btnSecondary} w-full justify-center`}>
                  <Icon d={icons.plus} size={14} /> Programar prueba
                </button>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CASO DE USO 8: REGISTRAR DIAGNÓSTICO Y TRATAMIENTO
// ═══════════════════════════════════════════════════════════════════════════════
function DiagnosticoTratamiento() {
  const [expediente, setExpediente] = useState("");
  const [paciente, setPaciente] = useState(null);
  const [diagnostico, setDiagnostico] = useState({ descripcion: "", fecha: new Date().toISOString().split("T")[0] });
  const [medicamentos, setMedicamentos] = useState([{ nombre: "", dosis: "", frecuencia: "", tipo: "Oral" }]);
  const [saved, setSaved] = useState(false);

  const addMed = () => setMedicamentos((m) => [...m, { nombre: "", dosis: "", frecuencia: "", tipo: "Oral" }]);
  const removeMed = (i) => setMedicamentos((m) => m.filter((_, idx) => idx !== i));
  const updateMed = (i, field, val) =>
    setMedicamentos((m) => m.map((med, idx) => (idx === i ? { ...med, [field]: val } : med)));

  const buscar = () => setPaciente({ nombre: "María Sánchez Torres", edad: 38, expediente, dx: "Hipertensión arterial (previo)" });

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 3000); };

  return (
    <div className="space-y-6">
      {/* Buscar */}
      <Card title="Abrir expediente del paciente">
        <div className="flex gap-3">
          <input
            className={`${inputCls} flex-1`}
            placeholder="Número de expediente..."
            value={expediente}
            onChange={(e) => setExpediente(e.target.value)}
          />
          <button className={btnPrimary} onClick={buscar}>
            <Icon d={icons.search} size={15} /> Abrir expediente
          </button>
        </div>
        {paciente && (
          <div className="mt-4 flex items-center gap-4 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
              {paciente.nombre.split(" ").map((n) => n[0]).slice(0, 2).join("")}
            </div>
            <div>
              <p className="font-bold text-slate-700">{paciente.nombre}</p>
              <p className="text-xs text-slate-500">{paciente.edad} años · {paciente.dx}</p>
            </div>
          </div>
        )}
      </Card>

      {paciente && (
        <div className="grid grid-cols-2 gap-6">
          {/* Diagnóstico */}
          <Card title="Diagnóstico">
            <div className="space-y-4">
              <Field label="Fecha del diagnóstico">
                <input type="date" className={inputCls} value={diagnostico.fecha} onChange={(e) => setDiagnostico({ ...diagnostico, fecha: e.target.value })} />
              </Field>
              <Field label="Descripción del diagnóstico" required>
                <textarea
                  className={`${inputCls} resize-none`}
                  rows={5}
                  placeholder="Describe el diagnóstico clínico detalladamente..."
                  value={diagnostico.descripcion}
                  onChange={(e) => setDiagnostico({ ...diagnostico, descripcion: e.target.value })}
                />
              </Field>
              <Field label="CIE-10 (opcional)">
                <input className={inputCls} placeholder="Ej. I10 – Hipertensión esencial" />
              </Field>
            </div>
          </Card>

          {/* Tratamiento */}
          <Card
            title="Medicamentos / Tratamiento"
            action={
              <button className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700" onClick={addMed}>
                <Icon d={icons.plus} size={13} /> Agregar
              </button>
            }
          >
            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {medicamentos.map((m, i) => (
                <div key={i} className="p-3 rounded-xl border border-slate-100 bg-slate-50 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500">
                      <Icon d={icons.pill} size={13} className="text-blue-500" />
                      Medicamento {i + 1}
                    </div>
                    {medicamentos.length > 1 && (
                      <button onClick={() => removeMed(i)} className="text-slate-400 hover:text-red-500">
                        <Icon d={icons.trash} size={13} />
                      </button>
                    )}
                  </div>
                  <input className={inputCls} placeholder="Nombre del medicamento" value={m.nombre} onChange={(e) => updateMed(i, "nombre", e.target.value)} />
                  <div className="grid grid-cols-3 gap-2">
                    <input className={inputCls} placeholder="Dosis" value={m.dosis} onChange={(e) => updateMed(i, "dosis", e.target.value)} />
                    <input className={inputCls} placeholder="Frecuencia" value={m.frecuencia} onChange={(e) => updateMed(i, "frecuencia", e.target.value)} />
                    <select className={inputCls} value={m.tipo} onChange={(e) => updateMed(i, "tipo", e.target.value)}>
                      <option>Oral</option>
                      <option>Inyectable</option>
                      <option>Tópico</option>
                      <option>Inhalado</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {paciente && (
        <div className="flex justify-between items-center">
          {saved ? (
            <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-xl text-emerald-700 text-sm font-semibold">
              <Icon d={icons.check} size={16} />
              Diagnóstico y tratamiento guardados. Impresión generada.
            </div>
          ) : <div />}
          <div className="flex gap-3">
            <button className={btnSecondary}>Cancelar</button>
            <button className={btnPrimary} onClick={handleSave}>
              <Icon d={icons.save} size={15} />
              Guardar y generar impresión
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// ROOT APP
// ═══════════════════════════════════════════════════════════════════════════════
const pageConfig = {
  "assign-role": { title: "Asignar Rol", subtitle: "Gestión de roles del sistema", component: AsignarRol },
  "register-area": { title: "Dar de alta área", subtitle: "Registro de áreas hospitalarias", component: DarDeAltaArea },
  "assign-staff": { title: "Asignar personal a área", subtitle: "Asignación de personal", component: AsignarPersonal },
  "patient-entry": { title: "Ingreso de paciente", subtitle: "Registro de nuevos pacientes", component: IngresoPaciente },
  "clinical-data": { title: "Registrar datos clínicos", subtitle: "Consulta médica activa", component: DatosClinicos },
  "diagnosis": { title: "Diagnóstico y tratamiento", subtitle: "Registro de diagnóstico", component: DiagnosticoTratamiento },
};

export default function SGHInterfaces() {
  const [activePage, setActivePage] = useState("assign-role");
  const config = pageConfig[activePage];
  const PageComponent = config.component;

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      <Sidebar active={activePage} onNavigate={setActivePage} />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar title={config.title} subtitle={config.subtitle} />
        <main className="flex-1 p-8 overflow-auto">
          <PageComponent />
        </main>
        <footer className="px-8 py-3 border-t border-slate-100 bg-white">
          <p className="text-xs text-slate-400">© 2024 Sanctuary Clinical · Sistema de Gestión Hospitalaria (SGH) · Todos los derechos reservados</p>
        </footer>
      </div>
    </div>
  );
}
