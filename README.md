# 🎭 Escénika — La Plataforma para Artistas y Eventos

Escénika es una plataforma web moderna diseñada para conectar a artistas talentosos con organizadores de eventos.

**Tu escenario empieza aquí.**

---

## 🚀 Características Principales

### 🎭 Para Artistas
- **Perfil Profesional:** Crea un perfil detallado con biografía, categorías y precios
- **Galería Multimedia:** Sube fotos y vídeos para mostrar tu talento
- **Gestión de Suscripciones:** Elige entre planes Spark, Spotlight o Headliner
- **Sin Comisiones:** Cobra directamente de tus clientes

### 📅 Para Organizadores
- **Búsqueda Avanzada:** Encuentra artistas por categoría, ciudad y rango de precios
- **Favoritos:** Guarda artistas preferidos para futuros eventos
- **Contacto Directo:** Comunícate directamente con los artistas

---

## 🛠️ Stack Tecnológico

| Componente | Tecnología |
|-----------|------------|
| **Frontend** | React 19 + TypeScript |
| **Framework** | TanStack Start (SSR/Hydration) |
| **Estilos** | Tailwind CSS 4 + shadcn/ui |
| **Backend/BD** | Supabase (Auth, DB, Storage) |
| **Pagos** | Stripe |
| **Despliegue** | Vercel |
| **Analytics** | Vercel Speed Insights |

---

## 📁 Estructura del Proyecto

```
escenika/
├── .github/
│   ├── workflows/
│   │   ├── ci.yml                  # CI/CD Pipeline
│   │   ├── code-quality.yml        # Code Quality & Security
│   │   ├── deploy.yml              # Deploy a Vercel
│   │   ├── dependabot-auto-merge.yml # Auto-merge Dependabot
│   │   ├── cleanup.yml             # Branch cleanup
│   │   └── release.yml             # Release automation
│   └── CODEOWNERS
├── src/
│   ├── components/                 # Componentes React reutilizables
│   ├── routes/                     # Rutas (TanStack Router)
│   ├── integrations/               # Supabase, Stripe, etc
│   ├── lib/                        # Utilities y helpers
│   ├── hooks/                      # Custom React hooks
│   ├── assets/                     # Imágenes, iconos
│   ├── styles.css                  # Estilos globales
│   ├── router.tsx                  # Configuración del router
│   ├── start.ts                    # Entry point de TanStack Start
│   └── server.ts                   # Handler del servidor
├── supabase/
│   └── migrations/                 # Migraciones de BD
├── public/                         # Assets públicos
├── .github/                        # Workflows de GitHub Actions
├── .env.example                    # Template de variables
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vitest.config.ts
├── vercel.json                     # Config de Vercel
├── eslint.config.js                # ESLint config
└── .prettierrc                     # Prettier config
```

---

## 📋 Requisitos Previos

- Node.js 22.13.0+
- npm 10+
- Git

Opcional:
- Cuenta Supabase (Base de datos y autenticación)
- Cuenta Stripe (Pagos)
- Proyecto Vercel (Despliegue)

---

## ⚙️ Configuración Local

### 1. Clonar el repositorio

```bash
git clone https://github.com/dgr198213-ui/spotlite-shine.git
cd spotlite-shine
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env.local
```

Edita `.env.local` con tus valores:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `VITE_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_SECRET_KEY`

### 4. Iniciar servidor de desarrollo

```bash
npm run dev
```

Accede a `http://localhost:5173`

---

## 📜 Scripts Disponibles

```bash
npm run dev              # Servidor de desarrollo
npm run build            # Build para producción
npm run preview          # Preview del build
npm run lint             # Ejecutar ESLint
npm run format           # Formatear código
npm run type-check       # Verificar tipos TypeScript
npm run test             # Ejecutar tests
npm run test:watch       # Tests en modo watch
npm run test:coverage    # Generar coverage report
```

---

## 🚀 Despliegue en Vercel

1. Conecta tu repositorio en Vercel Dashboard
2. Vercel detectará automáticamente la configuración
3. Añade variables de entorno en Settings > Environment Variables
4. Deploy automático en cada push a `main`

---

## 📊 CI/CD Pipeline

El repositorio incluye automatización completa:

- **CI**: Tests, linting y type-check en PRs
- **Code Quality**: Análisis de seguridad
- **Deploy**: Auto-deploy a Vercel
- **Cleanup**: Limpieza de ramas fusionadas
- **Dependabot**: Auto-merge de actualizaciones

---

## 📞 Soporte

- **Web**: [escenika.com](https://escenika.com)
- **Email**: hola@escenika.com
- **Twitter**: [@escenika](https://twitter.com/escenika)

---

Hecho con ♥ por el equipo de Escénika.
