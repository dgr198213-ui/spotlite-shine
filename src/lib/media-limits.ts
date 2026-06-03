import { supabase } from "@/integrations/supabase/client";

export type ArtistPlan = "spark" | "spotlight" | "headliner";

export interface MediaLimits {
  plan: ArtistPlan;
  max_images: number;
  max_videos: number;
  max_video_duration_seconds: number;
  max_video_size_mb: number;
}

export async function getMediaLimits(plan: ArtistPlan): Promise<MediaLimits | null> {
  const { data, error } = await supabase
    .from("media_limits")
    .select("*")
    .eq("plan", plan)
    .single();

  if (error) {
    console.error("Error fetching media limits:", error);
    return null;
  }

  return data as MediaLimits;
}

export const DEFAULT_MEDIA_LIMITS: MediaLimits = {
  plan: "spark",
  max_images: 5,
  max_videos: 1,
  max_video_duration_seconds: 10,
  max_video_size_mb: 20,
};
