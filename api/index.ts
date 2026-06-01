// @ts-nocheck
import type { IncomingMessage, ServerResponse } from 'node:http'

// @ts-expect-error — generado en build
import serverModule from '../dist/server/server.js'

// ============================================================
// VALIDACIÓN DE ENTORNO AL ARRANCAR — falla rápido y claro
// ============================================================
const REQUIRED_SERVER_VARS = [
  'SUPABASE_SERVICE_ROLE_KEY',
  'STRIPE_SECRET_KEY',
  'STRIPE_WEBHOOK_SECRET',
]

for (const v of REQUIRED_SERVER_VARS) {
  if (!process.env[v]) {
    throw new Error(`❌ Variable de entorno faltante en servidor: ${v}`)
  }
}

const STRIPE_WEBHOOK_PATH = '/api/stripe/webhook'
const SKIP_HEADERS = new Set(['transfer-encoding', 'connection', 'keep-alive'])

// ============================================================
// WEBHOOK DE STRIPE — manejo especial del raw body
// ============================================================
async function handleStripeWebhook(
  req: IncomingMessage,
  res: ServerResponse,
  rawBody: Buffer,
): Promise<void> {
  const stripe = new (await import('stripe')).default(
    process.env.STRIPE_SECRET_KEY!,
    { apiVersion: '2024-06-20' }
  )

  const sig = req.headers['stripe-signature']

  if (!sig) {
    res.writeHead(400, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Falta stripe-signature header' }))
    return
  }

  let event
  try {
    // ✅ CRÍTICO: raw body sin transformar + firma verificada
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error('[Stripe] Firma inválida:', err)
    res.writeHead(400, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Webhook signature verification failed' }))
    return
  }

  // Procesar eventos
  try {
    switch (event.type) {
      case 'customer.subscription.created':
      case 'customer.subscription.updated':
        console.log('[Stripe] Suscripción actualizada:', event.data.object.id)
        // await syncSubscriptionToSupabase(event.data.object)
        break
      case 'customer.subscription.deleted':
        console.log('[Stripe] Suscripción cancelada:', event.data.object.id)
        break
      case 'invoice.payment_failed':
        console.error('[Stripe] Pago fallido:', event.data.object.customer)
        break
      default:
        console.log('[Stripe] Evento no manejado:', event.type)
    }
  } catch (err) {
    console.error('[Stripe] Error procesando evento:', err)
    // Devolvemos 200 igualmente — Stripe no debe reintentar por errores nuestros
  }

  res.writeHead(200, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify({ received: true }))
}

// ============================================================
// ENTRYPOINT PRINCIPAL
// ============================================================
export default async function vercelEntrypoint(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  const webFetch = serverModule?.fetch || serverModule?.default?.fetch

  if (typeof webFetch !== 'function') {
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({
      error: 'Web Fetch handler not found',
      exports: Object.keys(serverModule ?? {}),
    }))
    return
  }

  // ✅ Leemos el body UNA sola vez aquí para todos los casos
  let rawBody: Buffer = Buffer.alloc(0)
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    const buffers: Buffer[] = []
    for await (const chunk of req) {
      buffers.push(chunk)
    }
    rawBody = Buffer.concat(buffers)
  }

  // ✅ Webhook de Stripe interceptado ANTES de llegar a TanStack
  if (req.url?.startsWith(STRIPE_WEBHOOK_PATH)) {
    return handleStripeWebhook(req, res, rawBody)
  }

  try {
    const protocol = req.headers['x-forwarded-proto'] || 'https'
    const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost'
    const url = new URL(req.url || '/', `${protocol}://${host}`)

    const headers = new Headers()
    for (const [key, value] of Object.entries(req.headers)) {
      if (value) {
        headers.set(key, Array.isArray(value) ? value.join(', ') : value)
      }
    }

    const webRequest = new Request(url.toString(), {
      method: req.method,
      headers,
      body: rawBody.length > 0 ? rawBody : undefined,
      duplex: 'half',
    })

    const webResponse = await webFetch(webRequest)

    webResponse.headers.forEach((value, key) => {
      if (!SKIP_HEADERS.has(key.toLowerCase())) {
        res.setHeader(key, value)
      }
    })

    res.statusCode = webResponse.status

    // ✅ Streaming si está disponible, fallback a arrayBuffer
    if (webResponse.body) {
      const reader = webResponse.body.getReader()
      await new Promise<void>((resolve, reject) => {
        function pump() {
          reader.read().then(({ done, value }) => {
            if (done) { res.end(); resolve(); return }
            res.write(value)
            pump()
          }).catch(reject)
        }
        pump()
      })
    } else {
      const arrayBuffer = await webResponse.arrayBuffer()
      res.end(Buffer.from(arrayBuffer))
    }

  } catch (error) {
    console.error('[SSR] Error:', error)
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Internal Server Error', message: String(error) }))
  }
}