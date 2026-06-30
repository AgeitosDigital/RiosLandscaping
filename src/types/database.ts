export type QuoteRequest = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  address: string | null;
  service_type: string;
  message: string;
  status: "new" | "contacted" | "quoted" | "closed";
  created_at: string;
};

export type GalleryImage = {
  id: string;
  title: string;
  description: string | null;
  storage_path: string;
  display_order: number;
  is_featured: boolean;
  created_at: string;
};

export type ServiceType =
  | "lawn-care"
  | "landscape-design"
  | "hardscaping"
  | "irrigation"
  | "tree-shrub"
  | "seasonal-cleanup"
  | "other";
