"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@/services";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("user");
    if (!raw || raw === "undefined") {
      router.push("/login");
      return;
    }
    try {
      const parsed: User = JSON.parse(raw);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(parsed);
    } catch {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      router.push("/login");
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    router.push("/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                ¡Bienvenido, {user.full_name || user.username}!
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Tu email: {user.email}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Cerrar Sesión
            </button>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-6 mt-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Información de Usuario
            </h2>
            <div className="space-y-3">
              <div className="flex items-center">
                <span className="font-medium text-gray-700 dark:text-gray-300 w-32">
                  ID:
                </span>
                <span className="text-gray-900 dark:text-white">{user.id}</span>
              </div>
              <div className="flex items-center">
                <span className="font-medium text-gray-700 dark:text-gray-300 w-32">
                  Username:
                </span>
                <span className="text-gray-900 dark:text-white">
                  {user.username}
                </span>
              </div>
              {user.full_name && (
                <div className="flex items-center">
                  <span className="font-medium text-gray-700 dark:text-gray-300 w-32">
                    Nombre Completo:
                  </span>
                  <span className="text-gray-900 dark:text-white">
                    {user.full_name}
                  </span>
                </div>
              )}
              <div className="flex items-center">
                <span className="font-medium text-gray-700 dark:text-gray-300 w-32">
                  Email:
                </span>
                <span className="text-gray-900 dark:text-white">
                  {user.email}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
