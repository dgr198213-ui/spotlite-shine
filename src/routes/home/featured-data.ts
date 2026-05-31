// Featured artists data for home page
import artist1 from "@/assets/artist-1.jpg";
import artist2 from "@/assets/artist-2.jpg";
import artist3 from "@/assets/artist-3.jpg";

export const featuredArtists = [
  {
    name: "Lucía Reverb",
    role: "Cantautora",
    city: "Madrid",
    price: "Desde 350€",
    rating: 4.9,
    reviews: 87,
    img: artist1,
  },
  {
    name: "Carlos Groove",
    role: "DJ",
    city: "Barcelona",
    price: "Desde 480€",
    rating: 4.8,
    reviews: 124,
    img: artist2,
  },
  {
    name: "Ana Mística",
    role: "Maga",
    city: "Valencia",
    price: "Desde 290€",
    rating: 5.0,
    reviews: 56,
    img: artist3,
  },
] as const;