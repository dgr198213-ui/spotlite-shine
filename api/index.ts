// @ts-nocheck
import type { IncomingMessage, ServerResponse } from 'node:http'

// @ts-expect-error — generado en build
import serverModule from '../dist/server/server.js'

export default async function vercelEntrypoint(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  // Capturamos el método fetch que Vinxi nos confirma que exporta
  const webFetch = serverModule?.fetch || serverModule?.default?.fetch

  if (typeof webFetch !== 'function') {
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(
      JSON.stringify({
        error: 'Web Fetch handler not found',
        detail: 'dist/server/server.js exporta un formato inesperado.',
        exports: Object.keys(serverModule ?? {}),
      }),
    )
    return
  }

  try {
    // 1. Reconstruimos la URL completa para el entorno de Vercel
    const protocol = req.headers['x-forwarded-proto'] || 'https'
    const host = req.headers['x-forwarded-host'] || req.headers.host || 'localhost'
    const url = new URL(req.url || '/', `${protocol}://${host}`)

    // 2. Mapeamos las cabeceras entrantes de Node a la Web API (Headers)
    const headers = new Headers()
    for (const [key, value] of Object.entries(req.headers)) {
      if (value) {
        headers.set(key, Array.isArray(value) ? value.join(', ') : value)
      }
    }

    // 3. Leemos el body de Node si no es un método GET/HEAD
    let body: any = undefined
    if (req.method !== 'GET' && req.method !== 'HEAD') {
      // Dejamos que los buffers de Node se unifiquen de forma segura
      const buffers = []
      for await (const chunk of req) {
        buffers.push(chunk)
      }
      body = Buffer.concat(buffers)
    }

    // 4. Creamos la Request estándar que el fetch de TanStack espera
    const webRequest = new Request(url.toString(), {
      method: req.method,
      headers,
      body,
      duplex: 'half', // Requerido en Node 20+ para enviar bodies en streams/buffers
    })

    // 5. Ejecutamos el fetch del servidor compilado
    const webResponse = await webFetch(webRequest)

    // 6. Devolvemos las cabeceras de respuesta a Node
    webResponse.headers.forEach((value, key) => {
      if (!['transfer-encoding', 'connection', 'keep-alive'].includes(key.toLowerCase())) {
        res.setHeader(key, value)
      }
    })

    res.statusCode = webResponse.status

    // 7. Transmitimos el cuerpo de la respuesta directamente
    const arrayBuffer = await webResponse.arrayBuffer()
    res.end(Buffer.from(arrayBuffer))

  } catch (error) {
    console.error('Server execution error:', error)
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ error: 'Internal Server Error', message: String(error) }))
  }
}