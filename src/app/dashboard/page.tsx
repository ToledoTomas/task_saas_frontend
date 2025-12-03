import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { logoutAction } from "@/services/action";

interface UserData {
  id: number;
  username: string;
  email: string;
  full_name: string;
}

async function getUserData(token: string) {
  const res = await fetch("http://localhost:8000/api/v1/auth/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Token inválido");
  }

  return res.json() as Promise<UserData>;
}

export default async function DashboardPage() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("access_token")?.value;

  if (!token) {
    redirect("/login");
  }

  let user: UserData | null = null;

  try {
    user = await getUserData(token);
  } catch (error) {
    console.error("Error fetching user data:", error);
    redirect("/login");
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Dashboard</h1>

      <div className="bg-white shadow rounded-lg p-6 border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">
          Bienvenido, {user.full_name || user.username} 👋
        </h2>
        <p className="text-gray-600 mt-2">
          Tu email es:{" "}
          <span className="font-mono bg-gray-100 p-1 rounded">
            {user.email}
          </span>
        </p>

        <div className="mt-6 p-4 bg-blue-50 text-blue-800 rounded">
          <p>
            🔐 <strong>Estado del sistema:</strong> Estás autenticado mediante
            una cookie HttpOnly segura. El frontend no puede leerla, pero el
            servidor sí.
          </p>
        </div>
      </div>
      <form action={logoutAction}>
        <button
          type="submit"
          className="bg-red-600 text-white p-2 rounded cursor-pointer m-2"
        >
          Cerrar Sesión
        </button>
      </form>
    </div>
  );
}
