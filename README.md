# Spot&Shows — La Plataforma para Artistas y Eventos

Spot&Shows es una plataforma web moderna diseñada para conectar a artistas talentosos con organizadores de eventos. Nuestra misión es simplificar la contratación artística y ofrecer visibilidad a los talentos locales.

## 🚀 Características Principales

### 🎭 Para Artistas

- **Perfil Profesional:** Crea un perfil detallado con biografía, categorías y precios.
- **Galería Multimedia:** Sube fotos y vídeos (según tu plan) para mostrar tu talento.
- **Gestión de Suscripciones:** Elige entre los planes Spark, Spotlight o Headliner.
- **Sin Comisiones:** Cobra directamente de tus clientes sin intermediarios.

### 📅 Para Organizadores (Promotores)

- **Búsqueda Avanzada:** Encuentra artistas por categoría, ciudad y rango de precios.
- **Favoritos:** Guarda tus artistas preferidos para futuros eventos.
- **Contacto Directo:** Comunícate con los artistas para cerrar contrataciones.

## 🛠️ Stack Tecnológico

- **Frontend:** [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Framework:** [TanStack Start](https://tanstack.com/start) (SSR/Hydration)
- **Estilos:** [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- **Backend/Base de Datos:** [Supabase](https://supabase.com/) (Auth, DB, Storage)
- **Pagos:** [Stripe](https://stripe.com/)
- **Despliegue:** [Vercel](https://vercel.com/)

## 📋 Requisitos Previos

- Node.js 22.x
- Cuenta en Supabase
- Cuenta en Stripe (para pagos)

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

## 🚢 Despliegue en Vercel

La plataforma está optimizada para funcionar en Vercel con **SSR (Server-Side Rendering)**. Vercel está configurado automáticamente a través de `vercel.json` para manejar las rutas correctamente.

### Configuración automática (recomendado)

El archivo `vercel.json` ya está configurado con:
- **Build Command**: `npm run build`
- **Output Directory**: `dist/client` (para assets estáticos)
- **Server Function**: `api/index.ts` (para SSR)
- **Rewrites**: Todas las rutas se redirigen al servidor para SSR

### Pasos para desplegar:

1. Conecta tu repositorio de GitHub a Vercel.
2. Vercel detectará automáticamente `vercel.json` y aplicará la configuración.
3. Asegúrate de añadir todas las variables de entorno requeridas en el panel de Vercel.

### Variables de entorno necesarias:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `STRIPE_SECRET_KEY`
- `STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `STRIPE_PRICE_ID_BASIC`
- `STRIPE_PRICE_ID_PREMIUM`

## ⚖️ Legal y Privacidad

El proyecto incluye páginas legales completas adaptadas al RGPD:

- [Términos y Condiciones](/terminos)
- [Política de Privacidad](/privacidad)
- [Política de Cookies](/cookies)
- [Aviso Legal](/aviso-legal)

## 📞 Soporte

Si tienes alguna duda o sugerencia, puedes contactarnos en:

- Email: [hola@spotandshows.com](mailto:hola@spotandshows.com)
- Web: [spotandshows.com](https://spotandshows.com)

---

Hecho con ♥ por el equipo de Spot&Shows.
