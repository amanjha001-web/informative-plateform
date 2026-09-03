import { ArrowRight, Calendar, Clock, Eye, Tag } from "lucide-react";
import { Link } from "react-router-dom";

import { CATEGORY_LIST } from "../../constants/categories";

const ArticleSidebar = ({ article, relatedArticles = [], className = "" }) => {
  if (!article) return null;

  const category = CATEGORY_LIST.find((item) => item.slug === article.category);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <aside className={["space-y-6", className].filter(Boolean).join(" ")}>
      {/* Article Information */}
      <div className="sticky top-24 space-y-6">
        <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5">
          <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">
            Article Information
          </h2>

          <div className="mt-5 space-y-4">
            {article.author && (
              <div className="flex items-start justify-between gap-4">
                <span className="text-sm text-[rgb(var(--muted-foreground))]">
                  Author
                </span>

                <span className="text-right text-sm font-medium text-[rgb(var(--foreground))]">
                  {article.author?.name || "Unknown Author"}
                </span>
              </div>
            )}

            {article.publishedAt && (
              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2 text-sm text-[rgb(var(--muted-foreground))]">
                  <Calendar size={15} />
                  Published
                </span>

                <span className="text-sm font-medium text-[rgb(var(--foreground))]">
                  {formatDate(article.publishedAt)}
                </span>
              </div>
            )}

            {article.readTime && (
              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2 text-sm text-[rgb(var(--muted-foreground))]">
                  <Clock size={15} />
                  Read time
                </span>

                <span className="text-sm font-medium text-[rgb(var(--foreground))]">
                  {article.readTime}
                </span>
              </div>
            )}

            {article.views !== undefined && (
              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2 text-sm text-[rgb(var(--muted-foreground))]">
                  <Eye size={15} />
                  Views
                </span>

                <span className="text-sm font-medium text-[rgb(var(--foreground))]">
                  {article.views}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Category */}
        {category && (
          <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5">
            <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">
              Category
            </h2>

            <Link
              to={`/categories/${category.slug}`}
              className="group mt-4 flex items-center justify-between gap-3 rounded-xl bg-[rgb(var(--secondary))] p-4 transition-colors hover:bg-[rgb(var(--primary))]/10"
            >
              <div>
                <p className="font-medium text-[rgb(var(--foreground))] transition-colors group-hover:text-[rgb(var(--primary))]">
                  {category.name}
                </p>

                <p className="mt-1 text-xs text-[rgb(var(--muted-foreground))]">
                  {category.description}
                </p>
              </div>

              <ArrowRight
                size={17}
                className="shrink-0 text-[rgb(var(--muted-foreground))] transition-transform group-hover:translate-x-1 group-hover:text-[rgb(var(--primary))]"
              />
            </Link>
          </div>
        )}

        {/* Tags */}
        {article.tags?.length > 0 && (
          <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5">
            <div className="flex items-center gap-2">
              <Tag size={17} className="text-[rgb(var(--primary))]" />

              <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">
                Topics
              </h2>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Link
                  key={tag}
                  to={`/search?q=${encodeURIComponent(tag)}`}
                  className="rounded-full border border-[rgb(var(--border))] px-3 py-1.5 text-xs font-medium text-[rgb(var(--muted-foreground))] transition-colors hover:border-[rgb(var(--primary))]/40 hover:text-[rgb(var(--primary))]"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="rounded-2xl border border-[rgb(var(--border))] bg-[rgb(var(--card))] p-5">
            <h2 className="text-base font-semibold text-[rgb(var(--foreground))]">
              More to Read
            </h2>

            <div className="mt-4 space-y-4">
              {relatedArticles.slice(0, 3).map((relatedArticle) => (
                <Link
                  key={relatedArticle.id}
                  to={`/articles/${relatedArticle.slug}`}
                  className="group block"
                >
                  <h3 className="line-clamp-2 text-sm font-medium leading-6 text-[rgb(var(--foreground))] transition-colors group-hover:text-[rgb(var(--primary))]">
                    {relatedArticle.title}
                  </h3>

                  <div className="mt-1 flex items-center gap-1 text-xs text-[rgb(var(--muted-foreground))]">
                    <Clock size={13} />
                    {relatedArticle.readTime}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default ArticleSidebar;
