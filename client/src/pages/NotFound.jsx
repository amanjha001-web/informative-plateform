import { ArrowLeft, FileQuestion, Home, Search } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import Container from "../components/common/Container";
import SEO from "../components/common/SEO";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <>
      <SEO
        title="Page Not Found"
        description="The page you are looking for does not exist or may have been moved."
        noIndex
      />

      <main className="flex min-h-[70vh] items-center">
        <Container>
          <div className="mx-auto max-w-2xl py-16 text-center md:py-24">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]">
              <FileQuestion size={40} strokeWidth={1.6} aria-hidden="true" />
            </div>

            <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em] text-[rgb(var(--primary))]">
              Error 404
            </p>

            <h1 className="mt-3 text-4xl font-bold tracking-tight text-[rgb(var(--foreground))] sm:text-5xl md:text-6xl">
              Page not found
            </h1>

            <p className="mx-auto mt-5 max-w-lg text-base leading-7 text-[rgb(var(--muted-foreground))]">
              Sorry, the page you're looking for doesn't exist or may have been
              moved to another location.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[rgb(var(--primary))] px-5 py-3 text-sm font-semibold text-[rgb(var(--primary-foreground))] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg sm:w-auto"
              >
                <Home size={17} aria-hidden="true" />
                Go Home
              </Link>

              <Link
                to="/articles"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] px-5 py-3 text-sm font-semibold text-[rgb(var(--foreground))] transition-all duration-200 hover:border-[rgb(var(--primary))]/40 hover:text-[rgb(var(--primary))] sm:w-auto"
              >
                <Search size={17} aria-hidden="true" />
                Explore Articles
              </Link>

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-[rgb(var(--muted-foreground))] transition-colors hover:text-[rgb(var(--foreground))] sm:w-auto"
              >
                <ArrowLeft size={17} aria-hidden="true" />
                Go Back
              </button>
            </div>
          </div>
        </Container>
      </main>
    </>
  );
};

export default NotFound;
