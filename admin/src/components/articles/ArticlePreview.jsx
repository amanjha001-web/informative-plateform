import { Calendar, User } from "lucide-react";

import ArticleStatus from "./ArticleStatus";

const ArticlePreview = ({ article = {} }) => {
  const {
    title = "Untitled Article",
    excerpt = "",
    content = "",
    category = "Uncategorized",
    author = "Unknown",
    status = "draft",
    publishedAt = "",
    image = "",
  } = article;

  return (
    <article className="article-preview">
      {image && (
        <div className="article-preview__image">
          <img src={image} alt={title} />
        </div>
      )}

      <div className="article-preview__content">
        <div className="article-preview__top">
          <span className="article-preview__category">{category}</span>

          <ArticleStatus status={status} />
        </div>

        <h1 className="article-preview__title">{title}</h1>

        {excerpt && <p className="article-preview__excerpt">{excerpt}</p>}

        <div className="article-preview__meta">
          <span>
            <User size={15} />
            {author}
          </span>

          {publishedAt && (
            <span>
              <Calendar size={15} />
              {publishedAt}
            </span>
          )}
        </div>

        <div className="article-preview__divider" />

        <div
          className="article-preview__body"
          dangerouslySetInnerHTML={{
            __html: content || "<p>No article content available.</p>",
          }}
        />
      </div>
    </article>
  );
};

export default ArticlePreview;
