import { z } from "zod";

export const AddProductZodSchemaValidation = z.object({
  productsName: z
    .array(
      z.object({
        name: z
          .string({ error: "Product name must be a string." })
          .trim()
          .min(1, "Product name cannot be empty.")
          .max(100, "Product name cannot exceed 100 characters."),
      }),
    )
    .min(1, "At least one product is required.")
    .refine(
      (products) => {
        const names = products.map((p) => p.name.trim().toLowerCase());
        return new Set(names).size === names.length;
      },
      { message: "Duplicate product names in your request." },
    ),
});

export const UpdateProductZodSchemaValidation = z.object({
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Name is required" : "Invalid Name",
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
