// ─── Constants ──────────────────────────────────────────────────────────────

export const ARTIST_CATS = [
  ["musica", "Música"],
  ["teatro", "Teatro"],
  ["magia", "Magia"],
  ["comedia", "Comedia"],
  ["danza", "Danza"],
  ["dj", "DJ"],
  ["circo", "Circo"],
  ["arte", "Arte"],
  ["foto_video", "Foto / Vídeo"],
] as const;

export const ARTIST_PERKS = [
  "Perfil profesional con foto, descripción y precio",
  "Sin permanencia ni comisiones por contrato",
  "Aparece en el explorador de talento",
  "Acceso prioritario al plan Standard cuando se abra",
];

export const ORGANIZER_PERKS = [
  "Acceso a la agenda cultural de Escénika",
  "Busca y guarda artistas en favoritos",
  "Publica tus eventos y recibe solicitudes",
  "Comunícate directamente con los artistas",
];

export type UserRole = "artist" | "organizer";

export interface SignupFormData {
  name: string;
  category: string;
  city: string;
  email: string;
  password: string;
  company: string;
}

export const DEFAULT_FORM: SignupFormData = {
  name: "",
  category: "",
  city: "",
  email: "",
  password: "",
  company: "",
};

export type SignupStep = 1 | 2 | 3;