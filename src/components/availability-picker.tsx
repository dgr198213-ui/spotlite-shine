import { useState } from "react";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface AvailabilitySlot {
  id: string;
  start_date: string;
  end_date: string;
  is_available: boolean;
}

interface AvailabilityPickerProps {
  userId: string;
  onUpdate?: () => void;
}

export function AvailabilityPicker({ userId, onUpdate }: AvailabilityPickerProps) {
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);

  const loadAvailability = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("artist_availability")
      .select("*")
      .eq("artist_id", userId)
      .order("start_date", { ascending: true });

    if (error) {
      toast.error("Error al cargar disponibilidad");
      console.error(error);
    } else {
      setSlots(data || []);
    }
    setLoading(false);
  };

  const addSlot = async () => {
    if (!startDate || !endDate) {
      toast.error("Completa las fechas");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      toast.error("La fecha de inicio debe ser anterior a la de fin");
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("artist_availability").insert([
      {
        artist_id: userId,
        start_date: startDate,
        end_date: endDate,
        is_available: isAvailable,
      },
    ]);

    if (error) {
      toast.error("Error al guardar disponibilidad");
      console.error(error);
    } else {
      toast.success("Disponibilidad guardada");
      setStartDate("");
      setEndDate("");
      setIsAvailable(true);
      await loadAvailability();
      onUpdate?.();
    }
    setLoading(false);
  };

  const deleteSlot = async (id: string) => {
    setLoading(true);
    const { error } = await supabase
      .from("artist_availability")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Error al eliminar disponibilidad");
      console.error(error);
    } else {
      toast.success("Disponibilidad eliminada");
      await loadAvailability();
      onUpdate?.();
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Calendar className="h-5 w-5 text-gold" />
        <h3 className="font-display text-lg">Mi Disponibilidad</h3>
      </div>

      <Card className="border-border gradient-card p-6">
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <label className="text-sm font-medium">Desde</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Hasta</label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-2"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="is-available"
              checked={isAvailable}
              onChange={(e) => setIsAvailable(e.target.checked)}
              className="h-4 w-4 rounded border-border"
            />
            <label htmlFor="is-available" className="text-sm">
              Disponible en estas fechas
            </label>
          </div>

          <Button
            onClick={addSlot}
            disabled={loading}
            variant="gold"
            className="w-full rounded-full"
          >
            {loading ? "Guardando..." : "Añadir Período"}
          </Button>
        </div>
      </Card>

      {slots.length > 0 && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            {slots.length} período{slots.length !== 1 ? "s" : ""} guardado{slots.length !== 1 ? "s" : ""}
          </p>
          {slots.map((slot) => (
            <Card key={slot.id} className="border-border gradient-card p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">
                    {new Date(slot.start_date).toLocaleDateString("es-ES")} -{" "}
                    {new Date(slot.end_date).toLocaleDateString("es-ES")}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {slot.is_available ? "✓ Disponible" : "✗ No disponible"}
                  </p>
                </div>
                <button
                  onClick={() => deleteSlot(slot.id)}
                  disabled={loading}
                  className="text-sm text-destructive hover:underline"
                >
                  Eliminar
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {slots.length === 0 && (
        <Button
          onClick={loadAvailability}
          variant="outline"
          className="w-full rounded-full"
        >
          Cargar Disponibilidad
        </Button>
      )}
    </div>
  );
}
