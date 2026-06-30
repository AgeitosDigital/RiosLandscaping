-- Support external stock URLs until client photos are uploaded to Storage
alter table public.gallery_images
  add column if not exists image_url text;

comment on column public.gallery_images.image_url is
  'Optional external URL for stock/placeholder images. Clear when replacing with a file in the portfolio bucket.';
comment on column public.gallery_images.storage_path is
  'Filename in the portfolio bucket (e.g. modern-front-yard.jpg). Used once image_url is cleared.';

-- Seed gallery with high-res stock images (replace image_url + storage_path with your own uploads later)
insert into public.gallery_images (title, description, storage_path, image_url, display_order, is_featured)
values
  (
    'Modern Front Yard',
    'Clean lines and native Texas plants',
    'modern-front-yard.jpg',
    'https://images.unsplash.com/photo-1656646549794-17ce57191582?w=1920&q=85&auto=format&fit=crop',
    1,
    true
  ),
  (
    'Backyard Oasis',
    'Patio, lighting, and lush greenery',
    'backyard-oasis.jpg',
    'https://images.unsplash.com/photo-1721222204525-1118ce3860e1?w=1920&q=85&auto=format&fit=crop',
    2,
    true
  ),
  (
    'Commercial Property',
    'Professional grounds maintenance',
    'commercial-property.jpg',
    'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1920&q=85&auto=format&fit=crop',
    3,
    false
  ),
  (
    'Stone Walkway',
    'Hardscaping with natural stone',
    'stone-walkway.jpg',
    'https://images.pexels.com/photos/32220309/pexels-photo-32220309.jpeg?auto=compress&cs=tinysrgb&w=1920',
    4,
    false
  ),
  (
    'Garden Beds',
    'Colorful seasonal plantings',
    'garden-beds.jpg',
    'https://images.pexels.com/photos/33189479/pexels-photo-33189479.jpeg?auto=compress&cs=tinysrgb&w=1920',
    5,
    false
  ),
  (
    'Lawn Care',
    'Healthy lawns and garden maintenance',
    'lawn-care.jpg',
    'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=1920&q=85&auto=format&fit=crop',
    6,
    false
  )
on conflict do nothing;
