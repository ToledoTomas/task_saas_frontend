"use client";
import { useState } from "react";
import { loginAction } from "@/services/action";

export default function LoginForm() {
  const [errores, setErrores] = useState<string[]>([]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrores([]);

    const formData = new FormData(e.currentTarget);

    console.log("Intentando login...");
    const res = await loginAction(formData);

    console.log("Respuesta del login:", res);

    if (res?.success) {
      console.log("Login exitoso, redirigiendo...");
      window.location.href = "/dashboard";
    } else {
      console.log("Login falló:", res?.message);
      if (Array.isArray(res.message)) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setErrores(res.message.map((e: any) => e.msg));
      } else {
        setErrores([res.message || "Error desconocido"]);
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
      <h1 className="underline text-2xl font-bold">Login</h1>
      <input
        name="email"
        type="email"
        placeholder="Email"
        required
        className="border p-2"
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        required
        className="border p-2"
      />

      {errores.length > 0 && (
        <div className="text-red-500 text-sm">
          {errores.map((e) => (
            <p key={e}>{e}</p>
          ))}
        </div>
      )}

      <button
        type="submit"
        className="bg-blue-600 text-white p-2 rounded cursor-pointer"
      >
        Ingresar
      </button>
    </form>
  );
}
