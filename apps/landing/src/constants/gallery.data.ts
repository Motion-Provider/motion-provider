import type { GalleryItem } from "@/types/gallery.type";

export default [
  {
    id: "image-gallery",
    category: "Image Gallery",
    href: "/showcase/1",
    image: "/assets/gallery/1.gif",
    imageAlt: "Mountain lake surrounded by forest",
  },
  {
    id: "e-commerce",
    category: "E-commerce",
    href: "/showcase/2",
    image: "/assets/gallery/2.gif",
    imageAlt: "Minimalist wristwatch on a neutral background",
  },
  {
    id: "marketing-agency",
    category: "Marketing Agency",
    href: "/showcase/3",
    image: "/assets/gallery/3.gif",
    imageAlt: "Bright modern office interior",
  },
] as const satisfies readonly GalleryItem[];
