"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBusinessZodSchemaValidation = exports.CreateBusinessZodSchemaValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const prisma_1 = require("../../../generated/prisma");
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
                return `Name cannot exceed ${issue.minimum} characters!`;
            }
        },
    }),
    category: zod_1.default.enum(prisma_1.BusinessCategory, {
        error: () => {
            return "Category not available.";
        },
    }),
    email: zod_1.default
        .email({
        error: "Invalid Email",
    })
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
                return `Email cannot exceed ${issue.minimum} characters!`;
            }
        },
    }),
    phone: zod_1.default
        .string({
        error: () => {
            return "Invalid Phone";
        },
    })
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
        error: () => {
            return "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX";
        },
    })
        .optional(),
    address: zod_1.default
        .string({
        error: () => {
            return "Invalid address!";
        },
    })
        .max(500, { message: "Address cannot exceed 500 characters." })
        .optional(),
    website: zod_1.default
        .url({
        error: () => {
            return "Invalid website url!";
        },
    })
        .optional(),
    logoUrl: zod_1.default
        .url({
        error: () => {
            return "Invalid logo url!";
        },
    })
        .optional(),
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
                return `Name cannot exceed ${issue.minimum} characters!`;
            }
        },
    })
        .optional(),
    email: zod_1.default
        .email({
        error: "Invalid Email",
    })
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
                return `Email cannot exceed ${issue.minimum} characters!`;
            }
        },
    })
        .optional(),
    category: zod_1.default
        .enum(prisma_1.BusinessCategory, {
        error: () => {
            return "Category not available.";
        },
    })
        .optional(),
    phone: zod_1.default
        .string({
        error: () => {
            return "Invalid Phone";
        },
    })
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
        error: () => {
            return "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX";
        },
    })
        .optional(),
    address: zod_1.default
        .string({
        error: () => {
            return "Invalid address!";
        },
    })
        .max(500, { message: "Address cannot exceed 500 characters." })
        .optional(),
    website: zod_1.default
        .url({
        error: () => {
            return "Invalid url!";
        },
    })
        .optional(),
    logoUrl: zod_1.default
        .url({
        error: () => {
            return "Invalid logo url!";
        },
    })
        .optional(),
});
