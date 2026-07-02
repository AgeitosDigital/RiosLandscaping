"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/Logo";
import { NAV_LINKS } from "@/lib/constants";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-forest-950/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="group shrink-0 transition-opacity hover:opacity-90">
          <Logo height={52} />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-forest-100 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#quote"
            className="rounded-full bg-forest-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-forest-400"
          >
            Free Quote
          </a>
        </nav>

        <button
          type="button"
          className="md:hidden rounded-lg p-2 text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {open ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-white/10 bg-forest-950 px-4 py-4 md:hidden">
          <div className="flex flex-col gap-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-forest-100 hover:bg-white/5"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#quote"
              className="rounded-full bg-forest-500 px-5 py-3 text-center font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              Free Quote
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
