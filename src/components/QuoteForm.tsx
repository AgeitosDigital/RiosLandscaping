"use client";

import { useActionState } from "react";
import { submitQuoteRequest, type QuoteFormState } from "@/app/actions/quote";
import { SERVICES, SITE } from "@/lib/constants";

const initialState: QuoteFormState = { success: false, message: "" };

export function QuoteForm() {
  const [state, formAction, pending] = useActionState(submitQuoteRequest, initialState);

  return (
    <section id="quote" className="bg-stone-50 py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-forest-600">
              Get Started
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold text-forest-950 sm:text-4xl">
              Request a Free Quote
            </h2>
            <p className="mt-4 text-lg text-stone-600">
              Tell us about your project and we&apos;ll get back to you within one business day
              with a personalized estimate.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3 text-stone-700">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-100 text-forest-700">
                  📞
                </span>
                <div>
                  <p className="text-sm text-stone-500">Phone</p>
                  <a href={`tel:${SITE.phone}`} className="font-semibold hover:text-forest-700">
                    {SITE.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-3 text-stone-700">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-forest-100 text-forest-700">
                  ✉️
                </span>
                <div>
                  <p className="text-sm text-stone-500">Email</p>
                  <a href={`mailto:${SITE.email}`} className="font-semibold hover:text-forest-700">
                    {SITE.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          <form
            action={formAction}
            className="rounded-2xl border border-stone-200 bg-white p-6 shadow-sm sm:p-8"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="fullName" className="block text-sm font-medium text-stone-700">
                  Full Name *
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  className="mt-1 w-full rounded-lg border border-stone-300 px-4 py-2.5 text-stone-900 focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-500/20"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-stone-700">
                  Email *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 w-full rounded-lg border border-stone-300 px-4 py-2.5 text-stone-900 focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-500/20"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-stone-700">
                  Phone *
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="mt-1 w-full rounded-lg border border-stone-300 px-4 py-2.5 text-stone-900 focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-500/20"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-stone-700">
                  Property Address
                </label>
                <input
                  id="address"
                  name="address"
                  type="text"
                  placeholder="Street, City, ZIP"
                  className="mt-1 w-full rounded-lg border border-stone-300 px-4 py-2.5 text-stone-900 focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-500/20"
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="serviceType" className="block text-sm font-medium text-stone-700">
                  Service Needed *
                </label>
                <select
                  id="serviceType"
                  name="serviceType"
                  required
                  className="mt-1 w-full rounded-lg border border-stone-300 px-4 py-2.5 text-stone-900 focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-500/20"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  {SERVICES.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title}
                    </option>
                  ))}
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="message" className="block text-sm font-medium text-stone-700">
                  Project Details *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Tell us about your yard, timeline, and any specific goals..."
                  className="mt-1 w-full rounded-lg border border-stone-300 px-4 py-2.5 text-stone-900 focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-500/20"
                />
              </div>
            </div>

            {state.message && (
              <p
                className={`mt-4 rounded-lg px-4 py-3 text-sm ${
                  state.success
                    ? "bg-forest-50 text-forest-800"
                    : "bg-red-50 text-red-800"
                }`}
                role="status"
              >
                {state.message}
              </p>
            )}

            <button
              type="submit"
              disabled={pending}
              className="mt-6 w-full rounded-full bg-forest-600 py-3.5 font-semibold text-white transition hover:bg-forest-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? "Sending..." : "Submit Quote Request"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
