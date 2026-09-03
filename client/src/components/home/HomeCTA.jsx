import { ArrowRight, BookOpen, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

import Container from "../common/Container";

const HomeCTA = ({
  title = "Ready to Explore More?",
  description = "Discover useful articles, practical guides, and reliable information across a wide range of topics.",
  primaryText = "Explore Articles",
  primaryLink = "/articles",
  secondaryText = "Contact Us",
  secondaryLink = "/contact",
}) => {
  return (
    <section className="pb-16 md:pb-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-[rgb(var(--border))] bg-[rgb(var(--primary))] px-6 py-12 text-center shadow-xl sm:px-10 md:px-16 md:py-16">
          {/* Decorative Background */}
          <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />

          <div className="pointer-events-none absolute -bottom-28 -right-20 h-72 w-72 rounded-full bg-black/10 blur-3xl" />

          <div className="relative mx-auto max-w-3xl">
            {/* Icon */}
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white">
              <BookOpen size={27} strokeWidth={1.8} />
            </div>

            {/* Content */}
            <h2 className="mt-6 text-2xl font-bold tracking-tight text-[rgb(var(--primary-foreground))] sm:text-3xl md:text-4xl">
              {title}
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-[rgb(var(--primary-foreground))]/80 sm:text-base">
              {description}
            </p>

            {/* Actions */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to={primaryLink}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[rgb(var(--background))] px-5 text-sm font-semibold text-[rgb(var(--foreground))] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg sm:w-auto"
              >
                <BookOpen size={17} />
                {primaryText}
                <ArrowRight size={16} />
              </Link>

              <Link
                to={secondaryLink}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/10 px-5 text-sm font-semibold text-[rgb(var(--primary-foreground))] transition-all duration-200 hover:-translate-y-0.5 hover:bg-white/15 sm:w-auto"
              >
                <MessageCircle size={17} />
                {secondaryText}
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default HomeCTA;
