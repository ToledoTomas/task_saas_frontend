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

## 📝 Scripts Disponibles

- `pnpm dev` - Inicia el servidor de desarrollo
- `pnpm build` - Compila la aplicación para producción
- `pnpm start` - Inicia el servidor de producción
- `pnpm lint` - Ejecuta el linter

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
