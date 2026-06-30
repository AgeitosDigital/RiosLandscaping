import { SITE } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-stone-200 bg-white py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="text-center sm:text-left">
            <p className="font-display text-lg font-semibold text-forest-950">{SITE.name}</p>
            <p className="mt-1 text-sm text-stone-500">{SITE.location}</p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-sm text-stone-600">
            <a href={`tel:${SITE.phone}`} className="hover:text-forest-700">
              {SITE.phone}
            </a>
            <a href={`mailto:${SITE.email}`} className="hover:text-forest-700">
              {SITE.email}
            </a>
            <a
              href={`https://${SITE.domain}`}
              className="hover:text-forest-700"
              target="_blank"
              rel="noopener noreferrer"
            >
              {SITE.domain}
            </a>
          </div>
        </div>
        <p className="mt-8 text-center text-xs text-stone-400">
          © {year} {SITE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
