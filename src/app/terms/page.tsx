import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Colby Nelsen",
  description: "Terms of Service for Colby Nelsen's portfolio website.",
  alternates: {
    canonical: "/terms",
  },
};

const effectiveDate = "March 4, 2026";

export default function TermsPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Terms of Service
        </h1>
        <p className="text-sm text-[var(--muted)]">Effective Date: {effectiveDate}</p>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Operator</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            These Terms are provided by Colby Nelsen, located in Newberg, Oregon,
            United States. Contact:{" "}
            <a className="underline" href="mailto:colbynelsen@gmail.com">
              colbynelsen@gmail.com
            </a>
            {" "}or 503-984-5813.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Use of Website</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            This site provides information about services and allows users to
            submit project inquiries. You agree to use the site lawfully and not
            misuse contact forms, attempt unauthorized access, impersonate others,
            scrape private information, or disrupt service.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Service Model</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            Services are inquiry-based. Submitting a form or scheduling a call
            does not create a binding service contract. Scope, timeline,
            deliverables, and payment terms are confirmed separately in writing.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Pricing and Estimates</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            Any pricing, timelines, or technical recommendations shown on the
            site or discussed prior to a signed agreement are estimates only and
            may change based on final scope and requirements.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Payments and Refunds</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            Work may be billed by project milestones. Refunds are limited to
            amounts paid for milestones that have not been delivered. Completed
            work and time already performed are non-refundable, except where
            required by law or otherwise agreed in writing.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Intellectual Property</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            Site content, branding, and original materials on this website are
            owned by Colby Nelsen unless otherwise noted. You may not copy,
            republish, or commercially exploit site content without permission.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Disclaimer</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            This website is provided on an "as is" and "as available" basis.
            While reasonable effort is made to maintain accurate information,
            no guarantee is made that the site will be uninterrupted or error-free.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Limitation of Liability</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            To the maximum extent permitted by law, Colby Nelsen is not liable
            for indirect, incidental, special, consequential, or punitive damages
            arising from use of this site.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Governing Law</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            These Terms are governed by the laws of the State of Oregon, USA.
            Any legal disputes will be resolved in courts located in Oregon.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Updates to Terms</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            These Terms may be updated periodically. Continued use of the site
            after changes means you accept the updated Terms.
          </p>
        </section>
      </div>
    </div>
  );
}
