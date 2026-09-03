import Container from "../components/common/Container";
import Header from "../components/layout/Header";
import FAQList from "../components/faq/FAQList";
import SEO from "../components/common/SEO";

import  faqs  from "../data/faq";

const FAQ = () => {
  return (
    <>
      <SEO
        title="Frequently Asked Questions"
        description="Find answers to common questions about our articles, content, support, and newsletter."
        canonical="/faq"
      />

      <main>
        <Header
          title="Frequently Asked Questions"
          description="Find answers to common questions about our articles, content, support, and newsletter."
          breadcrumbs={[{ label: "Home", path: "/" }, { label: "FAQ" }]}
        />

        <section className="section">
          <Container>
            <div className="mx-auto max-w-3xl">
              {faqs.length > 0 ? (
                <FAQList faqs={faqs} showCategoryFilter />
              ) : (
                <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-6 py-16 text-center">
                  <h2 className="text-xl font-semibold text-[rgb(var(--foreground))]">
                    No FAQs available
                  </h2>

                  <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[rgb(var(--muted-foreground))]">
                    Frequently asked questions will appear here once they are
                    available.
                  </p>
                </div>
              )}
            </div>
          </Container>
        </section>
      </main>
    </>
  );
};

export default FAQ;
