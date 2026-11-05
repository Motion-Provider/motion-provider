import type { LucideIcon } from "lucide-react";

export type GalleryItem = {
  id: string;
  category: string;
  title: string;
  description: string;
  href: string;
  image: string;
  imageAlt: string;
  tags: readonly string[];
  icon: LucideIcon;
};
