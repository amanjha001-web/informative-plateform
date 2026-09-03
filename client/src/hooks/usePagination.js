import { useMemo, useState } from "react";

const usePagination = (items = [], itemsPerPage = 12) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalItems = items.length;

  const totalPages = Math.max(
    Math.ceil(totalItems / itemsPerPage),
    1,
  );

  const safeCurrentPage = Math.min(
    Math.max(currentPage, 1),
    totalPages,
  );

  const paginatedItems = useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return items.slice(startIndex, endIndex);
  }, [items, safeCurrentPage, itemsPerPage]);

  const goToPage = (page) => {
    const nextPage = Math.min(
      Math.max(Number(page) || 1, 1),
      totalPages,
    );

    setCurrentPage(nextPage);
  };

  const nextPage = () => {
    setCurrentPage((page) => Math.min(page + 1, totalPages));
  };

  const previousPage = () => {
    setCurrentPage((page) => Math.max(page - 1, 1));
  };

  const resetPage = () => {
    setCurrentPage(1);
  };

  return {
    currentPage: safeCurrentPage,
    totalPages,
    totalItems,
    itemsPerPage,
    paginatedItems,
    hasNextPage: safeCurrentPage < totalPages,
    hasPreviousPage: safeCurrentPage > 1,
    goToPage,
    nextPage,
    previousPage,
    resetPage,
  };
};

export default usePagination;