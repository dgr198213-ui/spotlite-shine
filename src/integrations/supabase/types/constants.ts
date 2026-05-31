// Enum constants for Supabase types
// Provides runtime access to enum values

export const Enums = {
  app_role: ["admin", "artist", "organizer"] as const,
  artist_category: [
    "musica",
    "teatro",
    "magia",
    "comedia",
    "danza",
    "dj",
    "circo",
    "arte",
    "foto_video",
  ] as const,
  artist_plan: ["spark", "spotlight", "headliner"] as const,
  media_type: ["image", "video"] as const,
} as const;

export const Constants = {
  public: {
    Enums,
  },
} as const;

// Type helpers for enums
export type AppRole = (typeof Enums.app_role)[number];
export type ArtistCategory = (typeof Enums.artist_category)[number];
export type ArtistPlan = (typeof Enums.artist_plan)[number];
export type MediaType = (typeof Enums.media_type)[number];