import { ArrowRight, FileText } from "lucide-react";
import { Link } from "react-router-dom";

import Badge from "../common/Badge";
import EmptyState from "../common/EmptyState";

const RecentArticles = ({
  articles = [],
  title = "Recent Articles",
  description = "Latest articles added to the platform",
}) => {
  return (
    <section className="dashboard-list-card">
      <div className="dashboard-list-card__header">
        <div>
          <h3 className="dashboard-list-card__title">{title}</h3>

          <p className="dashboard-list-card__description">{description}</p>
        </div>

        <Link to="/admin/articles" className="dashboard-list-card__view-all">
          View all
          <ArrowRight size={15} />
        </Link>
      </div>

      <div className="dashboard-articles-list">
        {articles.length === 0 ? (
          <EmptyState
            icon={FileText}
            title="No articles found"
            description="There are no recent articles to display."
          />
        ) : (
          articles.map((article) => (
            <article
              key={article.id || article._id}
              className="dashboard-article-item"
            >
              <div className="dashboard-article-item__icon">
                <FileText size={18} />
              </div>

              <div className="dashboard-article-item__content">
                <h4 className="dashboard-article-item__title">
                  {article.title}
                </h4>

                <div className="dashboard-article-item__meta">
                  <span>{article.category || "Uncategorized"}</span>

                  {article.author && (
                    <>
                      <span className="dashboard-article-item__dot">•</span>

                      <span>{article.author}</span>
                    </>
                  )}

                  {article.date && (
                    <>
                      <span className="dashboard-article-item__dot">•</span>

                      <span>{article.date}</span>
                    </>
                  )}
                </div>
              </div>

              <div className="dashboard-article-item__status">
                <Badge
                  variant={
                    article.status === "published"
                      ? "success"
                      : article.status === "draft"
                        ? "warning"
                        : "default"
                  }
                  size="sm"
                  dot
                >
                  {article.status || "Draft"}
                </Badge>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
};

export default RecentArticles;
