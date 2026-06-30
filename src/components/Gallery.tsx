import { getGalleryImages, getImageUrl } from "@/lib/gallery";

export async function Gallery() {
  const images = await getGalleryImages();

  return (
    <section id="gallery" className="bg-white py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-forest-600">
            Our Work
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-forest-950 sm:text-4xl">
            Project Gallery
          </h2>
          <p className="mt-4 text-lg text-stone-600">
            See the difference professional landscaping makes for Houston properties.
          </p>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image) => (
            <figure
              key={image.id}
              className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-stone-200"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getImageUrl(image)}
                alt={image.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-forest-950/90 to-transparent p-4 pt-12">
                <p className="font-semibold text-white">{image.title}</p>
                {image.description && (
                  <p className="text-sm text-forest-200">{image.description}</p>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
