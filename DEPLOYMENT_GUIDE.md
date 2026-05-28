# Guía de Despliegue - Spot&Shows

## 🚀 Estado del Despliegue

**Plataforma:** Vercel  
**URL de Producción:** https://spotlite-shine.vercel.app  
**Repositorio:** https://github.com/dgr198213-ui/spotlite-shine

## 📋 Configuración Completada

### 1. Variables de Entorno en Vercel

Las siguientes variables están configuradas en Vercel:

- ✅ `VITE_SUPABASE_URL`
- ✅ `VITE_SUPABASE_PUBLISHABLE_KEY`
- ✅ `VITE_STRIPE_PUBLISHABLE_KEY`
- ✅ `STRIPE_SECRET_KEY`
- ✅ `SUPABASE_SERVICE_ROLE_KEY`

### 2. Supabase

**Proyecto:** xseupkmaosjdrgdsdpmj  
**URL:** https://xseupkmaosjdrgdsdpmj.supabase.co

#### Tablas Creadas:

- `profiles` - Perfiles de usuarios (artistas y promotores)
- `events` - Eventos y agenda cultural
- `favorites` - Artistas favoritos de promotores
- `subscriptions` - Gestión de suscripciones
- `messages` - Comunicación entre usuarios

#### Funciones SQL:

- `get_user_role()` - Obtiene el rol del usuario
- `is_artist()` - Verifica si es artista
- `is_organizer()` - Verifica si es promotor

### 3. Stripe

**Modo:** Test (Sandbox)  
**Claves Configuradas:**

- Secret Key: sk_test_51TbOLxQxrnRxh3Ydfie4...
- Publishable Key: pk_test_51TbOLxQxrnRxh3Yd...

#### Planes:

- **Spark** - Gratuito (0€/mes)
- **Spotlight** - 6€/mes
- **Headliner** - 19€/mes

### 4. Características Implementadas

#### Autenticación y Roles

- ✅ Registro con selección de rol (Artista/Promotor)
- ✅ Autenticación con Supabase
- ✅ Gestión de roles y permisos

#### Páginas Legales (RGPD)

- ✅ `/terminos` - Términos y Condiciones
- ✅ `/privacidad` - Política de Privacidad
- ✅ `/cookies` - Política de Cookies
- ✅ `/aviso-legal` - Aviso Legal

#### Integración Stripe

- ✅ `/api/stripe/checkout` - Crear sesión de checkout
- ✅ `/api/stripe/webhook` - Manejar eventos de Stripe
- ✅ `/api/stripe/subscription` - Gestionar suscripciones
- ✅ Componente `SubscriptionManager` para panel de usuario

#### Mejoras UX

- ✅ Página de precios mejorada
- ✅ Footer con enlaces legales
- ✅ Gestión de suscripciones desde panel
- ✅ Cancelación de suscripciones

## 🔧 Configuración Local

### Requisitos

- Node.js 22.13.0+
- npm o pnpm

### Instalación

```bash
git clone https://github.com/dgr198213-ui/spotlite-shine.git
cd spotlite-shine
npm install
```

### Variables de Entorno

Copia `.env.example` a `.env.local`:

```bash
cp .env.example .env.local
```

Completa con tus valores:

```
VITE_SUPABASE_URL=https://xseupkmaosjdrgdsdpmj.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=sb_publishable_M_UtGZAIHQqpKFyMqwNkpg_B9qEf2GU
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
SUPABASE_SERVICE_ROLE_KEY=sbp_...
```

### Desarrollo

```bash
npm run dev
```

### Build

```bash
npm run build
```

## 📱 Funcionalidades Principales

### Para Artistas

1. Crear perfil con foto, biografía y precio
2. Subir vídeos y fotos (según plan)
3. Ver solicitudes de eventos
4. Gestionar suscripción
5. Acceder a panel de control

### Para Promotores

1. Buscar artistas
2. Filtrar por categoría y ciudad
3. Ver detalles de artistas
4. Guardar favoritos
5. Contactar artistas

## 🔐 Seguridad

### Políticas RLS (Row Level Security)

- ✅ Usuarios solo ven sus propios datos
- ✅ Perfiles públicos visibles para todos
- ✅ Mensajes privados entre usuarios

### Autenticación

- ✅ JWT con Supabase Auth
- ✅ Sesiones seguras
- ✅ Refresh tokens automáticos

## 💳 Flujo de Pagos

1. Usuario selecciona plan en `/precios`
2. Se redirige a checkout de Stripe
3. Stripe procesa el pago
4. Webhook actualiza suscripción en Supabase
5. Usuario obtiene acceso a funcionalidades premium

## 🐛 Solución de Problemas

### Variables de entorno no cargadas

- Verifica que estén configuradas en Vercel Settings → Environment Variables
- Redeploy después de cambiar variables

### Errores de Stripe

- Verifica que las claves sean correctas (test vs live)
- Comprueba que el webhook esté configurado en Stripe Dashboard

### Errores de Supabase

- Verifica la conexión a la base de datos
- Comprueba que las políticas RLS estén correctas
- Revisa los logs en Supabase Dashboard

## 📞 Soporte

Para preguntas o problemas:

- Email: hola@spotandshows.com
- GitHub Issues: https://github.com/dgr198213-ui/spotlite-shine/issues

## 📚 Documentación

- [Supabase Docs](https://supabase.com/docs)
- [Stripe Docs](https://stripe.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [TanStack Start](https://tanstack.com/start)

---

**Última actualización:** 26 de mayo de 2026  
**Versión:** 2.0.0
