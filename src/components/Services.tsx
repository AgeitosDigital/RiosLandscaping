import { SERVICES } from "@/lib/constants";

export function Services() {
  return (
    <section id="services" className="bg-stone-50 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-forest-600">
            What We Do
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold text-forest-950 sm:text-4xl">
            Landscaping Services
          </h2>
          <p className="mt-4 text-lg text-stone-600">
            Full-service landscaping tailored to Houston&apos;s climate and your property&apos;s needs.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service) => (
            <article
              key={service.id}
              className="group rounded-2xl border border-stone-200 bg-white p-6 shadow-sm transition hover:border-forest-300 hover:shadow-md"
            >
              <span className="text-3xl" role="img" aria-hidden>
                {service.icon}
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold text-forest-950">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-stone-600">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
