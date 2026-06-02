import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/aviso-legal")({
  head: () => ({
    meta: [
      { title: "Aviso Legal — Escénika" },
      { name: "description", content: "Aviso legal e información del titular de Escénika." },
    ],
  }),
  component: AvisoLegalPage,
});

function AvisoLegalPage() {
  return (
    <div className="min-h-dvh gradient-hero">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 pt-12 pb-20">
        <h1 className="font-display text-5xl">Aviso Legal</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Última actualización: 26 de mayo de 2026
        </p>

        <article className="mt-10 space-y-8 text-sm leading-relaxed">
          <section>
            <h2 className="font-display text-2xl">1. Identificación del Titular</h2>
            <div className="mt-3 space-y-2 text-muted-foreground">
              <p>
                <strong>Denominación:</strong> Escénika
              </p>
              <p>
                <strong>Tipo:</strong> Plataforma Digital
              </p>
              <p>
                <strong>Domicilio:</strong> España
              </p>
              <p>
                <strong>Email de contacto:</strong>{" "}
                <a href="mailto:legal@escenika.com" className="text-gold hover:underline">
                  legal@escenika.com
                </a>
              </p>
              <p>
                <strong>Teléfono:</strong> Disponible en el panel de contacto
              </p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl">2. Objeto de la Plataforma</h2>
            <p className="mt-3 text-muted-foreground">
              Escénika es una plataforma digital que facilita la conexión entre artistas y
              promotores de eventos. Actúa como intermediaria sin responsabilidad directa sobre los
              servicios contratados entre usuarios.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl">3. Derechos de Propiedad Intelectual</h2>
            <p className="mt-3 text-muted-foreground">
              Todos los contenidos de la Plataforma (diseño, código, textos, imágenes, logos) son
              propiedad intelectual de Escénika o sus licenciantes. Está prohibida su
              reproducción, distribución o transmisión sin autorización expresa.
            </p>
            <p className="mt-3 text-muted-foreground">
              El contenido publicado por usuarios (perfiles, fotos, vídeos) permanece siendo
              propiedad del usuario, quien otorga a Escénika licencia para utilizarlo en la
              Plataforma.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl">4. Limitación de Responsabilidad</h2>
            <p className="mt-3 text-muted-foreground">Escénika no es responsable de:</p>
            <ul className="mt-3 space-y-2 text-muted-foreground list-disc list-inside">
              <li>Daños derivados del uso o imposibilidad de uso de la Plataforma</li>
              <li>Pérdida de datos o contenido</li>
              <li>Interrupciones del servicio por causas ajenas a Escénika</li>
              <li>Incumplimientos de contratos entre usuarios</li>
              <li>Calidad o desempeño de servicios artísticos</li>
              <li>Fraude o conducta ilegal de otros usuarios</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl">5. Acceso y Disponibilidad</h2>
            <p className="mt-3 text-muted-foreground">
              Escénika se proporciona "tal cual" sin garantías de disponibilidad continua. Nos
              reservamos el derecho de:
            </p>
            <ul className="mt-3 space-y-2 text-muted-foreground list-disc list-inside">
              <li>Realizar mantenimiento y actualizaciones</li>
              <li>Modificar o descontinuar funcionalidades</li>
              <li>Limitar el acceso por razones de seguridad</li>
              <li>Suspender la Plataforma sin previo aviso en caso de emergencia</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl">6. Uso Aceptable</h2>
            <p className="mt-3 text-muted-foreground">Al utilizar la Plataforma, aceptas no:</p>
            <ul className="mt-3 space-y-2 text-muted-foreground list-disc list-inside">
              <li>Violar leyes locales, nacionales o internacionales</li>
              <li>Infringir derechos de terceros</li>
              <li>Publicar contenido ofensivo, difamatorio o ilegal</li>
              <li>Intentar acceder a sistemas sin autorización</li>
              <li>Interferir con el funcionamiento de la Plataforma</li>
              <li>Realizar actividades de spam o phishing</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl">7. Enlaces Externos</h2>
            <p className="mt-3 text-muted-foreground">
              La Plataforma puede contener enlaces a sitios web de terceros. Escénika no es
              responsable del contenido, precisión o prácticas de privacidad de estos sitios. El
              acceso a enlaces externos es bajo tu propio riesgo.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl">8. Modificación de Términos</h2>
            <p className="mt-3 text-muted-foreground">
              Escénika se reserva el derecho de modificar este Aviso Legal en cualquier momento.
              Los cambios entrarán en vigor inmediatamente. Tu uso continuado de la Plataforma
              constituye aceptación de los cambios.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl">9. Ley Aplicable y Jurisdicción</h2>
            <p className="mt-3 text-muted-foreground">
              Este Aviso Legal se rige por la ley española. Cualquier disputa se resolverá ante los
              juzgados competentes de España, específicamente los de Madrid.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl">10. Contacto para Denuncias</h2>
            <p className="mt-3 text-muted-foreground">
              Si tienes conocimiento de contenido ilegal o que infringe derechos, por favor contacta
              a:
            </p>
            <div className="mt-3 space-y-2 text-muted-foreground">
              <p>
                <strong>Email:</strong>{" "}
                <a href="mailto:abuse@escenika.com" className="text-gold hover:underline">
                  abuse@escenika.com
                </a>
              </p>
              <p>
                <strong>Asunto:</strong> Incluye "DENUNCIA" en el asunto del email
              </p>
              <p>
                <strong>Contenido:</strong> Describe el contenido problemático y proporciona URLs o
                IDs relevantes
              </p>
            </div>
            <p className="mt-3 text-muted-foreground">
              Investigaremos todas las denuncias válidas y tomaremos acciones apropiadas conforme a
              la ley.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl">11. Cumplimiento Legal</h2>
            <p className="mt-3 text-muted-foreground">Escénika cumple con:</p>
            <ul className="mt-3 space-y-2 text-muted-foreground list-disc list-inside">
              <li>Ley Orgánica de Protección de Datos Personales (LOPDGDD)</li>
              <li>Reglamento General de Protección de Datos (RGPD)</li>
              <li>
                Ley de Servicios de la Sociedad de la Información y de Comercio Electrónico
                (LSSI-CE)
              </li>
              <li>Normativa de protección al consumidor</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl">12. Contacto General</h2>
            <p className="mt-3 text-muted-foreground">
              Para cualquier pregunta o comentario sobre este Aviso Legal, contáctanos en:
            </p>
            <p className="mt-3 text-muted-foreground">
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
