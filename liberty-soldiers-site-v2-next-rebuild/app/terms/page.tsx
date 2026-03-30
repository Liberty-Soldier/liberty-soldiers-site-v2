// app/terms/page.tsx
import type { Metadata } from "next";

const SITE_URL = "https://libertysoldiers.com";

export const metadata: Metadata = {
  title: "Terms of Use | Liberty Soldiers",
  description:
    "Terms of Use for Liberty Soldiers, including content, external links, disclaimers, and site usage terms.",
  alternates: {
    canonical: `${SITE_URL}/terms`,
  },
  openGraph: {
    title: "Terms of Use | Liberty Soldiers",
    description:
      "Terms of Use for Liberty Soldiers, including content, external links, disclaimers, and site usage terms.",
    url: `${SITE_URL}/terms`,
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
    title: "Terms of Use | Liberty Soldiers",
    description:
      "Terms of Use for Liberty Soldiers, including content, external links, disclaimers, and site usage terms.",
    images: ["/og-default.jpg"],
  },
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8 border-b border-zinc-200 pb-6">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl">
          Terms of Use
        </h1>
        <p className="mt-3 text-sm text-zinc-600">
          Effective date: {new Date().toLocaleDateString()}
        </p>
      </div>

      <div className="prose prose-zinc max-w-none">
        <p>
          By accessing and using Liberty Soldiers, you agree to these Terms of
          Use. If you do not agree with these terms, please do not use this
          website.
        </p>

        <h2>Use of This Website</h2>
        <p>
          Liberty Soldiers provides news aggregation, analysis, commentary, and
          informational content. Content is provided for general informational
          purposes only and may be updated, changed, or removed at any time
          without notice.
        </p>

        <h2>No Professional Advice</h2>
        <p>
          Nothing on this site constitutes legal, financial, medical, or other
          professional advice. Visitors should use their own judgment and verify
          information independently where appropriate.
        </p>

        <h2>Editorial and Opinion Content</h2>
        <p>
          Some content on Liberty Soldiers may include analysis, interpretation,
          commentary, or opinion. Views expressed on this site should not be
          understood as statements of objective fact in every instance.
        </p>

        <h2>Accuracy of Information</h2>
        <p>
          While Liberty Soldiers aims to provide timely and useful information,
          no representation or warranty is made regarding the completeness,
          accuracy, reliability, or timeliness of any content. Information may
          become outdated or may contain errors.
        </p>

        <h2>External Links</h2>
        <p>
          This site may include links to third-party websites, articles,
          platforms, videos, or services. Liberty Soldiers does not control and
          is not responsible for the content, policies, or practices of third
          parties. Visiting third-party sites is done at your own risk.
        </p>

        <h2>Intellectual Property</h2>
        <p>
          Unless otherwise stated, original text, branding, design elements, and
          site content created by Liberty Soldiers are the property of Liberty
          Soldiers and may not be reproduced, republished, or redistributed
          without permission.
        </p>
        <p>
          Third-party trademarks, logos, article titles, and linked content
          remain the property of their respective owners.
        </p>

        <h2>Permitted Use</h2>
        <p>You agree not to:</p>
        <ul>
          <li>Use the site for unlawful purposes.</li>
          <li>Attempt to disrupt, damage, or impair site functionality.</li>
          <li>Copy or scrape large portions of content without permission.</li>
          <li>Misrepresent Liberty Soldiers or its content.</li>
        </ul>

        <h2>Disclaimer of Warranties</h2>
        <p>
          This site is provided on an “as is” and “as available” basis without
          warranties of any kind, express or implied.
        </p>

        <h2>Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, Liberty Soldiers shall not be
          liable for any direct, indirect, incidental, consequential, or special
          damages arising out of or related to the use of this website or
          reliance on any content found on it.
        </p>

        <h2>Changes to These Terms</h2>
        <p>
          These Terms of Use may be updated from time to time. Continued use of
          the site after updates are posted constitutes acceptance of the
          revised terms.
        </p>

        <h2>Contact</h2>
        <p>
          For questions regarding these terms, contact:{" "}
          <a href="mailto:briefings@libertysoldiers.com">
            briefings@libertysoldiers.com
          </a>
        </p>
      </div>
    </main>
  );
}
