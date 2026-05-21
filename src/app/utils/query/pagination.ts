export const calculatePagination = (page?: string, limit?: string) => {
  const currentPage = Math.max(1, parseInt(page || "1"));

  const currentLimit = Math.min(100, Math.max(1, parseInt(limit || "10")));

  const skip = (currentPage - 1) * currentLimit;

  return {
    page: currentPage,
    limit: currentLimit,
    skip,
  };
};
