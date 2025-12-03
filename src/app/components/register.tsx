"use client";

import { useState } from "react";
import { registerAction } from "@/services/action";

export default function RegisterForm() {
  const [errores, setErrores] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setErrores([]);

    const formData = new FormData(e.currentTarget);

    const res = await registerAction(formData);

    if (res?.success) {
      window.location.href = "/dashboard";
    } else {
      if (Array.isArray(res.message)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setErrores(res.message.map((e: any) => e.msg));
      } else {
        setErrores([res.message || "Error desconocido"]);
      }
      setLoading(false);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
        <h1 className="underline text-2xl font-bold">Crear Cuenta</h1>

        {/* ERRORES */}
        {errores.length > 0 && (
          <div className="bg-red-100 text-red-700 p-3 rounded text-sm">
            {errores.map((error, index) => (
              <p key={index}>• {error}</p>
            ))}
          </div>
        )}

        <div>
          <input
            name="username"
            type="text"
            required
            placeholder="Username"
            className="border p-2"
          />
        </div>

        <div>
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            className="border p-2"
          />
        </div>

        <div>
          <input
            name="password"
            type="password"
            required
            placeholder="Contraseña"
            className="border p-2"
          />
        </div>

        <div>
          <input
            name="full_name"
            type="text"
            placeholder="Nombre Completo (Opcional)"
            className="border p-2"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white p-2 rounded cursor-pointer"
        >
          {loading ? "Registrando..." : "Registrarse"}
        </button>
      </form>
    </div>
  );
}
