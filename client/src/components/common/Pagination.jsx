import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const Pagination = ({
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  siblingCount = 1,
  showFirstLast = true,
  className = "",
}) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const totalVisible = siblingCount * 2 + 5;

    if (totalPages <= totalVisible) {
      for (let page = 1; page <= totalPages; page++) {
        pages.push(page);
      }

      return pages;
    }

    const leftSibling = Math.max(currentPage - siblingCount, 1);
    const rightSibling = Math.min(currentPage + siblingCount, totalPages);

    const showLeftDots = leftSibling > 2;
    const showRightDots = rightSibling < totalPages - 1;

    pages.push(1);

    if (showLeftDots) {
      pages.push("left-dots");
    } else {
      for (let page = 2; page < leftSibling; page++) {
        pages.push(page);
      }
    }

    for (let page = leftSibling; page <= rightSibling; page++) {
      if (page !== 1 && page !== totalPages) {
        pages.push(page);
      }
    }

    if (showRightDots) {
      pages.push("right-dots");
    } else {
      for (let page = rightSibling + 1; page < totalPages; page++) {
        pages.push(page);
      }
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  const buttonBase =
    "inline-flex h-9 min-w-9 items-center justify-center rounded-lg border text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[rgb(var(--primary))] disabled:pointer-events-none disabled:opacity-40";

  const pageNumbers = getPageNumbers();

  return (
    <nav
      aria-label="Pagination"
      className={`flex items-center justify-center gap-1.5 ${className}`}
    >
      {showFirstLast && (
        <button
          type="button"
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          aria-label="First page"
          className={`${buttonBase} border-[rgb(var(--border))] bg-[rgb(var(--background))] text-[rgb(var(--foreground))] hover:bg-[rgb(var(--secondary))]`}
        >
          <ChevronsLeft size={16} />
        </button>
      )}

      <button
        type="button"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        aria-label="Previous page"
        className={`${buttonBase} border-[rgb(var(--border))] bg-[rgb(var(--background))] text-[rgb(var(--foreground))] hover:bg-[rgb(var(--secondary))]`}
      >
        <ChevronLeft size={16} />
      </button>

      {pageNumbers.map((page) => {
        if (page === "left-dots" || page === "right-dots") {
          return (
            <span
              key={page}
              className="flex h-9 min-w-9 items-center justify-center text-sm text-[rgb(var(--muted-foreground))]"
            >
              ...
            </span>
          );
        }

        const isActive = page === currentPage;

        return (
          <button
            key={page}
            type="button"
            onClick={() => onPageChange(page)}
            aria-label={`Page ${page}`}
            aria-current={isActive ? "page" : undefined}
            className={[
              buttonBase,
              isActive
                ? "border-[rgb(var(--primary))] bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))]"
                : "border-[rgb(var(--border))] bg-[rgb(var(--background))] text-[rgb(var(--foreground))] hover:bg-[rgb(var(--secondary))]",
            ].join(" ")}
          >
            {page}
          </button>
        );
      })}

      <button
        type="button"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        aria-label="Next page"
        className={`${buttonBase} border-[rgb(var(--border))] bg-[rgb(var(--background))] text-[rgb(var(--foreground))] hover:bg-[rgb(var(--secondary))]`}
      >
        <ChevronRight size={16} />
      </button>

      {showFirstLast && (
        <button
          type="button"
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          aria-label="Last page"
          className={`${buttonBase} border-[rgb(var(--border))] bg-[rgb(var(--background))] text-[rgb(var(--foreground))] hover:bg-[rgb(var(--secondary))]`}
        >
          <ChevronsRight size={16} />
        </button>
      )}
    </nav>
  );
};

export default Pagination;
