// FILE: src/hooks/usePagination.ts
// ===================================================

import { useState } from 'react';

export function usePagination(initialPage = 1, initialLimit = 20) {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  function nextPage() {
    setPage((prev) => prev + 1);
  }

  function prevPage() {
    setPage((prev) => Math.max(1, prev - 1));
  }

  function goToPage(pageNumber: number) {
    setPage(Math.max(1, pageNumber));
  }

  function reset() {
    setPage(initialPage);
    setLimit(initialLimit);
  }

  return {
    page,
    limit,
    setPage,
    setLimit,
    nextPage,
    prevPage,
    goToPage,
    reset,
  };
}