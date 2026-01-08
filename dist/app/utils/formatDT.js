"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatDateTime = void 0;
const formatDateTime = (dateInput) => {
    if (!dateInput)
        return "";
    const date = new Date(dateInput);
    if (isNaN(date.getTime()))
        return "";
    const formatted = date.toLocaleString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
    return formatted.replace(/,([^,]*)$/, ";$1");
};
exports.formatDateTime = formatDateTime;
