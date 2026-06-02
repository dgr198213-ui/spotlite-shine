import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Política de Cookies — Escénika" },
      {
        name: "description",
        content:
          "Política de cookies de Escénika. Información sobre el uso de cookies y tecnologías de rastreo.",
      },
    ],
  }),
  component: CookiesPage,
});

function CookiesPage() {
  return (
    <div className="min-h-dvh bg-background">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 pt-12 pb-24">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">Legal</p>
        <h1 className="mt-3 font-display text-5xl tracking-tight">Política de Cookies</h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Última actualización: 26 de mayo de 2026
        </p>

        <article className="mt-12 space-y-10 text-sm leading-relaxed">
          <section>
            <h2 className="font-display text-2xl">¿Qué son las Cookies?</h2>
            <p className="mt-4 text-muted-foreground">
              Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando
              visitas un sitio web. Se utilizan para recordar información sobre ti y mejorar tu
              experiencia de navegación.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl">Tipos de Cookies que Utilizamos</h2>

            <div className="mt-6 space-y-6">
              <div>
                <h3 className="font-semibold">1. Cookies Esenciales</h3>
                <p className="mt-3 text-muted-foreground">
                  Necesarias para el funcionamiento básico de la Plataforma. Incluyen:
                </p>
                <ul className="mt-3 space-y-1 text-muted-foreground list-disc list-inside">
                  <li>Autenticación y sesión de usuario</li>
                  <li>Preferencias de idioma</li>
                  <li>Tokens de seguridad CSRF</li>
                </ul>
                <p className="mt-3 text-xs text-muted-foreground">
                  <strong>Duración:</strong> Sesión o 30 días
                </p>
              </div>

              <div>
                <h3 className="font-semibold">2. Cookies de Análisis</h3>
                <p className="mt-3 text-muted-foreground">
                  Nos ayudan a entender cómo usas la Plataforma. Incluyen:
                </p>
                <ul className="mt-3 space-y-1 text-muted-foreground list-disc list-inside">
                  <li>Páginas visitadas</li>
                  <li>Tiempo de permanencia</li>
                  <li>Clics y interacciones</li>
                  <li>Dispositivo y navegador</li>
                </ul>
                <p className="mt-3 text-xs text-muted-foreground">
                  <strong>Duración:</strong> 12 meses | <strong>Proveedor:</strong> Google Analytics
                </p>
              </div>

              <div>
                <h3 className="font-semibold">3. Cookies de Marketing</h3>
                <p className="mt-3 text-muted-foreground">
                  Utilizadas para personalizar anuncios y seguimiento. Incluyen:
                </p>
                <ul className="mt-3 space-y-1 text-muted-foreground list-disc list-inside">
                  <li>Historial de navegación</li>
                  <li>Preferencias de contenido</li>
                  <li>Segmentación de audiencia</li>
                </ul>
                <p className="mt-3 text-xs text-muted-foreground">
                  <strong>Duración:</strong> 12 meses | <strong>Requiere:</strong> Consentimiento
                  explícito
                </p>
              </div>

              <div>
                <h3 className="font-semibold">4. Cookies de Terceros</h3>
                <p className="mt-3 text-muted-foreground">Establecidas por servicios integrados:</p>
                <ul className="mt-3 space-y-1 text-muted-foreground list-disc list-inside">
                  <li>
                    <strong>Stripe:</strong> Para procesar pagos de forma segura
                  </li>
                  <li>
                    <strong>Supabase:</strong> Para autenticación y almacenamiento
                  </li>
                  <li>
                    <strong>Google:</strong> Para análisis y servicios
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl">Consentimiento de Cookies</h2>
            <p className="mt-4 text-muted-foreground">
              Al acceder a Escénika, aceptas el uso de cookies esenciales. Las cookies de análisis
              y marketing requieren tu consentimiento explícito, que puedes otorgar o rechazar a
              través del banner de cookies.
            </p>
            <p className="mt-4 text-muted-foreground">
              Puedes cambiar tus preferencias de cookies en cualquier momento desde la configuración
              de tu cuenta.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl">Cómo Controlar las Cookies</h2>
            <p className="mt-4 text-muted-foreground">
              Puedes controlar las cookies de varias formas:
            </p>
            <ul className="mt-4 space-y-2 text-muted-foreground list-disc list-inside">
              <li>
                <strong>Configuración del navegador:</strong> La mayoría de navegadores permiten
                rechazar o eliminar cookies
              </li>
              <li>
                <strong>Herramientas de privacidad:</strong> Utiliza extensiones de navegador para
                bloquear cookies
              </li>
              <li>
                <strong>Preferencias de Escénika:</strong> Gestiona tus preferencias desde tu
                perfil
              </li>
            </ul>
            <p className="mt-4 text-muted-foreground">
              <strong>Nota:</strong> Desactivar cookies esenciales puede afectar el funcionamiento
              de la Plataforma.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl">Datos de Terceros</h2>
            <p className="mt-4 text-muted-foreground">
              Nuestros proveedores de servicios pueden establecer sus propias cookies. Consulta sus
              políticas de privacidad:
            </p>
            <ul className="mt-4 space-y-2 text-muted-foreground list-disc list-inside">
              <li>
                <a
                  href="https://stripe.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Política de Privacidad de Stripe
                </a>
              </li>
              <li>
                <a
                  href="https://supabase.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Política de Privacidad de Supabase
                </a>
              </li>
              <li>
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Política de Privacidad de Google
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl">Cambios en esta Política</h2>
            <p className="mt-4 text-muted-foreground">
              Podemos actualizar esta Política de Cookies en cualquier momento. Te notificaremos de
              cambios significativos.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl">Contacto</h2>
            <p className="mt-4 text-muted-foreground">
              Para preguntas sobre cookies, contáctanos en:{" "}
              <a href="mailto:privacy@escenika.com" className="text-primary hover:underline">
                privacy@escenika.com
              </a>
            </p>
          </section>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
