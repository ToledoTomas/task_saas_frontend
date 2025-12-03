"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  full_name?: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  full_name: string | null;
}

export interface Token {
  access_token: string;
  token_type: string;
}

export interface LoginResponse {
  user: User;
  access_token: string;
  token_type: string;
}

const API_URL = process.env.API_URL || "http://localhost:8000";

export async function loginAction(formData: FormData) {
  const rawData: LoginCredentials = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  try {
    const res = await fetch(`${API_URL}/api/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(rawData),
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json();
      return {
        success: false,
        message: errorData.detail || "Error al iniciar sesión",
      };
    }

    const data: LoginResponse = await res.json();

    const cookieStore = cookies();
    const oneWeek = 7 * 24 * 60 * 60;

    (await cookieStore).set("access_token", data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: oneWeek,
      path: "/",
    });

    return { success: true, user: data.user };
  } catch (error) {
    console.error("Error en login:", error);
    return { success: false, message: "Error en el servidor" };
  }
}

export async function logoutAction() {
  (await cookies()).delete("access_token");
  redirect("/login");
}

export async function registerAction(formData: FormData) {
  const rawData: RegisterData = {
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    full_name: (formData.get("full_name") as string) || undefined,
  };
  try {
    // 2. Llamamos al endpoint de registro
    const res = await fetch(`${API_URL}/api/v1/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rawData),
      cache: "no-store",
    });

    if (!res.ok) {
      const errorData = await res.json();
      // Devolvemos el error para que el frontend lo pinte
      return {
        success: false,
        message: errorData.detail || "Error al registrar usuario",
      };
    }

    // 3. Registro exitoso, ahora hacemos login automático
    await res.json(); // Consumimos la respuesta del registro

    // 4. Hacemos login con las mismas credenciales
    const loginRes = await fetch(`${API_URL}/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: rawData.email,
        password: rawData.password,
      }),
      cache: "no-store",
    });

    if (!loginRes.ok) {
      return {
        success: false,
        message:
          "Registro exitoso pero falló el login automático. Por favor inicia sesión.",
      };
    }

    const loginData: LoginResponse = await loginRes.json();

    const cookieStore = cookies();
    const oneWeek = 7 * 24 * 60 * 60;

    (await cookieStore).set("access_token", loginData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: oneWeek,
      path: "/",
    });

    return { success: true, user: loginData.user };
  } catch (error) {
    console.error("Error en registro:", error);
    return { success: false, message: "Error de conexión con el servidor" };
  }
}
