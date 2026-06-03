"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBusinessZodSchemaValidation = exports.CreateBusinessZodSchemaValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const client_1 = require("@prisma/client");
exports.CreateBusinessZodSchemaValidation = zod_1.default.object({
    name: zod_1.default
        .string({
        error: (issue) => issue.input === undefined ? "Name is required" : "Invalid Name",
    })
        .min(2, {
        error: (issue) => {
            if (issue.code === "too_small") {
                return `Name must be ${issue.minimum} characters long!`;
            }
        },
    })
        .max(100, {
        error: (issue) => {
            if (issue.code === "too_big") {
                return `Name cannot exceed ${issue.maximum} characters!`;
            }
        },
    }),
    category: zod_1.default.enum(client_1.BusinessCategory, {
        error: () => "Category not available.",
    }),
    email: zod_1.default
        .email({ error: "Invalid Email" })
        .min(5, {
        error: (issue) => {
            if (issue.code === "too_small") {
                return `Email must be ${issue.minimum} characters long!`;
            }
        },
    })
        .max(100, {
        error: (issue) => {
            if (issue.code === "too_big") {
                return `Email cannot exceed ${issue.maximum} characters!`;
            }
        },
    }),
    phone: zod_1.default
        .string({ error: () => "Invalid Phone" })
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
        error: () => "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    })
        .optional(),
    address: zod_1.default
        .string({ error: () => "Invalid address!" })
        .max(500, { message: "Address cannot exceed 500 characters." })
        .optional(),
    website: zod_1.default.url({ error: () => "Invalid website url!" }).optional(),
});
exports.UpdateBusinessZodSchemaValidation = zod_1.default.object({
    name: zod_1.default
        .string({
        error: (issue) => issue.input === undefined ? "Name is required" : "Invalid Name",
    })
        .min(2, {
        error: (issue) => {
            if (issue.code === "too_small") {
                return `Name must be ${issue.minimum} characters long!`;
            }
        },
    })
        .max(100, {
        error: (issue) => {
            if (issue.code === "too_big") {
                return `Name cannot exceed ${issue.maximum} characters!`;
            }
        },
    })
        .optional(),
    email: zod_1.default
        .email({ error: "Invalid Email" })
        .min(5, {
        error: (issue) => {
            if (issue.code === "too_small") {
                return `Email must be ${issue.minimum} characters long!`;
            }
        },
    })
        .max(100, {
        error: (issue) => {
            if (issue.code === "too_big") {
                return `Email cannot exceed ${issue.maximum} characters!`;
            }
        },
    })
        .optional(),
    category: zod_1.default
        .enum(client_1.BusinessCategory, {
        error: () => "Category not available.",
    })
        .optional(),
    phone: zod_1.default
        .string({ error: () => "Invalid Phone" })
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
        error: () => "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    })
        .optional(),
    address: zod_1.default
        .string({ error: () => "Invalid address!" })
        .max(500, { message: "Address cannot exceed 500 characters." })
        .optional(),
    website: zod_1.default.url({ error: () => "Invalid website url!" }).optional(),
});
