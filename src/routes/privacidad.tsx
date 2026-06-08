import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const Route = createFileRoute("/privacidad")({
  head: () => ({
    meta: [
      { title: "Política de Privacidad — TUESDI" },
      {
        name: "description",
        content: "Política de privacidad y protección de datos de TUESDI conforme a RGPD.",
      },
    ],
  }),
  component: PrivacidadPage,
});

function PrivacidadPage() {
  return (
    <div className="min-h-dvh gradient-hero">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-6 pt-12 pb-20">
        <h1 className="font-display text-5xl">Política de Privacidad</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Última actualización: 26 de mayo de 2026
        </p>

        <article className="mt-10 space-y-8 text-sm leading-relaxed">
          <section>
            <h2 className="font-display text-2xl">1. Responsable del Tratamiento</h2>
            <p className="mt-3 text-muted-foreground">
              TUESDI ("nosotros" o "la Plataforma") es responsable del tratamiento de tus datos
              personales conforme a la Ley Orgánica de Protección de Datos Personales (LOPDGDD) y el
              Reglamento General de Protección de Datos (RGPD).
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl">2. Datos que Recopilamos</h2>
            <p className="mt-3 text-muted-foreground">
              Recopilamos los siguientes datos personales:
            </p>
            <ul className="mt-3 space-y-2 text-muted-foreground list-disc list-inside">
              <li>Nombre, email y contraseña (autenticación)</li>
              <li>Nombre artístico, categoría, ciudad y biografía (perfil)</li>
              <li>Fotografías, vídeos y contenido multimedia</li>
              <li>Información de pago (procesada por Stripe)</li>
              <li>Datos de uso y navegación (mediante cookies)</li>
              <li>Dirección IP y datos técnicos</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl">3. Base Legal del Tratamiento</h2>
            <p className="mt-3 text-muted-foreground">Tratamos tus datos en base a:</p>
            <ul className="mt-3 space-y-2 text-muted-foreground list-disc list-inside">
              <li>
                <strong>Consentimiento:</strong> Para marketing y cookies no esenciales
              </li>
              <li>
                <strong>Ejecución de contrato:</strong> Para proporcionar el servicio
              </li>
              <li>
                <strong>Obligación legal:</strong> Para cumplir con leyes fiscales y de protección
              </li>
              <li>
                <strong>Interés legítimo:</strong> Para mejorar la seguridad y el servicio
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl">4. Uso de Datos</h2>
            <p className="mt-3 text-muted-foreground">Utilizamos tus datos para:</p>
            <ul className="mt-3 space-y-2 text-muted-foreground list-disc list-inside">
              <li>Proporcionar y mejorar el servicio</li>
              <li>Procesar pagos y suscripciones</li>
              <li>Comunicarnos contigo sobre tu cuenta</li>
              <li>Enviar notificaciones y actualizaciones</li>
              <li>Prevenir fraude y garantizar seguridad</li>
              <li>Análisis y estadísticas (datos anonimizados)</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl">5. Compartición de Datos</h2>
            <p className="mt-3 text-muted-foreground">Compartimos tus datos con:</p>
            <ul className="mt-3 space-y-2 text-muted-foreground list-disc list-inside">
              <li>
                <strong>Stripe:</strong> Para procesar pagos (conforme a sus términos de privacidad)
              </li>
              <li>
                <strong>Supabase:</strong> Para almacenar datos (servidores en la UE)
              </li>
              <li>
                <strong>Proveedores de servicios:</strong> Hosting, email, análisis
              </li>
              <li>
                <strong>Autoridades legales:</strong> Si lo requiere la ley
              </li>
            </ul>
            <p className="mt-3 text-muted-foreground">
              Tu perfil público (nombre, categoría, ciudad, foto) es visible para otros usuarios de
              la Plataforma.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl">6. Cookies y Tecnologías de Rastreo</h2>
            <p className="mt-3 text-muted-foreground">Utilizamos cookies para:</p>
            <ul className="mt-3 space-y-2 text-muted-foreground list-disc list-inside">
              <li>
                <strong>Cookies esenciales:</strong> Autenticación y funcionamiento del sitio
              </li>
              <li>
                <strong>Cookies de análisis:</strong> Entender cómo usas la Plataforma
              </li>
              <li>
                <strong>Cookies de marketing:</strong> Personalizar anuncios (con consentimiento)
              </li>
            </ul>
            <p className="mt-3 text-muted-foreground">
              Puedes controlar las cookies desde la configuración de tu navegador. Desactivar
              cookies puede afectar la funcionalidad de la Plataforma.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl">7. Derechos del Usuario</h2>
            <p className="mt-3 text-muted-foreground">Conforme al RGPD, tienes derecho a:</p>
            <ul className="mt-3 space-y-2 text-muted-foreground list-disc list-inside">
              <li>
                <strong>Acceso:</strong> Solicitar copia de tus datos
              </li>
              <li>
                <strong>Rectificación:</strong> Corregir datos inexactos
              </li>
              <li>
                <strong>Supresión:</strong> Solicitar la eliminación de tus datos ("derecho al
                olvido")
              </li>
              <li>
                <strong>Limitación:</strong> Limitar el uso de tus datos
              </li>
              <li>
                <strong>Portabilidad:</strong> Recibir tus datos en formato estructurado
              </li>
              <li>
                <strong>Oposición:</strong> Oponerte al tratamiento de tus datos
              </li>
            </ul>
            <p className="mt-3 text-muted-foreground">
              Para ejercer estos derechos, contáctanos en:{" "}
              <a href="mailto:privacy@spotandshows.com" className="text-gold hover:underline">
                privacy@spotandshows.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl">8. Retención de Datos</h2>
            <p className="mt-3 text-muted-foreground">
              Conservamos tus datos mientras tu cuenta esté activa. Después de la eliminación de tu
              cuenta, retenemos datos anonimizados por razones legales y de seguridad durante un
              máximo de 3 años.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl">9. Seguridad</h2>
            <p className="mt-3 text-muted-foreground">
              Implementamos medidas de seguridad técnicas y organizativas para proteger tus datos,
              incluyendo encriptación SSL/TLS, autenticación segura y acceso restringido. Sin
              embargo, ningún sistema es 100% seguro.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl">10. Cambios en esta Política</h2>
            <p className="mt-3 text-muted-foreground">
              Podemos actualizar esta Política de Privacidad en cualquier momento. Te notificaremos
              de cambios significativos por email.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl">11. Contacto</h2>
            <p className="mt-3 text-muted-foreground">
              Para preguntas sobre privacidad, contáctanos en:{" "}
              <a href="mailto:privacy@spotandshows.com" className="text-gold hover:underline">
                privacy@spotandshows.com
              </a>
            </p>
          </section>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
