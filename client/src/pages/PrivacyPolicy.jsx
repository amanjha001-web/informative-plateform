import Container from "../components/common/Container";
import Header from "../components/layout/Header";
import SEO from "../components/common/SEO";

const PrivacyPolicy = () => {
  return (
    <>
      <SEO
        title="Privacy Policy"
        description="Learn how we collect, use, protect, and manage your information."
        canonical="/privacy-policy"
      />

      <main>
        <Header
          title="Privacy Policy"
          description="Learn how we collect, use, protect, and manage your information."
          breadcrumbs={[
            { label: "Home", path: "/" },
            { label: "Privacy Policy" },
          ]}
        />

        <section className="section">
          <Container>
            <article className="mx-auto max-w-4xl">
              <div className="space-y-10">
                <section>
                  <h2 className="text-2xl font-bold text-[rgb(var(--foreground))]">
                    1. Introduction
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-[rgb(var(--muted-foreground))]">
                    Welcome to our website. We respect your privacy and are
                    committed to protecting the information you share with us.
                    This Privacy Policy explains what information we may
                    collect, how we use it, and the choices available to you.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-[rgb(var(--foreground))]">
                    2. Information We Collect
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-[rgb(var(--muted-foreground))]">
                    We may collect information that you voluntarily provide,
                    such as your name, email address, and messages submitted
                    through our contact or newsletter forms.
                  </p>

                  <p className="mt-3 text-sm leading-7 text-[rgb(var(--muted-foreground))]">
                    We may also collect limited technical information such as
                    browser type, device information, and general usage data to
                    help us improve the website.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-[rgb(var(--foreground))]">
                    3. How We Use Your Information
                  </h2>

                  <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-[rgb(var(--muted-foreground))]">
                    <li>To respond to your questions and requests.</li>
                    <li>To provide newsletters or requested updates.</li>
                    <li>To improve our website and content.</li>
                    <li>To maintain website security and reliability.</li>
                    <li>
                      To understand general website usage and performance.
                    </li>
                  </ul>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-[rgb(var(--foreground))]">
                    4. Cookies and Similar Technologies
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-[rgb(var(--muted-foreground))]">
                    Our website may use cookies or similar technologies to
                    remember preferences, improve functionality, and understand
                    how visitors interact with the website.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-[rgb(var(--foreground))]">
                    5. Data Protection
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-[rgb(var(--muted-foreground))]">
                    We take reasonable measures to protect information from
                    unauthorized access, alteration, disclosure, or destruction.
                    However, no internet-based service can guarantee absolute
                    security.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-[rgb(var(--foreground))]">
                    6. Third-Party Services
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-[rgb(var(--muted-foreground))]">
                    We may use third-party services for analytics, hosting,
                    communication, or other website functionality. These
                    services may process information according to their own
                    privacy policies.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-[rgb(var(--foreground))]">
                    7. Your Choices
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-[rgb(var(--muted-foreground))]">
                    You may contact us to ask questions about the information we
                    hold about you or to request appropriate changes where
                    applicable.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-[rgb(var(--foreground))]">
                    8. Policy Updates
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-[rgb(var(--muted-foreground))]">
                    We may update this Privacy Policy from time to time. Any
                    changes will be reflected on this page with the latest
                    version of the policy.
                  </p>
                </section>

                <section className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--secondary))]/50 p-5 sm:p-6">
                  <h2 className="text-lg font-semibold text-[rgb(var(--foreground))]">
                    Questions about privacy?
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[rgb(var(--muted-foreground))]">
                    If you have any questions regarding this Privacy Policy,
                    please contact us through our Contact page.
                  </p>
                </section>
              </div>
            </article>
          </Container>
        </section>
      </main>
    </>
  );
};

export default PrivacyPolicy;
