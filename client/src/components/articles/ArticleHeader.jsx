import { ArrowLeft, Calendar, Clock, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const ArticleHeader = ({ article }) => {
  if (!article) return null;

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <header className="border-b border-[rgb(var(--border))] bg-[rgb(var(--secondary))]/30">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
        {/* Back */}
        <Link
          to="/articles"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[rgb(var(--muted-foreground))] transition-colors hover:text-[rgb(var(--primary))]"
        >
          <ArrowLeft size={16} />
          Back to Articles
        </Link>

        {/* Category */}
        <div className="flex flex-wrap items-center gap-2">
          {article.category && (
            <span className="rounded-full bg-[rgb(var(--primary))]/10 px-3 py-1 text-xs font-semibold capitalize text-[rgb(var(--primary))]">
              {article.category?.name}
            </span>
          )}

          {article.featured && (
            <span className="rounded-full bg-[rgb(var(--warning))]/10 px-3 py-1 text-xs font-semibold text-[rgb(var(--warning))]">
              Featured
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="mt-5 max-w-4xl text-3xl font-bold tracking-tight text-[rgb(var(--foreground))] sm:text-4xl md:text-5xl md:leading-tight">
          {article.title}
        </h1>

        {/* Excerpt */}
        {article.excerpt && (
          <p className="mt-5 max-w-3xl text-base leading-7 text-[rgb(var(--muted-foreground))] md:text-lg md:leading-8">
            {article.excerpt}
          </p>
        )}

        {/* Meta */}
        <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-[rgb(var(--muted-foreground))]">
          {article.author && (
            <span className="font-medium text-[rgb(var(--foreground))]">
              By {article.author?.name || "Unknown Author"}
            </span>
          )}

          {article.publishedAt && (
            <span className="flex items-center gap-1.5">
              <Calendar size={16} />
              {formatDate(article.publishedAt)}
            </span>
          )}

          {article.readTime && (
            <span className="flex items-center gap-1.5">
              <Clock size={16} />
              {article.readTime}
            </span>
          )}

          {article.views !== undefined && (
            <span className="flex items-center gap-1.5">
              <Eye size={16} />
              {article.views} views
            </span>
          )}
        </div>

        {/* Tags */}
        {article.tags?.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Link
                key={tag}
                to={`/search?q=${encodeURIComponent(tag)}`}
                className="rounded-full border border-[rgb(var(--border))] bg-[rgb(var(--background))] px-3 py-1.5 text-xs font-medium text-[rgb(var(--muted-foreground))] transition-colors hover:border-[rgb(var(--primary))]/40 hover:text-[rgb(var(--primary))]"
              >
                #{tag}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default ArticleHeader;
