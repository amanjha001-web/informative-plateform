import { ArrowRight, Clock, Eye } from "lucide-react";
import { Link } from "react-router-dom";

import Container from "../common/Container";
import  articles  from "../../data/articles";

const FeaturedArticles = ({
  title = "Featured Articles",
  description = "Handpicked articles with useful insights, guides, and information.",
  limit = 3,
}) => {
  const featuredArticles = articles
    .filter((article) => article.featured)
    .slice(0, limit);

  if (!featuredArticles.length) return null;

  return (
    <section className="py-12 sm:py-16 md:py-20">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold text-[rgb(var(--primary))]">
              Featured
            </span>

            <h2 className="mt-2 text-2xl font-bold tracking-tight text-[rgb(var(--foreground))] sm:text-3xl">
              {title}
            </h2>

            <p className="mt-3 text-sm leading-6 text-[rgb(var(--muted-foreground))] sm:text-base">
              {description}
            </p>
          </div>

          <Link
            to="/articles"
            className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-[rgb(var(--primary))] transition-opacity hover:opacity-80"
          >
            View all
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Articles */}
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          {featuredArticles.map((article) => (
            <article
              key={article.id}
              className="group overflow-hidden rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Image */}
              <Link
                to={`/articles/${article.slug}`}
                className="block overflow-hidden"
              >
                <img
                  src={article.image}
                  alt={article.title}
                  loading="lazy"
                  className="aspect-[16/10] h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </Link>

              {/* Content */}
              <div className="p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-[rgb(var(--primary))]/10 px-2.5 py-1 text-xs font-medium text-[rgb(var(--primary))]">
                    {article.category?.name || "Uncategorized"}
                  </span>

                  <div className="flex items-center gap-1 text-xs text-[rgb(var(--muted-foreground))]">
                    <Clock size={14} />
                    {article.readTime}
                  </div>
                </div>

                <h3 className="mt-4 line-clamp-2 text-xl font-semibold leading-7 text-[rgb(var(--foreground))]">
                  <Link
                    to={`/articles/${article.slug}`}
                    className="transition-colors hover:text-[rgb(var(--primary))]"
                  >
                    {article.title}
                  </Link>
                </h3>

                <p className="mt-3 line-clamp-3 text-sm leading-6 text-[rgb(var(--muted-foreground))]">
                  {article.excerpt}
                </p>

                {/* Meta */}
                <div className="mt-5 flex items-center justify-between border-t border-[rgb(var(--border))] pt-4">
                  <span className="text-xs text-[rgb(var(--muted-foreground))]">
                    {article.author?.name || "Unknown Author"}
                  </span>

                  <span className="flex items-center gap-1 text-xs text-[rgb(var(--muted-foreground))]">
                    <Eye size={14} />
                    {article.views}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturedArticles;
