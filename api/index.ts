/**
 * Vercel Serverless Function Entry Point — spotlite-shine
 *
 * TanStack Start (Vite SSR, sin Nitro) genera en build:
 *   dist/server/server.js  → exporta `handler` compatible con Node.js http
 *   dist/client/           → assets estáticos (servidos por Vercel CDN)
 *
 * ARQUITECTURA:
 *   Vercel → api/index.ts → dist/server/server.js → TanStack Start SSR
 */

import type { IncomingMessage, ServerResponse } from 'node:http'

// @ts-expect-error — generado en build, no existe durante análisis estático de TS
import serverModule from '../dist/server/server.js'

// TanStack Start exporta el handler como named export o default
type NodeHandler = (req: IncomingMessage, res: ServerResponse) => void | Promise<void>

const handler: NodeHandler | undefined =
  typeof serverModule?.handler === 'function'
    ? serverModule.handler
    : typeof serverModule?.default === 'function'
      ? serverModule.default
      : typeof serverModule === 'function'
        ? serverModule
        : undefined

export default async function vercelEntrypoint(
  req: IncomingMessage,
  res: ServerResponse,
): Promise<void> {
  if (typeof handler !== 'function') {
    res.writeHead(500, { 'Content-Type': 'application/json' })
    res.end(
      JSON.stringify({
        error: 'Server handler not initialized',
        detail:
          'dist/server/server.js no exporta un handler válido. ' +
          'Verifica que `npm run build` completó correctamente.',
        exports: Object.keys(serverModule ?? {}),
      }),
    )
    return
  }

  return handler(req, res)
}
