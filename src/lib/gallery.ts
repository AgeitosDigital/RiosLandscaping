import { createClient } from "@/lib/supabase/server";
import type { GalleryImage } from "@/types/database";

const PLACEHOLDER_GALLERY: GalleryImage[] = [
  {
    id: "1",
    title: "Modern Front Yard",
    description: "Clean lines and native Texas plants",
    storage_path: "placeholder-1",
    display_order: 1,
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Backyard Oasis",
    description: "Patio, lighting, and lush greenery",
    storage_path: "placeholder-2",
    display_order: 2,
    is_featured: true,
    created_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Commercial Property",
    description: "Professional grounds maintenance",
    storage_path: "placeholder-3",
    display_order: 3,
    is_featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Stone Walkway",
    description: "Hardscaping with natural stone",
    storage_path: "placeholder-4",
    display_order: 4,
    is_featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "5",
    title: "Garden Beds",
    description: "Colorful seasonal plantings",
    storage_path: "placeholder-5",
    display_order: 5,
    is_featured: false,
    created_at: new Date().toISOString(),
  },
  {
    id: "6",
    title: "Irrigation Install",
    description: "Efficient sprinkler system setup",
    storage_path: "placeholder-6",
    display_order: 6,
    is_featured: false,
    created_at: new Date().toISOString(),
  },
];

const PLACEHOLDER_IMAGES: Record<string, string> = {
  "placeholder-1":
    "https://images.unsplash.com/photo-1558904541-efa8a7960bda?w=800&q=80",
  "placeholder-2":
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  "placeholder-3":
    "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=800&q=80",
  "placeholder-4":
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
  "placeholder-5":
    "https://images.unsplash.com/photo-1598902108854-10e335adac99?w=800&q=80",
  "placeholder-6":
    "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800&q=80",
};

export function getImageUrl(image: GalleryImage): string {
  if (image.storage_path.startsWith("placeholder")) {
    return PLACEHOLDER_IMAGES[image.storage_path] ?? PLACEHOLDER_IMAGES["placeholder-1"];
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) return PLACEHOLDER_IMAGES["placeholder-1"];

  return `${supabaseUrl}/storage/v1/object/public/portfolio/${image.storage_path}`;
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey || supabaseKey === "your_supabase_anon_key_here") {
    return PLACEHOLDER_GALLERY;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .order("display_order", { ascending: true });

    if (error || !data?.length) return PLACEHOLDER_GALLERY;
    return data as GalleryImage[];
  } catch {
    return PLACEHOLDER_GALLERY;
  }
}
