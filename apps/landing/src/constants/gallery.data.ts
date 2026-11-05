import { Camera, Megaphone, ShoppingBag } from "lucide-react";
import type { GalleryItem } from "@/types/gallery.type";

export default [
  {
    id: "image-gallery",
    category: "Image Gallery",
    title: "Find beauty in the ordinary.",
    description:
      "An Unsplash and Pexels style photo archive with a bento grid that reveals frame by frame.",
    href: "/showcase/1",
    image:
      "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Mountain lake surrounded by forest",
    tags: ["MotionImage", "MotionText", "Bento grid"],
    icon: Camera,
  },
  {
    id: "e-commerce",
    category: "E-commerce",
    title: "Product listing that sells itself.",
    description:
      "A storefront with an animated product listing, staggered cards and calm price reveals.",
    href: "/showcase/2",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Minimalist wristwatch on a neutral background",
    tags: ["MotionChain", "MotionContainer", "Product grid"],
    icon: ShoppingBag,
  },
  {
    id: "marketing-agency",
    category: "Marketing Agency",
    title: "A quieter kind of luxury.",
    description:
      "An agency site with editorial case studies, scroll driven headlines and masked reveals.",
    href: "/showcase/3",
    image:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=85",
    imageAlt: "Bright modern office interior",
    tags: ["MotionText", "Scroll motion", "Case studies"],
    icon: Megaphone,
  },
] as const satisfies readonly GalleryItem[];
