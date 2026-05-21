export const calculateSorting = (
  sortBy: string | undefined,
  order: string | undefined,
  allowedSortFields: string[],
  defaultSort = "createdAt",
  defaultOrder: "asc" | "desc" = "desc",
) => {
  const finalSortBy =
    sortBy && allowedSortFields.includes(sortBy) ? sortBy : defaultSort;

  const finalOrder = order === "asc" || order === "desc" ? order : defaultOrder;

  return {
    sortBy: finalSortBy,
    order: finalOrder,
  };
};
