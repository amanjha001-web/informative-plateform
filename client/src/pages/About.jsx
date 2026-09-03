import { BookOpen, Lightbulb, Target, Users } from "lucide-react";

import Container from "../components/common/Container";
import Header from "../components/layout/Header";

const About = () => {
  const values = [
    {
      icon: BookOpen,
      title: "Useful Information",
      description:
        "We focus on creating practical and easy-to-understand content that readers can actually use.",
    },
    {
      icon: Lightbulb,
      title: "Clear & Simple",
      description:
        "Complex topics are explained in a simple and accessible way without unnecessary complexity.",
    },
    {
      icon: Target,
      title: "Purpose Driven",
      description:
        "Every article is created with the goal of helping readers learn, understand, and make better decisions.",
    },
    {
      icon: Users,
      title: "For Everyone",
      description:
        "Our content is designed for students, professionals, beginners, and curious readers alike.",
    },
  ];

  return (
    <main>
      <Header
        title="About Us"
        description="Learn more about our mission, values, and commitment to providing useful information."
        breadcrumbs={[{ label: "Home", path: "/" }, { label: "About" }]}
      />

      {/* Introduction */}
      <section className="section">
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-[rgb(var(--primary))]">
              Who We Are
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[rgb(var(--foreground))] md:text-4xl">
              Information that helps you move forward
            </h2>

            <p className="mt-5 text-base leading-8 text-[rgb(var(--muted-foreground))]">
              InfoHub is an informative platform created to make useful
              knowledge easier to discover and understand. We cover topics
              across technology, business, education, health, lifestyle,
              finance, and more.
            </p>

            <p className="mt-4 text-base leading-8 text-[rgb(var(--muted-foreground))]">
              Our goal is simple: provide clear, practical, and valuable
              information that saves time and helps readers make informed
              decisions.
            </p>
          </div>
        </Container>
      </section>

      {/* Mission */}
      <section className="section bg-[rgb(var(--secondary))]/40">
        <Container>
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <span className="text-sm font-semibold uppercase tracking-wider text-[rgb(var(--primary))]">
                Our Mission
              </span>

              <h2 className="mt-3 text-3xl font-bold tracking-tight text-[rgb(var(--foreground))] md:text-4xl">
                Make knowledge easier to access
              </h2>

              <p className="mt-5 leading-8 text-[rgb(var(--muted-foreground))]">
                The internet contains a huge amount of information, but finding
                reliable and understandable content can be difficult. We aim to
                organize useful knowledge into simple, readable, and practical
                resources.
              </p>

              <p className="mt-4 leading-8 text-[rgb(var(--muted-foreground))]">
                From learning new skills to understanding everyday topics, our
                content is built to provide value without making things
                unnecessarily complicated.
              </p>
            </div>

            <div className="rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-8 shadow-sm">
              <Target
                size={42}
                className="text-[rgb(var(--primary))]"
                aria-hidden="true"
              />

              <h3 className="mt-6 text-xl font-semibold text-[rgb(var(--foreground))]">
                Our Vision
              </h3>

              <p className="mt-3 leading-7 text-[rgb(var(--muted-foreground))]">
                To become a trusted destination where people can quickly find
                useful information, learn something new, and discover ideas that
                make a meaningful difference in their everyday lives.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="section">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-sm font-semibold uppercase tracking-wider text-[rgb(var(--primary))]">
              What We Value
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[rgb(var(--foreground))] md:text-4xl">
              Built around useful content
            </h2>

            <p className="mt-4 leading-7 text-[rgb(var(--muted-foreground))]">
              Everything we create is guided by a few simple principles.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[rgb(var(--primary))]/30 hover:shadow-lg"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]">
                    <Icon size={23} strokeWidth={1.8} aria-hidden="true" />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-[rgb(var(--foreground))]">
                    {value.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[rgb(var(--muted-foreground))]">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </main>
  );
};

export default About;
