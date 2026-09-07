import { Edit, Eye, MoreVertical, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

import ArticleStatus from "./ArticleStatus";
import EmptyState from "../common/EmptyState";

const ArticleTable = ({ articles = [], onDelete, onView }) => {
  const [openMenu, setOpenMenu] = useState(null);

  const handleMenuToggle = (id) => {
    setOpenMenu((current) => (current === id ? null : id));
  };

  const handleDelete = (article) => {
    setOpenMenu(null);
    onDelete?.(article);
  };

  const handleView = (article) => {
    setOpenMenu(null);
    onView?.(article);
  };

  if (articles.length === 0) {
    return (
      <div className="article-table-empty">
        <EmptyState
          title="No articles found"
          description="There are no articles matching your current filters."
        />
      </div>
    );
  }

  return (
    <div className="article-table-wrapper">
      <table className="article-table">
        <thead>
          <tr>
            <th>Article</th>
            <th>Category</th>
            <th>Author</th>
            <th>Status</th>
            <th>Published</th>
            <th className="article-table__actions-header">Actions</th>
          </tr>
        </thead>

        <tbody>
          {articles.map((article) => {
            const articleId = article.id || article._id;

            return (
              <tr key={articleId}>
                <td>
                  <div className="article-table__article">
                    <div className="article-table__thumbnail">
                      {article.image ? (
                        <img
                          src={article.image}
                          alt={article.title || "Article"}
                        />
                      ) : (
                        <span>
                          {article.title?.charAt(0).toUpperCase() || "A"}
                        </span>
                      )}
                    </div>

                    <div className="article-table__article-info">
                      <Link
                        to={`/admin/articles/${articleId}/edit`}
                        className="article-table__title"
                      >
                        {article.title || "Untitled Article"}
                      </Link>

                      {article.slug && (
                        <span className="article-table__slug">
                          /{article.slug}
                        </span>
                      )}
                    </div>
                  </div>
                </td>

                <td>
                  <span className="article-table__category">
                    {article.category || "Uncategorized"}
                  </span>
                </td>

                <td>
                  <span className="article-table__author">
                    {article.author || "Unknown"}
                  </span>
                </td>

                <td>
                  <ArticleStatus status={article.status} />
                </td>

                <td>
                  <span className="article-table__date">
                    {article.publishedAt || article.date || "—"}
                  </span>
                </td>

                <td>
                  <div className="article-table__actions">
                    <Link
                      to={`/admin/articles/${articleId}/edit`}
                      className="article-table__action"
                      title="Edit article"
                    >
                      <Edit size={17} />
                    </Link>

                    <button
                      type="button"
                      className="article-table__action"
                      title="View article"
                      onClick={() => handleView(article)}
                    >
                      <Eye size={17} />
                    </button>

                    <div className="article-table__menu">
                      <button
                        type="button"
                        className="article-table__action"
                        title="More actions"
                        onClick={() => handleMenuToggle(articleId)}
                        aria-expanded={openMenu === articleId}
                      >
                        <MoreVertical size={17} />
                      </button>

                      {openMenu === articleId && (
                        <div className="article-table__dropdown">
                          <Link
                            to={`/admin/articles/${articleId}/edit`}
                            className="article-table__dropdown-item"
                            onClick={() => setOpenMenu(null)}
                          >
                            <Edit size={16} />
                            <span>Edit</span>
                          </Link>

                          <button
                            type="button"
                            className="article-table__dropdown-item article-table__dropdown-item--danger"
                            onClick={() => handleDelete(article)}
                          >
                            <Trash2 size={16} />
                            <span>Delete</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ArticleTable;
