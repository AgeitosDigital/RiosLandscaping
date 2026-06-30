import { SITE } from "@/lib/constants";

const STATS = [
  { value: "10+", label: "Years Experience" },
  { value: "500+", label: "Projects Completed" },
  { value: "100%", label: "Satisfaction Focused" },
];

export function About() {
  return (
    <section id="about" className="bg-forest-950 py-20 text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-forest-400">
              About Us
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">
              Houston&apos;s Trusted Landscaping Team
            </h2>
            <p className="mt-6 leading-relaxed text-forest-100">
              Rios Landscaping is a family-owned business serving the greater Houston area.
              We take pride in honest pricing, reliable scheduling, and craftsmanship that
              stands up to Texas weather.
            </p>
            <p className="mt-4 leading-relaxed text-forest-100">
              Whether you need routine lawn maintenance or a complete outdoor makeover, our
              crew brings the tools, experience, and attention to detail your property deserves.
            </p>
            <p className="mt-6 font-medium text-forest-300">{SITE.location}</p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-forest-800 bg-forest-900/50 p-6 text-center"
              >
                <p className="font-display text-3xl font-bold text-forest-300">{stat.value}</p>
                <p className="mt-1 text-sm text-forest-200">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
