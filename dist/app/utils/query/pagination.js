"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculatePagination = void 0;
const calculatePagination = (page, limit) => {
    const currentPage = Math.max(1, parseInt(page || "1"));
    const currentLimit = Math.min(100, Math.max(1, parseInt(limit || "10")));
    const skip = (currentPage - 1) * currentLimit;
    return {
        page: currentPage,
        limit: currentLimit,
        skip,
    };
};
exports.calculatePagination = calculatePagination;
