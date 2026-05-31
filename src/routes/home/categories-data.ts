// Category data for home page
import {
  Music,
  Drama,
  Wand2,
  Mic2,
  Sparkles as SparklesIcon,
  Disc3,
  Palette,
  Camera,
} from "lucide-react";

export const categories = [
  { icon: Music, label: "Música" },
  { icon: Drama, label: "Teatro" },
  { icon: Wand2, label: "Magia" },
  { icon: Mic2, label: "Comedia" },
  { icon: SparklesIcon, label: "Danza" },
  { icon: Disc3, label: "DJ" },
  { icon: Palette, label: "Arte" },
  { icon: Camera, label: "Foto/Vídeo" },
] as const;