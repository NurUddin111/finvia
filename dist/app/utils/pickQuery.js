"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pickQuery = void 0;
const pickQuery = (query, fields) => {
    const picked = {};
    for (const field of fields) {
        const value = query[field];
        if (value !== undefined) {
            picked[field] = value;
        }
    }
    return picked;
};
exports.pickQuery = pickQuery;
