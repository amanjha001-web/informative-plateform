import { Clock, Eye } from "lucide-react";
import { Link } from "react-router-dom";

const ArticleCard = ({ article, featured = false, className = "" }) => {
  if (!article) return null;

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <article
      className={[
        "group overflow-hidden rounded-2xl border",
        "border-[rgb(var(--border))]",
        "bg-[rgb(var(--card))]",
        "transition-all duration-300",
        "hover:-translate-y-1 hover:shadow-xl",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {/* Image */}
      <Link to={`/articles/${article.slug}`} className="block overflow-hidden">
        <div className={featured ? "aspect-[16/9]" : "aspect-[16/10]"}>
          <img
            src={article.image}
            alt={article.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      {/* Content */}
      <div className={featured ? "p-6" : "p-5"}>
        {/* Category + Featured */}
        <div className="flex flex-wrap items-center gap-2">
          {article.category && (
            <span className="rounded-full bg-[rgb(var(--primary))]/10 px-2.5 py-1 text-xs font-medium capitalize text-[rgb(var(--primary))]">
              {article.category.name}
            </span>
          )}

          {article.featured && (
            <span className="rounded-full bg-[rgb(var(--warning))]/10 px-2.5 py-1 text-xs font-medium text-[rgb(var(--warning))]">
              Featured
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          className={[
            "mt-4 font-semibold leading-7 text-[rgb(var(--foreground))]",
            featured ? "text-xl sm:text-2xl" : "text-lg",
          ].join(" ")}
        >
          <Link
            to={`/articles/${article.slug}`}
            className="transition-colors hover:text-[rgb(var(--primary))]"
          >
            {article.title}
          </Link>
        </h3>

        {/* Excerpt */}
        {article.excerpt && (
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-[rgb(var(--muted-foreground))]">
            {article.excerpt}
          </p>
        )}

        {/* Meta */}
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-[rgb(var(--border))] pt-4 text-xs text-[rgb(var(--muted-foreground))]">
          {article.publishedAt && (
            <span>{formatDate(article.publishedAt)}</span>
          )}

          {article.readTime && (
            <span className="flex items-center gap-1">
              <Clock size={13} />
              {article.readTime}
            </span>
          )}

          {article.views !== undefined && (
            <span className="flex items-center gap-1">
              <Eye size={13} />
              {article.views}
            </span>
          )}
        </div>

        {/* Author */}
        {article.author && (
          <div className="mt-3 text-xs font-medium text-[rgb(var(--muted-foreground))]">
            By {article.author?.name || "Unknown Author"}
          </div>
        )}
      </div>
    </article>
  );
};

export default ArticleCard;
