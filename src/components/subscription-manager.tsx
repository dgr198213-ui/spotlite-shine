import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Subscription {
  id: string;
  user_id: string;
  stripe_subscription_id: string;
  plan: "spark" | "spotlight" | "headliner";
  status: string;
  current_period_start: string;
  current_period_end: string;
  cancel_at: string | null;
}

const PLAN_DETAILS: Record<string, { name: string; price: number }> = {
  spark: { name: "Spark", price: 0 },
  spotlight: { name: "Spotlight", price: 6 },
  headliner: { name: "Headliner", price: 19 },
};

export function SubscriptionManager() {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [canceling, setCanceling] = useState(false);

  useEffect(() => {
    fetchSubscription();
  }, []);

  const fetchSubscription = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/stripe/subscription");
      if (!response.ok) throw new Error("Failed to fetch subscription");
      const data = await response.json();
      setSubscription(data.subscription);
    } catch (error) {
      console.error("Error fetching subscription:", error);
      toast.error("No se pudo cargar la información de suscripción");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    if (!subscription) return;

    if (!confirm("¿Estás seguro de que deseas cancelar tu suscripción?")) {
      return;
    }

    try {
      setCanceling(true);
      const response = await fetch("/api/stripe/subscription", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "cancel",
          subscriptionId: subscription.stripe_subscription_id,
        }),
      });

      if (!response.ok) throw new Error("Failed to cancel subscription");

      toast.success("Suscripción cancelada");
      fetchSubscription();
    } catch (error) {
      console.error("Error canceling subscription:", error);
      toast.error("Error al cancelar la suscripción");
    } finally {
      setCanceling(false);
    }
  };

  if (loading) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Cargando información de suscripción...</span>
        </div>
      </Card>
    );
  }

  if (!subscription) {
    return (
      <Card className="p-6">
        <div className="flex items-start gap-3">
          <AlertCircle className="mt-0.5 h-5 w-5 text-amber-500" />
          <div>
            <h3 className="font-semibold">Sin suscripción activa</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Estás usando el plan Spark (gratuito). Actualiza a Spotlight o Headliner para acceder
              a más funcionalidades.
            </p>
          </div>
        </div>
      </Card>
    );
  }

  const planDetails = PLAN_DETAILS[subscription.plan];
  const currentPeriodEnd = new Date(subscription.current_period_end);
  const isActive = subscription.status === "active";
  const isPastDue = subscription.status === "past_due";

  return (
    <Card className={`p-6 ${isPastDue ? "border-red-500/50 bg-red-500/5" : ""}`}>
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-lg">{planDetails.name}</h3>
              {isActive && <CheckCircle className="h-5 w-5 text-green-500" />}
              {isPastDue && <AlertCircle className="h-5 w-5 text-red-500" />}
            </div>
            <p className="mt-1 text-sm text-muted-foreground">{planDetails.price}€ al mes</p>
          </div>
        </div>

        <div className="space-y-2 border-t border-border pt-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Estado:</span>
            <span className="font-medium capitalize">
              {subscription.status === "active" ? "Activo" : subscription.status}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Próxima facturación:</span>
            <span className="font-medium">{currentPeriodEnd.toLocaleDateString("es-ES")}</span>
          </div>
          {subscription.cancel_at && (
            <div className="flex justify-between text-red-500">
              <span className="text-muted-foreground">Cancelación programada:</span>
              <span className="font-medium">
                {new Date(subscription.cancel_at).toLocaleDateString("es-ES")}
              </span>
            </div>
          )}
        </div>

        {isPastDue && (
          <div className="rounded-lg bg-red-500/10 p-3 text-sm text-red-600">
            Tu suscripción tiene un pago pendiente. Por favor, actualiza tu método de pago.
          </div>
        )}

        {isActive && !subscription.cancel_at && (
          <Button variant="outline" onClick={handleCancel} disabled={canceling} className="w-full">
            {canceling ? "Cancelando..." : "Cancelar suscripción"}
          </Button>
        )}
      </div>
    </Card>
  );
}
