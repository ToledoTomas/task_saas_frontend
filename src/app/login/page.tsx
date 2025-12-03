"use client";

import LoginForm from "../components/login";
import RegisterForm from "../components/register";

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <LoginForm />
      <RegisterForm />
    </div>
  );
}
