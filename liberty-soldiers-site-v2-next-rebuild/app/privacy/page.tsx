// app/privacy/page.tsx
import type { Metadata } from "next";

const SITE_URL = "https://libertysoldiers.com";

export const metadata: Metadata = {
  title: "Privacy Policy | Liberty Soldiers",
  description:
    "Privacy Policy for Liberty Soldiers, including analytics, cookies, email signup, and advertising disclosures.",
  alternates: {
    canonical: `${SITE_URL}/privacy`,
  },
  openGraph: {
    title: "Privacy Policy | Liberty Soldiers",
    description:
      "Privacy Policy for Liberty Soldiers, including analytics, cookies, email signup, and advertising disclosures.",
    url: `${SITE_URL}/privacy`,
    siteName: "Liberty Soldiers",
    type: "article",
    images: [
      {
        url: "/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Liberty Soldiers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Liberty Soldiers",
    description:
      "Privacy Policy for Liberty Soldiers, including analytics, cookies, email signup, and advertising disclosures.",
    images: ["/og-default.jpg"],
  },
};

export default function PrivacyPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 border-b border-zinc-200 pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          Privacy Policy
        </h1>
        <p className="mt-3 text-sm text-zinc-600">
          Effective date: {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="prose prose-zinc max-w-none">
        <p>
          Liberty Soldiers respects your privacy. This Privacy Policy explains
          what information may be collected when you visit this website, how
          that information may be used, and what choices you may have.
        </p>

        <h2>Information We Collect</h2>
        <p>We may collect limited information in the following ways:</p>
        <ul>
          <li>
            Information you voluntarily provide, such as your email address if
            you subscribe to updates.
          </li>
          <li>
            Basic analytics and technical data such as browser type, device
            type, pages viewed, referring pages, and general usage data.
          </li>
          <li>
            Cookies and similar technologies used for site performance,
            analytics, and advertising.
          </li>
        </ul>

        <h2>How We Use Information</h2>
        <p>Information collected may be used to:</p>
        <ul>
          <li>Operate, maintain, and improve the website.</li>
          <li>Understand how visitors use the site.</li>
          <li>Send email updates to subscribers who opt in.</li>
          <li>Measure traffic, engagement, and site performance.</li>
          <li>Display and manage advertising.</li>
        </ul>

        <h2>Analytics</h2>
        <p>
          Liberty Soldiers may use analytics tools, including Google Analytics,
          to better understand traffic and user behavior on the site. These
          tools may collect information such as pages visited, approximate
          location, time on site, device type, and referral sources.
        </p>

        <h2>Advertising</h2>
        <p>
          This site may use Google AdSense and other advertising services to
          display ads. These services may use cookies or similar technologies to
          serve ads based on your visit to this site and other sites on the
          internet.
        </p>
        <p>
          Google may use advertising cookies to help serve ads based on users’
          prior visits to this website or other websites. Users may be able to
          manage ad personalization through Google’s ad settings.
        </p>

        <h2>Cookies</h2>
        <p>
          Cookies are small files stored on your device that help websites
          function properly, remember preferences, measure performance, and
          support analytics and advertising. You can usually control cookies
          through your browser settings.
        </p>

        <h2>Email Communications</h2>
        <p>
          If you subscribe to Liberty Soldiers emails, your email address may be
          used to send updates, briefings, or announcements related to site
          content. You may unsubscribe at any time using the unsubscribe link in
          the email, if available, or by contacting us directly.
        </p>

        <h2>Third-Party Links</h2>
        <p>
          This website may link to third-party websites, articles, videos, or
          platforms. Liberty Soldiers is not responsible for the privacy
          practices or content of third-party sites.
        </p>

        <h2>Data Security</h2>
        <p>
          Reasonable measures may be taken to protect information, but no method
          of transmission or storage is completely secure. Use of the site is at
          your own risk.
        </p>

        <h2>Your Choices</h2>
        <p>You may be able to:</p>
        <ul>
          <li>Disable cookies in your browser settings.</li>
          <li>Opt out of certain analytics or advertising features.</li>
          <li>Unsubscribe from email communications.</li>
        </ul>

        <h2>Children’s Privacy</h2>
        <p>
          This site is not intended for children under 13, and we do not
          knowingly collect personal information from children under 13.
        </p>

        <h2>Changes to This Policy</h2>
        <p>
          This Privacy Policy may be updated from time to time. Any changes will
          be posted on this page with an updated effective date.
        </p>

        <h2>Contact</h2>
        <p>
          For privacy-related questions, contact:{" "}
          <a href="mailto:briefings@libertysoldiers.com">
            briefings@libertysoldiers.com
          </a>
        </p>
      </div>
    </main>
  );
}
