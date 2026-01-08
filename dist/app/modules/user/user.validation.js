"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserZodSchemaValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const prisma_1 = require("../../../generated/prisma");
exports.UpdateUserZodSchemaValidation = zod_1.default.object({
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
        .max(50, {
        error: (issue) => {
            if (issue.code === "too_big") {
                return `Name cannot exceed ${issue.minimum} characters!`;
            }
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
    avatar: zod_1.default
        .url({
        error: () => {
            return "Invalid url!";
        },
    })
        .optional(),
    role: zod_1.default
        .enum(prisma_1.UserRole, {
        error: () => {
            return "Invalid Role.";
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
});
