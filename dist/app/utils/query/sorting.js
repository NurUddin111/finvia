"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateSorting = void 0;
const calculateSorting = (sortBy, order, allowedSortFields, defaultSort = "createdAt", defaultOrder = "desc") => {
    const finalSortBy = sortBy && allowedSortFields.includes(sortBy) ? sortBy : defaultSort;
    const finalOrder = order === "asc" || order === "desc" ? order : defaultOrder;
    return {
        sortBy: finalSortBy,
        order: finalOrder,
    };
};
exports.calculateSorting = calculateSorting;
