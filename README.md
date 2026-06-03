# Spot&Shows — Tu escenario, tu audiencia, tu momento

La plataforma donde artistas de España encuentran su público y los eventos encuentran talento excepcional. Sin comisiones.

## 🚀 Tecnologías
- **Frontend**: React 19, TanStack Router, TanStack Start, Tailwind CSS 4.
- **Backend/DB**: Supabase (PostgreSQL, Auth, Storage).
- **Pagos**: Stripe Integration.
- **Despliegue**: Vercel.

## ✨ Nuevas Funcionalidades (v2.1)
- **Límites de Medios**: Control dinámico de subidas basado en el plan del artista (Spark, Spotlight, Headliner).
- **Calendario de Disponibilidad**: Nuevo componente visual para que los artistas gestionen sus fechas libres.
- **Diseño Glassmorphism**: Interfaz modernizada con efectos de desenfoque y transparencias.
- **Menú Móvil**: Navegación optimizada para dispositivos táctiles.
- **Salud de DB**: Funciones internas para monitorización del estado de la base de datos.

## 🛠️ Estructura del Proyecto
- `/src/routes`: Definición de rutas y páginas (File-based routing).
- `/src/components`: Componentes reutilizables de la UI (incluye `availability-picker.tsx`).
- `/src/integrations`: Configuraciones de Supabase y Stripe.
- `/src/lib`: Lógica de negocio y utilidades (incluye `media-limits.ts`).
- `/supabase/migrations`: Historial de cambios en la base de datos.

## 📈 Flujo de Trabajo
Consulta nuestra [Guía de Contribución](CONTRIBUTING.md) para ver cómo trabajamos con ramas y commits.

## 💻 Desarrollo Local
1. Instala dependencias: `npm install`
2. Configura variables de entorno: `cp .env.example .env`
3. Inicia el servidor: `npm run dev`
