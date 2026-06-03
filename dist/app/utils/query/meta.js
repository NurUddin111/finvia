"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaginationMeta = void 0;
const createPaginationMeta = (total, page, limit) => {
    const totalPages = Math.ceil(total / limit);
    return {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
    };
};
exports.createPaginationMeta = createPaginationMeta;
