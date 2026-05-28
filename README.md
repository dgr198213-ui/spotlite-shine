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

La plataforma está optimizada para funcionar en Vercel. Asegúrate de configurar las variables de entorno en el panel de Vercel antes de desplegar.

1. Conecta tu repositorio de GitHub a Vercel.
2. Configura el `Build Command` como `npm run build`.
3. Configura el `Output Directory` como `dist`.
4. Añade todas las variables de entorno requeridas.

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
