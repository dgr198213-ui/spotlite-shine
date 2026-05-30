# 🎭 Escénika — La Plataforma para Artistas y Eventos

Escénika es una plataforma web moderna diseñada para conectar a artistas talentosos con organizadores de eventos. Nuestra misión es simplificar la contratación artística y ofrecer visibilidad a los talentos locales.

**Tu escenario empieza aquí.**

---

## 🚀 Características Principales

### 🎭 Para Artistas

- **Perfil Profesional:** Crea un perfil detallado con biografía, categorías y precios.
- **Galería Multimedia:** Sube fotos y vídeos (según tu plan) para mostrar tu talento.
- **Gestión de Suscripciones:** Elige entre los planes Spark, Spotlight o Headliner.
- **Sin Comisiones:** Cobra directamente de tus clientes sin intermediarios.

### 📅 Para Organizadores

- **Búsqueda Avanzada:** Encuentra artistas por categoría, ciudad y rango de precios.
- **Favoritos:** Guarda tus artistas preferidos para futuros eventos.
- **Contacto Directo:** Comunícate con los artistas para cerrar contrataciones.

---

## 🛠️ Stack Tecnológico

- **Frontend:** [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Framework:** [TanStack Start](https://tanstack.com/start) (SSR/Hydration)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Backend/Base de Datos:** [Supabase](https://supabase.com/) (Auth, DB, Storage)
- **Pagos:** [Stripe](https://stripe.com/)
- **Despliegue:** [Vercel](https://vercel.com/)

---

## 📁 Estructura del Proyecto

```
├── docs/
│   └── brand/
│       ├── brand-kit.md           # Identidad de marca completa
│       └── estrategia-contenido.md # Estrategia de contenido y redes sociales
├── src/
│   ├── components/               # Componentes React
│   ├── routes/                   # Rutas de la aplicación
│   └── integrations/             # Integraciones (Supabase, Stripe)
├── public/                       # Assets públicos
└── supabase/                     # Migraciones de base de datos
```

---

## 📋 Requisitos Previos

- Node.js 22.x
- Cuenta en Supabase
- Cuenta en Stripe (para pagos)

---

## ⚙️ Configuración Local

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/dgr198213-ui/spotlite-shine.git
   cd spotlite-shine
   ```

2. **Instalar dependencias:**

   ```bash
   npm install
   ```

3. **Variables de Entorno:**
   Crea un archivo `.env.local` basado en `.env.example`:

   ```env
   VITE_SUPABASE_URL=tu_url_supabase
   VITE_SUPABASE_PUBLISHABLE_KEY=tu_anon_key
   VITE_STRIPE_PUBLISHABLE_KEY=tu_stripe_pk
   STRIPE_SECRET_KEY=tu_stripe_sk
   SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
   ```

4. **Iniciar en desarrollo:**
   ```bash
   npm run dev
   ```

---

## 🚢 Despliegue en Vercel

La plataforma está optimizada para funcionar en Vercel con **SSR (Server-Side Rendering)**. Vercel está configurado automáticamente a través de `vercel.json` para manejar las rutas correctamente.

### Pasos para desplegar:

1. Conecta tu repositorio de GitHub a Vercel.
2. Vercel detectará automáticamente `vercel.json` y aplicará la configuración.
3. Añade las variables de entorno requeridas en el panel de Vercel.

### Variables de entorno necesarias:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_SPOTLIGHT_PRICE_ID`
- `STRIPE_HEADLINER_PRICE_ID`

---

## ⚖️ Legal y Privacidad

El proyecto incluye páginas legales completas adaptadas al RGPD:

- [Términos y Condiciones](/terminos)
- [Política de Privacidad](/privacidad)
- [Política de Cookies](/cookies)
- [Aviso Legal](/aviso-legal)

---

## 📞 Soporte

Si tienes alguna duda o sugerencia, puedes contactarnos en:

- **Web:** [escenika.com](https://escenika.com)
- **Email:** hola@escenika.com
- **Redes sociales:** @escenika (todas las plataformas)

---

Hecho con ♥ por el equipo de Escénika.