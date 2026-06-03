"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserZodSchemaValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const client_1 = require("@prisma/client");
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
                return `Name cannot exceed ${issue.maximum} characters!`;
            }
        },
    })
        .optional(),
    phone: zod_1.default
        .string({ error: () => "Invalid Phone" })
        .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
        error: () => "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    })
        .optional(),
    role: zod_1.default
        .enum(client_1.UserRole, {
        error: () => "Invalid Role.",
    })
        .optional(),
    address: zod_1.default
        .string({ error: () => "Invalid address!" })
        .max(500, { message: "Address cannot exceed 500 characters." })
        .optional(),
});
