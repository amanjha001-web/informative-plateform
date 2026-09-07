import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

import ArticleFilters from "../components/articles/ArticleFilters";
import ArticleTable from "../components/articles/ArticleTable";
import Pagination from "../components/common/Pagination";
import ConfirmDialog from "../components/common/ConfirmDialog";

import { articles as articleData } from "../data/articles";

const ITEMS_PER_PAGE = 10;

const Articles = () => {
  const [filters, setFilters] = useState({
    search: "",
    status: "",
    category: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [deleteArticle, setDeleteArticle] = useState(null);

  const filteredArticles = useMemo(() => {
    const search = filters.search.trim().toLowerCase();

    return articleData.filter((article) => {
      const matchesSearch =
        !search ||
        article.title?.toLowerCase().includes(search) ||
        article.slug?.toLowerCase().includes(search);

      const matchesStatus =
        !filters.status ||
        article.status?.toLowerCase() === filters.status.toLowerCase();

      const matchesCategory =
        !filters.category ||
        article.category?.toLowerCase() === filters.category.toLowerCase();

      return matchesSearch && matchesStatus && matchesCategory;
    });
  }, [filters]);

  const totalPages = Math.max(
    Math.ceil(filteredArticles.length / ITEMS_PER_PAGE),
    1,
  );

  const paginatedArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

    return filteredArticles.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredArticles, currentPage]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({
      search: "",
      status: "",
      category: "",
    });

    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDeleteRequest = (article) => {
    setDeleteArticle(article);
  };

  const handleDeleteConfirm = () => {
    // API delete integration will be added later.
    setDeleteArticle(null);
  };

  const handleView = (article) => {
    console.log("View article:", article);
  };

  return (
    <div className="articles-page">
      <div className="articles-page__header">
        <div>
          <h1 className="articles-page__title">Articles</h1>

          <p className="articles-page__description">
            Manage, create and publish platform articles.
          </p>
        </div>

        <Link to="/admin/articles/add" className="articles-page__add-button">
          <Plus size={18} />
          <span>Add Article</span>
        </Link>
      </div>

      <section className="articles-page__filters">
        <ArticleFilters
          filters={filters}
          onFilterChange={handleFilterChange}
          onReset={handleResetFilters}
        />
      </section>

      <section className="articles-page__content">
        <div className="articles-page__table-header">
          <div>
            <h2 className="articles-page__section-title">All Articles</h2>

            <p className="articles-page__count">
              {filteredArticles.length}{" "}
              {filteredArticles.length === 1 ? "article" : "articles"} found
            </p>
          </div>
        </div>

        <ArticleTable
          articles={paginatedArticles}
          onDelete={handleDeleteRequest}
          onView={handleView}
        />

        {filteredArticles.length > 0 && (
          <div className="articles-page__pagination">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}
      </section>

      <ConfirmDialog
        open={Boolean(deleteArticle)}
        title="Delete Article"
        description={
          deleteArticle
            ? `Are you sure you want to delete "${deleteArticle.title}"? This action cannot be undone.`
            : ""
        }
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeleteArticle(null)}
      />
    </div>
  );
};

export default Articles;
