import { SITE } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden pt-20">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=1920&q=80')",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-forest-950/95 via-forest-950/80 to-forest-900/60" />

      <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="max-w-2xl">
          <p className="mb-4 inline-block rounded-full border border-forest-400/40 bg-forest-900/50 px-4 py-1.5 text-sm font-medium text-forest-200">
            Serving Houston &amp; Surrounding Areas
          </p>
          <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
            Transform Your Outdoor Space
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-forest-100 sm:text-xl">
            {SITE.tagline}. From lawn care to full landscape design, Rios Landscaping
            delivers quality work you can count on.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#quote"
              className="rounded-full bg-forest-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-forest-900/40 transition hover:bg-forest-400"
            >
              Get a Free Quote
            </a>
            <a
              href="#services"
              className="rounded-full border border-white/30 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur transition hover:bg-white/20"
            >
              Our Services
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
