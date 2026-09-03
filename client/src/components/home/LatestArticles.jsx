import { ArrowRight, Clock, Eye } from "lucide-react";
import { Link } from "react-router-dom";

import Container from "../common/Container";
import articles from "../../data/articles";

const LatestArticles = ({
  title = "Latest Articles",
  description = "Stay updated with our latest guides, insights, and useful information.",
  limit = 6,
}) => {
  const latestArticles = [...articles]
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .slice(0, limit);

  if (!latestArticles.length) return null;

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <section className="border-y border-[rgb(var(--border))] bg-[rgb(var(--secondary))]/20 py-12 sm:py-16 md:py-20">
      <Container>
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <span className="text-sm font-semibold text-[rgb(var(--primary))]">
              Latest
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

        {/* Article Grid */}
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {latestArticles.map((article) => (
            <article
              key={article.id}
              className="group overflow-hidden rounded-xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
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

              <div className="p-5">
                {/* Category */}
                <span className="inline-flex rounded-full bg-[rgb(var(--primary))]/10 px-2.5 py-1 text-xs font-medium capitalize text-[rgb(var(--primary))]">
                  {article.category?.name || "Uncategorized"}
                </span>

                {/* Title */}
                <h3 className="mt-3 line-clamp-2 text-lg font-semibold leading-7 text-[rgb(var(--foreground))]">
                  <Link
                    to={`/articles/${article.slug}`}
                    className="transition-colors hover:text-[rgb(var(--primary))]"
                  >
                    {article.title}
                  </Link>
                </h3>

                {/* Excerpt */}
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-[rgb(var(--muted-foreground))]">
                  {article.excerpt}
                </p>

                {/* Meta */}
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[rgb(var(--border))] pt-4 text-xs text-[rgb(var(--muted-foreground))]">
                  <span>{formatDate(article.publishedAt)}</span>

                  <span className="flex items-center gap-1">
                    <Clock size={13} />
                    {article.readTime} min read
                  </span>

                  <span className="flex items-center gap-1">
                    <Eye size={13} />
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

export default LatestArticles;
