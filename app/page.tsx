"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#f0f4f8] flex items-center justify-center p-6 font-['Inter']">

      <div className="w-full max-w-[960px] grid grid-cols-2 rounded-[24px] overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.12)] min-h-[560px]">

        {/* IZQUIERDA */}
        <div className="bg-white p-[48px] flex flex-col justify-between">

          <div className="flex items-center gap-[10px]">
            <div className="w-[36px] h-[36px] bg-[#005db6] rounded-[10px] flex items-center justify-center">
              <span className="material-symbols-outlined text-white text-[20px] [font-variation-settings:'FILL'_1]">
                local_hospital
              </span>
            </div>

            <div>
              <div className="font-['Manrope'] font-extrabold text-[13px] text-[#005db6] leading-[1.2]">
                Sistema de Gestión
              </div>
              <div className="font-['Manrope'] font-extrabold text-[13px] text-[#005db6] leading-[1.2]">
                Hospitalaria (SGH)
              </div>
            </div>
          </div>

          <div>
            <h1 className="font-['Manrope'] font-extrabold text-[38px] leading-[1.15] text-[#1a2a30] mb-[16px]">
              Bienvenid@ al{" "}
              <span className="text-[#005db6]">
                Sistema Hospitalario (SGH)
              </span>
            </h1>

            <p className="text-[#566166] text-[14px] leading-[1.7] mb-[24px]">
              Acceda a la plataforma de gestión clínica más avanzada.
            </p>
          </div>

          <div className="text-[12px] text-[#aab4b8]">
            © 2025 SGH Universidad Tecnológica de la Mixteca.
          </div>

        </div>

        {/* DERECHA */}
        <div className="bg-[#f8fafc] p-[48px] flex flex-col justify-center">

          <h2 className="font-['Manrope'] font-bold text-[26px] text-[#1a2a30] mb-[8px]">
            Iniciar sesión
          </h2>

          <p className="text-[#566166] text-[14px] mb-[32px]">
            Ingrese sus credenciales
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-[18px]">

            {/* Email */}
            <div>
              <label className="block text-[13px] font-semibold text-[#2a3439] mb-[6px]">
                Email
              </label>

              <div className="relative">
                <span className="material-symbols-outlined absolute left-[13px] top-1/2 -translate-y-1/2 text-[#9aa8ae] text-[18px] pointer-events-none">
                  mail
                </span>

                <input
                  type="email"
                  placeholder="ejemplo@hospital.com"
                  className="w-full box-border pl-[42px] pr-[16px] py-[12px] border-[1.5px] border-[#dde3e8] rounded-[10px] bg-white text-[#1a2a30] text-[14px] outline-none font-['Inter'] transition-all focus:border-[#005db6] focus:shadow-[0_0_0_3px_rgba(0,93,182,0.10)]"
                />
              </div>
            </div>

            {/* Password */}
            <div>

              <div className="flex justify-between mb-[6px]">
                <label className="text-[13px] font-semibold text-[#2a3439]">
                  Contraseña
                </label>

                <a href="#" className="text-[12px] text-[#005db6] font-semibold no-underline">
                  ¿Olvidó su contraseña?
                </a>
              </div>

              <div className="relative">

                <span className="material-symbols-outlined absolute left-[13px] top-1/2 -translate-y-1/2 text-[#9aa8ae] text-[18px] pointer-events-none">
                  lock
                </span>

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full box-border pl-[42px] pr-[44px] py-[12px] border-[1.5px] border-[#dde3e8] rounded-[10px] bg-white text-[#1a2a30] text-[14px] outline-none font-['Inter'] transition-all focus:border-[#005db6] focus:shadow-[0_0_0_3px_rgba(0,93,182,0.10)]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-[12px] top-1/2 -translate-y-1/2 bg-none border-none cursor-pointer text-[#9aa8ae] flex items-center p-0"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>

              </div>

            </div>

            {/* Checkbox */}
            <div className="flex items-center gap-[8px]">
              <input
                type="checkbox"
                id="remember"
                className="w-[15px] h-[15px] accent-[#005db6] cursor-pointer"
              />
              <label htmlFor="remember" className="text-[13px] text-[#566166] cursor-pointer">
                Recordar mi sesión
              </label>
            </div>

            {/* Button */}
            <button
              type="submit"
              className="w-full py-[14px] bg-[#005db6] text-white border-none rounded-full font-['Manrope'] font-bold text-[15px] cursor-pointer flex items-center justify-center gap-[8px] shadow-[0_6px_20px_rgba(0,93,182,0.28)] transition-all mt-[4px] hover:bg-[#0051a1]"
            >
              Iniciar sesión
              <span className="material-symbols-outlined text-[18px] [font-variation-settings:'FILL'_1]">
                login
              </span>
            </button>

            <p className="text-center text-[13px] text-[#566166]">
              ¿No tienes cuenta?{" "}
              <a href="/register" className="text-[#005db6] font-bold no-underline">
                Solicitar acceso
              </a>
            </p>

          </form>

        </div>

      </div>

    </div>
  );
}
