# TUESDI — La Plataforma para Artistas y Eventos

**TUESDI** es una plataforma web moderna diseñada para conectar artistas talentosos con su audiencia y oportunidades de actuación. Nuestra misión es simplificar la visibilidad artística, permitir la publicación gratuita de eventos y ofrecer un espacio sin comisiones donde el talento prospera.

## 🎯 Visión

TUESDI democratiza el acceso a oportunidades artísticas. Los artistas pueden mostrar su talento sin barreras, los eventos se publican de forma gratuita para atraer talento, y todo sucede sin intermediarios ni comisiones.

## 🚀 Características Principales

### 🎭 Para Artistas

- **Perfil Profesional Gratuito:** Crea un perfil detallado con biografía, categoría, ciudad y precio desde.
- **Galería Multimedia:**
  - **Plan beta Free (0€/mes):** 1 foto
  - **Próximamente-Plan Standard (6€/mes):** 3 fotos + 1 vídeo
  - **Próximamente-Plan Pro (9'99€/mes):** 3 Videos + 3 fotos
- **Descubrimiento:** Aparece en el buscador de artistas y en la sección "Explorar"
- **Contacto Directo:** Los organizadores pueden contactarte sin intermediarios
- **Sin Comisiones:** Todos los ingresos van directamente al artista

### 📅 Para Eventos

- **Publicación Gratuita:** Publica eventos sin costo y sin registro obligatorio
- **Información Completa:** Imagen del evento, título, descripción, ubicación, fecha y hora
- **Contacto Directo:** Los artistas pueden contactarte directamente desde la ficha del evento
- **Buscador Dedicado:** Los artistas encuentran eventos por ciudad y categoría

### 🔍 Características de Búsqueda

- **Explorador de Artistas:** Filtra por categoría, ciudad y nombre
- **Catálogo de Eventos:** Encuentra escenarios gratuitos donde actuar
- **Perfiles Públicos:** Cada artista tiene su propia página con galería, bio y CTA de contacto

## 💰 Planes de Lanzamiento

| Característica | Free(beta) | Standard   | Pro           |
| -------------- | ---------- | ---------- | ------------- |
| Perfil Público | ✅         | ✅         | ✅            |
| Fotos          | 1          | 3          | 3             |
| Vídeos         | —          | 1          | 3             |
| Precio         | **0€/mes** | **6€/mes** | **9'99€/mes** |
| Visibilidad    | Estándar   | Mejorada   | Máxima        |

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
- Cuenta en Stripe (para pagos de suscripciones)

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

### 3. Variables de Entorno

Crea un archivo `.env.local` basado en `.env.example`:

```env
# Supabase (Frontend - Públicas)
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key_aqui

# Supabase (Backend - Privadas)
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key_aqui

# Stripe (Frontend - Pública)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_tu_clave_publica

# Stripe (Backend - Privadas)
STRIPE_SECRET_KEY=sk_test_tu_clave_secreta
STRIPE_WEBHOOK_SECRET=whsec_tu_webhook_secret

# Stripe Price IDs (para planes de suscripción)
STRIPE_SPOTLIGHT_PRICE_ID=price_spotlight_aqui
STRIPE_HEADLINER_PRICE_ID=price_headliner_aqui
```

### 4. Iniciar en desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🚢 Despliegue en Vercel

TUESDI está optimizado para funcionar en Vercel con **SSR (Server-Side Rendering)**.

### Pasos para desplegar

1. **Conecta tu repositorio** de GitHub a Vercel
2. **Vercel detectará automáticamente** `vercel.json` y aplicará la configuración
3. **Añade las variables de entorno** en el panel de Vercel (ver sección anterior)

### Configuración automática

El archivo `vercel.json` ya incluye:

- **Build Command**: `npm run vercel-build`
- **Output Directory**: `dist/client`
- **Server Function**: `api/index.ts` (para SSR)
- **Rewrites**: Todas las rutas se redirigen al servidor
- **Headers de Seguridad**: CORS, CSP, X-Frame-Options, etc.

## 📍 Rutas Principales

| Ruta                     | Descripción                                                 |
| ------------------------ | ----------------------------------------------------------- |
| `/`                      | Landing page principal                                      |
| `/explorar`              | Buscador de artistas                                        |
| `/eventos`               | Catálogo de eventos publicados                              |
| `/publicar-evento`       | Formulario para publicar un evento (gratuito, sin registro) |
| `/evento/:id`            | Detalles del evento con información de contacto             |
| `/artista/:slug`         | Perfil público del artista                                  |
| `/precios`               | Planes de suscripción                                       |
| `/registro`              | Registro de artistas                                        |
| `/login`                 | Acceso a cuenta                                             |
| `/_authenticated/panel`  | Panel de control del artista                                |
| `/_authenticated/perfil` | Edición del perfil                                          |

## 🔐 Seguridad

- **Autenticación:** Supabase Auth con JWT
- **RLS (Row Level Security):** Políticas de seguridad en base de datos
- **HTTPS:** Obligatorio en producción
- **Headers de Seguridad:** Configurados en Vercel
- **Validación:** Frontend y backend

## 📊 Base de Datos

### Tablas principales

- **profiles**: Perfiles de artistas
- **media**: Fotos y vídeos de artistas
- **events**: Eventos publicados (anónimos o de artistas)
- **messages**: Mensajes entre artistas y organizadores
- **subscriptions**: Suscripciones de usuarios
- **favorites**: Artistas favoritos guardados

## 🔄 Migraciones SQL

Las migraciones se encuentran en `supabase/migrations/`. Para ejecutarlas:

1. Ve a tu proyecto Supabase → SQL Editor
2. Ejecuta los archivos de migración en orden
3. Las migraciones incluyen:
   - Esquema inicial de tablas
   - Políticas de RLS
   - Índices de rendimiento
   - Soporte para eventos anónimos

## 📞 Contacto y Soporte

- **Email:** [hola@tuesdi.com](mailto:hola@tuesdi.com)
- **Web:** [tuesdi.com](https://tuesdi.com)
- **GitHub:** [dgr198213-ui/spotlite-shine](https://github.com/dgr198213-ui/spotlite-shine)

## 📄 Legal y Privacidad

El proyecto incluye páginas legales completas adaptadas al RGPD:

- [Términos y Condiciones](/terminos)
- [Política de Privacidad](/privacidad)
- [Política de Cookies](/cookies)
- [Aviso Legal](/aviso-legal)

## 🎓 Próximas Mejoras

- [ ] Sistema de reseñas y valoraciones
- [ ] Calendario de disponibilidad para artistas
- [ ] Notificaciones en tiempo real
- [ ] Integración con redes sociales
- [ ] App móvil nativa
- [ ] Sistema de recomendaciones con IA

## 📝 Licencia

Este proyecto es propietario. Todos los derechos reservados © 2024 TUESDI.

---

**Hecho con ♥ para artistas de España.**

TUESDI: Donde el talento encuentra su escenario.
