"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateProductZodSchemaValidation = exports.AddProductZodSchemaValidation = void 0;
const zod_1 = require("zod");
exports.AddProductZodSchemaValidation = zod_1.z.object({
    productsName: zod_1.z
        .array(zod_1.z.object({
        name: zod_1.z
            .string({ error: "Product name must be a string." })
            .trim()
            .min(1, "Product name cannot be empty.")
            .max(100, "Product name cannot exceed 100 characters."),
    }))
        .min(1, "At least one product is required.")
        .refine((products) => {
        const names = products.map((p) => p.name.trim().toLowerCase());
        return new Set(names).size === names.length;
    }, { message: "Duplicate product names in your request." }),
});
exports.UpdateProductZodSchemaValidation = zod_1.z.object({
    name: zod_1.z
        .string({
        error: (issue) => issue.input === undefined ? "Name is required" : "Invalid Name",
    })
        .trim()
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
});
