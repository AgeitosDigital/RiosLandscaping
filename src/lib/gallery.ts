import { createClient } from "@/lib/supabase/server";
import type { GalleryImage } from "@/types/database";

const FALLBACK_GALLERY: GalleryImage[] = [
  {
    id: "fallback-1",
    title: "Modern Front Yard",
    description: "Clean lines and native Texas plants",
    storage_path: "modern-front-yard.jpg",
    image_url:
      "https://images.unsplash.com/photo-1656646549794-17ce57191582?w=1920&q=85&auto=format&fit=crop",
    display_order: 1,
    is_featured: true,
    created_at: new Date().toISOString(),
  },
];

export function getImageUrl(image: GalleryImage): string {
  if (image.image_url) {
    return image.image_url;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (!supabaseUrl) {
    return FALLBACK_GALLERY[0].image_url!;
  }

  return `${supabaseUrl}/storage/v1/object/public/portfolio/${image.storage_path}`;
}

export async function getGalleryImages(): Promise<GalleryImage[]> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey || supabaseKey === "your_supabase_anon_key_here") {
    return FALLBACK_GALLERY;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("gallery_images")
      .select("*")
      .order("display_order", { ascending: true });

    if (error || !data?.length) return FALLBACK_GALLERY;
    return data as GalleryImage[];
  } catch {
    return FALLBACK_GALLERY;
  }
}
