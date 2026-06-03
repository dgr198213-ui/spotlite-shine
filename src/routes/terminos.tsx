import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/terminos")({
  head: () => ({
    meta: [
      { title: "Términos y Condiciones — Escénika" },
      {
        name: "description",
        content: "Términos y condiciones de uso de la plataforma Escénika.",
      },
    ],
  }),
  component: TerminosPage,
});

function TerminosPage() {
  return (
    <div className="min-h-dvh gradient-hero">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 pt-12 pb-20">
        <h1 className="font-display text-5xl">Términos y Condiciones</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Última actualización: 26 de mayo de 2026
        </p>

        <article className="mt-10 space-y-8 text-sm leading-relaxed">
          <section>
            <h2 className="font-display text-2xl">1. Aceptación de los Términos</h2>
            <p className="mt-3 text-muted-foreground">
              Al acceder y utilizar Escénika ("la Plataforma"), aceptas estar vinculado por estos
              Términos y Condiciones. Si no estás de acuerdo con alguno de estos términos, no debes
              utilizar la Plataforma.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl">2. Descripción del Servicio</h2>
            <p className="mt-3 text-muted-foreground">
              Escénika es una plataforma digital que facilita la conexión entre artistas y
              promotores de eventos. Escénika actúa únicamente como intermediario y no es
              responsable de:
            </p>
            <ul className="mt-3 space-y-2 text-muted-foreground list-disc list-inside">
              <li>La calidad o desempeño de los servicios artísticos contratados</li>
              <li>El incumplimiento de compromisos entre artistas y promotores</li>
              <li>Disputas contractuales entre usuarios</li>
              <li>Daños o perjuicios derivados de transacciones entre usuarios</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl">3. Roles de Usuario</h2>
            <p className="mt-3 text-muted-foreground">
              La Plataforma ofrece dos roles principales: Artistas y Promotores. Cada rol tiene
              responsabilidades y limitaciones específicas. Al registrarte, aceptas cumplir con las
              obligaciones de tu rol seleccionado.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl">4. Planes de Suscripción</h2>
            <p className="mt-3 text-muted-foreground">
              Los planes de suscripción (Spark, Spotlight, Headliner) incluyen diferentes
              funcionalidades y límites de contenido. Las suscripciones se renuevan automáticamente
              al final de cada período de facturación. Puedes cancelar tu suscripción en cualquier
              momento desde tu panel de control.
            </p>
            <p className="mt-3 text-muted-foreground">
              No se ofrecen reembolsos por períodos parciales. La cancelación entrará en vigor al
              final del período de facturación actual.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl">5. Contenido del Usuario</h2>
            <p className="mt-3 text-muted-foreground">
              Eres responsable de todo el contenido que publiques en la Plataforma, incluyendo
              fotos, vídeos, descripciones y perfiles. Garantizas que:
            </p>
            <ul className="mt-3 space-y-2 text-muted-foreground list-disc list-inside">
              <li>Posees todos los derechos sobre el contenido publicado</li>
              <li>El contenido no infringe derechos de terceros</li>
              <li>El contenido cumple con todas las leyes aplicables</li>
              <li>El contenido no es difamatorio, obsceno o ilegal</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl">6. Limitaciones de Responsabilidad</h2>
            <p className="mt-3 text-muted-foreground">
              Escénika se proporciona "tal cual" sin garantías de ningún tipo. No somos
              responsables de:
            </p>
            <ul className="mt-3 space-y-2 text-muted-foreground list-disc list-inside">
              <li>Interrupciones o indisponibilidad del servicio</li>
              <li>Errores o inexactitudes en la Plataforma</li>
              <li>Pérdida de datos o contenido</li>
              <li>Daños indirectos, incidentales o consecuentes</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl">7. Conducta Prohibida</h2>
            <p className="mt-3 text-muted-foreground">No debes utilizar la Plataforma para:</p>
            <ul className="mt-3 space-y-2 text-muted-foreground list-disc list-inside">
              <li>Acosar, amenazar o discriminar a otros usuarios</li>
              <li>Publicar contenido ilegal o que infrinja derechos</li>
              <li>Estafar o engañar a otros usuarios</li>
              <li>Interferir con el funcionamiento de la Plataforma</li>
              <li>Recopilar datos de otros usuarios sin consentimiento</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl">8. Terminación de Cuenta</h2>
            <p className="mt-3 text-muted-foreground">
              Escénika se reserva el derecho de suspender o eliminar tu cuenta si:
            </p>
            <ul className="mt-3 space-y-2 text-muted-foreground list-disc list-inside">
              <li>Incumples estos Términos</li>
              <li>Realizas actividades ilegales o fraudulentas</li>
              <li>Acosas o amenazas a otros usuarios</li>
              <li>No utilizas la Plataforma durante 12 meses consecutivos</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl">9. Cambios en los Términos</h2>
            <p className="mt-3 text-muted-foreground">
              Escénika se reserva el derecho de modificar estos Términos en cualquier momento. Los
              cambios entrarán en vigor inmediatamente. Tu uso continuado de la Plataforma
              constituye aceptación de los términos modificados.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl">10. Contacto</h2>
            <p className="mt-3 text-muted-foreground">
              Para preguntas sobre estos Términos, contáctanos en:{" "}
              <a href="mailto:legal@escenika.com" className="text-gold hover:underline">
                legal@escenika.com
              </a>
            </p>
          </section>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
