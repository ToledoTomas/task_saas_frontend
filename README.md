# Task SaaS - Frontend

Aplicación SaaS para gestión de tareas construida con Next.js 16, React 19 y TypeScript.

## 🚀 Inicio Rápido

### Instalación

```bash
pnpm install
```

### Desarrollo

```bash
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Compilación para Producción

```bash
pnpm build
pnpm start
```

## 📁 Estructura del Proyecto

```
task_saas/
├── src/
│   ├── app/              # App Router de Next.js
│   │   ├── layout.tsx    # Layout principal
│   │   ├── page.tsx      # Página de inicio
│   │   └── globals.css   # Estilos globales
│   ├── components/       # Componentes reutilizables
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utilidades y funciones helper
│   │   └── utils.ts      # Función cn() para clases CSS
│   └── types/            # Tipos TypeScript compartidos
├── public/               # Archivos estáticos
└── ...configs            # Archivos de configuración
```

## 🛠️ Stack Tecnológico

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19
- **Lenguaje**: TypeScript
- **Estilos**: Tailwind CSS 4
- **Gestor de Paquetes**: pnpm

## 🔧 Configuración

1. Copia `.env.local.example` a `.env.local`
2. Configura las variables de entorno necesarias

### Autenticación y Backend

La app se integra con un backend (FastAPI) vía cookies httpOnly.

- Variable: `API_URL` (por defecto `http://localhost:8000`)
- Endpoints usados:
  - Registro: `POST ${API_URL}/api/v1/auth/register`
  - Login: `POST ${API_URL}/api/v1/auth/login`
  - Usuario actual: `GET ${API_URL}/api/v1/auth/me`

La autenticación se gestiona en el servidor y el token se guarda en una cookie `access_token`.

Rutas internas de Next.js para verificación:

- `GET /api/auth/me` — obtiene el usuario desde el backend usando el token

Páginas relevantes del App Router:

- `src/app/components/login.tsx` — envía credenciales a `loginAction` y redirige al dashboard
- `src/app/dashboard/page.tsx` — obtiene el usuario con `/api/auth/me`

## 📝 Scripts Disponibles

- `pnpm dev` - Inicia el servidor de desarrollo
- `pnpm build` - Compila la aplicación para producción
- `pnpm start` - Inicia el servidor de producción
- `pnpm lint` - Ejecuta el linter

## 🔐 Flujo de Autenticación

1. Registro

   - El formulario de `register.tsx` envía datos a `registerAction`.
   - Si el registro es exitoso, se realiza un login automático y se guarda `access_token` en cookies.
   - Se redirige a `/dashboard`.

2. Login

   - El formulario de `login.tsx` usa `loginAction`, guarda la cookie y redirige a `/dashboard`.

3. Dashboard
   - `dashboard/page.tsx` consulta `/api/auth/me` para cargar los datos del usuario.

## ▶️ Cómo Probar

1. Levanta el backend en `${API_URL}` (por defecto `http://localhost:8000`).
2. Arranca el frontend:

```bash
pnpm dev
```

3. Registro:

   - Ve a `/register`, completa el formulario.
   - Deberías ser redirigido automáticamente a `/dashboard`.

4. Login:
   - Ve a `/login`, ingresa credenciales válidas.
   - Debe redirigir a `/dashboard`.

Si no redirige, revisa:

- La consola del navegador (logs de "Intentando login/registro")
- Que el backend exponga los endpoints bajo `/api/v1/auth/*`
- Que `API_URL` esté correctamente configurado en `.env.local`

## 🎨 Estilos

Este proyecto usa Tailwind CSS 4. La función helper `cn()` en `src/lib/utils.ts` combina clases de Tailwind de manera eficiente.

```tsx
import { cn } from "@/lib/utils";

<div className={cn("base-class", condition && "conditional-class")} />;
```

## 📦 Alias de Importación

El proyecto está configurado con alias `@/*` para imports absolutos:

```tsx
import { cn } from "@/lib/utils";
import MyComponent from "@/components/MyComponent";
```
