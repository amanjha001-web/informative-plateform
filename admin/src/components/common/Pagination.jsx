
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  itemsPerPage = 10,
  onPageChange,
  showSummary = true,
  maxVisiblePages = 5,
  disabled = false,
  className = "",
}) => {
  if (totalPages <= 1 && !showSummary) {
    return null;
  }

  const safeCurrentPage = Math.min(
    Math.max(currentPage, 1),
    Math.max(totalPages, 1),
  );

  const getPageNumbers = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from(
        { length: totalPages },
        (_, index) => index + 1,
      );
    }

    const pages = [];
    const half = Math.floor(maxVisiblePages / 2);

    let start = Math.max(1, safeCurrentPage - half);
    let end = Math.min(
      totalPages,
      safeCurrentPage + half,
    );

    if (safeCurrentPage <= half) {
      start = 1;
      end = maxVisiblePages;
    }

    if (safeCurrentPage + half >= totalPages) {
      start = totalPages - maxVisiblePages + 1;
      end = totalPages;
    }

    if (start > 1) {
      pages.push(1);

      if (start > 2) {
        pages.push("ellipsis-start");
      }
    }

    for (let page = start; page <= end; page += 1) {
      pages.push(page);
    }

    if (end < totalPages) {
      if (end < totalPages - 1) {
        pages.push("ellipsis-end");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageChange = (page) => {
    if (
      disabled ||
      page < 1 ||
      page > totalPages ||
      page === safeCurrentPage
    ) {
      return;
    }

    onPageChange?.(page);
  };

  const startItem =
    totalItems === 0
      ? 0
      : (safeCurrentPage - 1) * itemsPerPage + 1;

  const endItem = Math.min(
    safeCurrentPage * itemsPerPage,
    totalItems,
  );

  return (
    <div
      className={[
        "pagination",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {showSummary && (
        <p className="pagination__summary">
          Showing{" "}
          <strong>{startItem}</strong>
          {" - "}
          <strong>{endItem}</strong>
          {" of "}
          <strong>{totalItems}</strong>
        </p>
      )}

      <nav
        className="pagination__nav"
        aria-label="Pagination"
      >
        <button
          type="button"
          className="pagination__button"
          onClick={() => handlePageChange(1)}
          disabled={disabled || safeCurrentPage === 1}
          aria-label="First page"
        >
          <ChevronsLeft size={16} />
        </button>

        <button
          type="button"
          className="pagination__button"
          onClick={() =>
            handlePageChange(safeCurrentPage - 1)
          }
          disabled={disabled || safeCurrentPage === 1}
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </button>

        <div className="pagination__pages">
          {getPageNumbers().map((page) => {
            if (typeof page !== "number") {
              return (
                <span
                  key={page}
                  className="pagination__ellipsis"
                  aria-hidden="true"
                >
                  …
                </span>
              );
            }

            const isActive =
              page === safeCurrentPage;

            return (
              <button
                key={page}
                type="button"
                className={[
                  "pagination__page",
                  isActive
                    ? "pagination__page--active"
                    : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                onClick={() =>
                  handlePageChange(page)
                }
                disabled={disabled}
                aria-current={
                  isActive ? "page" : undefined
                }
              >
                {page}
              </button>
            );
          })}
        </div>

        <button
          type="button"
          className="pagination__button"
          onClick={() =>
            handlePageChange(safeCurrentPage + 1)
          }
          disabled={
            disabled ||
            safeCurrentPage === totalPages
          }
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </button>

        <button
          type="button"
          className="pagination__button"
          onClick={() =>
            handlePageChange(totalPages)
          }
          disabled={
            disabled ||
            safeCurrentPage === totalPages
          }
          aria-label="Last page"
        >
          <ChevronsRight size={16} />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
