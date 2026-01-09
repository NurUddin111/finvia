import z from "zod";
import { BusinessCategory } from "@prisma/client";

export const CreateBusinessZodSchemaValidation = z.object({
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Name is required" : "Invalid Name",
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

  category: z.enum(BusinessCategory, {
    error: () => {
      return "Category not available.";
    },
  }),

  email: z
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

  phone: z
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

  address: z
    .string({
      error: () => {
        return "Invalid address!";
      },
    })
    .max(500, { message: "Address cannot exceed 500 characters." })
    .optional(),

  website: z
    .url({
      error: () => {
        return "Invalid website url!";
      },
    })
    .optional(),

  logoUrl: z
    .url({
      error: () => {
        return "Invalid logo url!";
      },
    })
    .optional(),
});

export const UpdateBusinessZodSchemaValidation = z.object({
  name: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Name is required" : "Invalid Name",
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

  email: z
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

  category: z
    .enum(BusinessCategory, {
      error: () => {
        return "Category not available.";
      },
    })
    .optional(),

  phone: z
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

  address: z
    .string({
      error: () => {
        return "Invalid address!";
      },
    })
    .max(500, { message: "Address cannot exceed 500 characters." })
    .optional(),

  website: z
    .url({
      error: () => {
        return "Invalid url!";
      },
    })
    .optional(),

  logoUrl: z
    .url({
      error: () => {
        return "Invalid logo url!";
      },
    })
    .optional(),
});
