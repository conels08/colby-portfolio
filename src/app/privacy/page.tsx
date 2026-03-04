import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Colby Nelsen",
  description:
    "Privacy Policy for Colby Nelsen's portfolio website and services.",
  alternates: {
    canonical: "/privacy",
  },
};

const effectiveDate = "March 4, 2026";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-sm text-[var(--muted)]">Effective Date: {effectiveDate}</p>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Who We Are</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            This website is operated by Colby Nelsen, Newberg, Oregon, United
            States. If you have privacy-related questions or requests, contact{" "}
            <a className="underline" href="mailto:colbynelsen@gmail.com">
              colbynelsen@gmail.com
            </a>{" "}
            or call 503-984-5813.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Information We Collect</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            We collect information you choose to provide through:
          </p>
          <ul className="list-disc pl-6 text-[var(--muted)] space-y-2">
            <li>Contact form submissions (name, email, and message details)</li>
            <li>Newsletter signup submissions (email address)</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">How We Use Information</h2>
          <ul className="list-disc pl-6 text-[var(--muted)] space-y-2">
            <li>Respond to project inquiries and communication requests</li>
            <li>Send newsletter or business updates when you subscribe</li>
            <li>Operate, secure, and improve website communications</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">How Information Is Processed</h2>
          <ul className="list-disc pl-6 text-[var(--muted)] space-y-2">
            <li>
              Contact form messages are delivered by Resend to
              colbynelsen@gmail.com and are not stored in a database by this
              site.
            </li>
            <li>
              Newsletter subscriber data is stored in Supabase and notification
              emails are sent through Resend.
            </li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Cookies and Tracking</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            This website does not currently use advertising trackers or analytics
            tracking tools such as Google Analytics, Meta Pixel, or similar
            marketing technologies. Basic technical functionality (such as UI
            preferences stored in your browser) may use local browser storage.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Data Sharing and Selling</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            Personal information is not sold. Information is only shared with
            service providers needed to run the site and communications (for
            example, Supabase and Resend).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Your Rights and Requests</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            You may request access, correction, or deletion of your personal
            information by emailing colbynelsen@gmail.com. Requests are targeted
            to be handled within 30 days.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Intended Audience</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            The website is generally viewable by all ages, but professional
            services are intended for adults (18+) and businesses in the United
            States.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-2xl font-semibold">Policy Updates</h2>
          <p className="text-[var(--muted)] leading-relaxed">
            This Privacy Policy may be updated from time to time. The effective
            date above reflects the latest version.
          </p>
        </section>
      </div>
    </div>
  );
}
