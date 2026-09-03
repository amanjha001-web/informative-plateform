import { ArrowRight, Search } from "lucide-react";
import { Link } from "react-router-dom";

import Container from "../common/Container";
import Button from "../common/Button";
import { APP_CONFIG } from "../../constants/config";

const Hero = ({
  title = "Discover Useful Information That Matters",
  description = APP_CONFIG.description,
  primaryText = "Explore Articles",
  primaryPath = "/articles",
  secondaryText = "Browse Categories",
  secondaryPath = "/categories",
}) => {
  return (
    <section className="relative overflow-hidden border-b border-[rgb(var(--border))]">
      {/* Background Decoration */}
      <div
        className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[rgb(var(--primary))]/10 blur-3xl"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute -bottom-40 -right-32 h-96 w-96 rounded-full bg-[rgb(var(--primary))]/5 blur-3xl"
        aria-hidden="true"
      />

      <Container>
        <div className="relative mx-auto flex min-h-[480px] max-w-4xl flex-col items-center justify-center py-16 text-center sm:min-h-[520px] sm:py-20 md:min-h-[600px] md:py-24">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--secondary))] px-3.5 py-1.5 text-xs font-medium text-[rgb(var(--muted-foreground))]">
            <span className="h-1.5 w-1.5 rounded-full bg-[rgb(var(--primary))]" />
            Trusted Information & Resources
          </div>

          {/* Heading */}
          <h1 className="max-w-4xl text-3xl font-bold tracking-tight text-[rgb(var(--foreground))] sm:text-5xl md:text-6xl md:leading-[1.08]">
            {title}
          </h1>

          {/* Description */}
          <p className="mt-5 max-w-2xl text-sm leading-6 text-[rgb(var(--muted-foreground))] sm:mt-6 sm:text-lg md:text-xl md:leading-7">
            {description}
          </p>

          {/* Actions */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to={primaryPath}>
              <Button size="lg">
                {primaryText}
                <ArrowRight size={18} />
              </Button>
            </Link>

            <Link to={secondaryPath}>
              <Button size="lg" variant="outline">
                {secondaryText}
              </Button>
            </Link>
          </div>

          {/* Search CTA */}
          {APP_CONFIG.features.search && (
            <Link
              to="/search"
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[rgb(var(--muted-foreground))] transition-colors hover:text-[rgb(var(--primary))]"
            >
              <Search size={16} />
              Search for something specific
            </Link>
          )}
        </div>
      </Container>
    </section>
  );
};

export default Hero;
