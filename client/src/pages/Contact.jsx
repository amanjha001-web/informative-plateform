import Container from "../components/common/Container";
import Header from "../components/layout/Header";
import SEO from "../components/common/SEO";

import ContactForm from "../components/contact/ContactForm";
import ContactInfo from "../components/contact/ContactInfo";
import ContactMap from "../components/contact/ContactMap";

import { APP_CONFIG } from "../constants/config";

const Contact = () => {
  const handleSubmit = async (formData) => {
    // Future API integration:
    // await contactService.sendMessage(formData);

    console.log("Contact form submitted:", formData);
  };

  return (
    <>
      <SEO
        title="Contact Us"
        description="Have a question, suggestion, or feedback? Get in touch with our team."
        canonical="/contact"
      />

      <main>
        <Header
          title="Contact Us"
          description="Have a question, suggestion, or feedback? We'd love to hear from you."
          breadcrumbs={[{ label: "Home", path: "/" }, { label: "Contact" }]}
        />

        {/* Contact Form + Information */}
        <section className="section">
          <Container>
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px] lg:items-start">
              {/* Form */}
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-[rgb(var(--foreground))] md:text-3xl">
                    Send us a message
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[rgb(var(--muted-foreground))]">
                    Fill out the form below and our team will get back to you as
                    soon as possible.
                  </p>
                </div>

                <ContactForm onSubmit={handleSubmit} />
              </div>

              {/* Contact Information */}
              <div>
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-[rgb(var(--foreground))]">
                    Get in touch
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[rgb(var(--muted-foreground))]">
                    You can also reach us directly using the information below.
                  </p>
                </div>

                <ContactInfo
                  email={APP_CONFIG.contact.email}
                  phone={APP_CONFIG.contact.phone}
                  address={APP_CONFIG.contact.address}
                />
              </div>
            </div>
          </Container>
        </section>

        {/* Map */}
        <section className="section bg-[rgb(var(--secondary))]/40">
          <Container>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-[rgb(var(--foreground))] md:text-3xl">
                Our Location
              </h2>

              <p className="mt-2 text-sm leading-6 text-[rgb(var(--muted-foreground))]">
                Find our location and get directions.
              </p>
            </div>

            <ContactMap
              embedUrl={APP_CONFIG.contact.map.embedUrl}
              mapUrl={APP_CONFIG.contact.map.mapUrl}
              address={APP_CONFIG.contact.address}
            />
          </Container>
        </section>
      </main>
    </>
  );
};

export default Contact;
