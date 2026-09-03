import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Container from "../common/Container";
import Button from "../common/Button";

const SearchSection = ({
  title = "What are you looking for?",
  description = "Search articles, topics, guides, and useful information.",
  placeholder = "Search for articles or topics...",
}) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) return;

    navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
  };

  return (
    <section className="py-12 sm:py-16 md:py-20">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[rgb(var(--primary))]/10 text-[rgb(var(--primary))]">
            <Search size={22} strokeWidth={1.8} />
          </div>

          <h2 className="mt-5 text-2xl font-bold tracking-tight text-[rgb(var(--foreground))] sm:text-3xl">
            {title}
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-[rgb(var(--muted-foreground))] sm:text-base">
            {description}
          </p>

          <form
            onSubmit={handleSubmit}
            className="mx-auto mt-7 flex max-w-2xl flex-col gap-3 sm:flex-row"
          >
            <div className="relative flex-1">
              <Search
                size={19}
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[rgb(var(--muted-foreground))]"
                aria-hidden="true"
              />

              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={placeholder}
                aria-label="Search articles and topics"
                className="h-12 w-full rounded-lg border border-[rgb(var(--border))] bg-[rgb(var(--background))] pl-11 pr-4 text-sm text-[rgb(var(--foreground))] outline-none transition-all placeholder:text-[rgb(var(--muted-foreground))] focus:border-[rgb(var(--primary))] focus:ring-2 focus:ring-[rgb(var(--primary))]"
              />
            </div>

            <Button
              type="submit"
              size="lg"
              className="sm:min-w-32"
              disabled={!query.trim()}
            >
              <Search size={18} />
              Search
            </Button>
          </form>
        </div>
      </Container>
    </section>
  );
};

export default SearchSection;
