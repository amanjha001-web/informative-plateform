import Container from "../components/common/Container";
import Header from "../components/layout/Header";
import SEO from "../components/common/SEO";

const Terms = () => {
  return (
    <>
      <SEO
        title="Terms & Conditions"
        description="Please read these Terms & Conditions carefully before using our website."
        canonical="/terms"
      />

      <main>
        <Header
          title="Terms & Conditions"
          description="Please read these terms carefully before using our website."
          breadcrumbs={[
            { label: "Home", path: "/" },
            { label: "Terms & Conditions" },
          ]}
        />

        <section className="section">
          <Container>
            <article className="mx-auto max-w-4xl">
              <div className="space-y-10">
                <section>
                  <h2 className="text-2xl font-bold text-[rgb(var(--foreground))]">
                    1. Acceptance of Terms
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-[rgb(var(--muted-foreground))]">
                    By accessing or using this website, you agree to be bound by
                    these Terms & Conditions. If you do not agree with any part
                    of these terms, please do not use the website.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-[rgb(var(--foreground))]">
                    2. Use of Website
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-[rgb(var(--muted-foreground))]">
                    You agree to use this website only for lawful purposes and
                    in a manner that does not interfere with the operation,
                    security, or availability of the website.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-[rgb(var(--foreground))]">
                    3. Content and Information
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-[rgb(var(--muted-foreground))]">
                    The content published on this website is intended for
                    general informational purposes. While we aim to provide
                    useful and accurate information, we do not guarantee that
                    all content is complete, current, or error-free.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-[rgb(var(--foreground))]">
                    4. Intellectual Property
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-[rgb(var(--muted-foreground))]">
                    Unless otherwise stated, the website, its original content,
                    design, graphics, branding, and other materials are
                    protected by applicable intellectual property laws.
                  </p>

                  <p className="mt-3 text-sm leading-7 text-[rgb(var(--muted-foreground))]">
                    You may not reproduce, distribute, modify, or republish
                    protected content without appropriate permission.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-[rgb(var(--foreground))]">
                    5. User Submissions
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-[rgb(var(--muted-foreground))]">
                    If you submit information through contact forms, feedback
                    forms, or other communication channels, you agree that the
                    information provided is accurate and does not violate the
                    rights of others.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-[rgb(var(--foreground))]">
                    6. External Links
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-[rgb(var(--muted-foreground))]">
                    Our website may contain links to third-party websites. We
                    are not responsible for the content, availability, security,
                    or privacy practices of external websites.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-[rgb(var(--foreground))]">
                    7. Disclaimer
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-[rgb(var(--muted-foreground))]">
                    The website and its content are provided on an "as is" and
                    "as available" basis. We make no warranties regarding the
                    availability, accuracy, reliability, or suitability of the
                    website for a particular purpose.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-[rgb(var(--foreground))]">
                    8. Limitation of Liability
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-[rgb(var(--muted-foreground))]">
                    To the extent permitted by applicable law, we will not be
                    responsible for losses or damages arising from your use of,
                    or inability to use, the website or its content.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-[rgb(var(--foreground))]">
                    9. Changes to These Terms
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-[rgb(var(--muted-foreground))]">
                    We may update these Terms & Conditions when necessary.
                    Updated terms will be published on this page and will become
                    effective when posted.
                  </p>
                </section>

                <section>
                  <h2 className="text-2xl font-bold text-[rgb(var(--foreground))]">
                    10. Contact Us
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-[rgb(var(--muted-foreground))]">
                    If you have questions about these Terms & Conditions, please
                    contact us through the Contact page.
                  </p>
                </section>

                <section className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--secondary))]/50 p-5 sm:p-6">
                  <p className="text-sm leading-6 text-[rgb(var(--muted-foreground))]">
                    By continuing to use this website, you acknowledge that you
                    have read and understood these Terms & Conditions.
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

export default Terms;
