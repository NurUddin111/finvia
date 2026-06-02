import z from "zod";
import { UserRole } from "@prisma/client";

export const UpdateUserZodSchemaValidation = z.object({
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
    .max(50, {
      error: (issue) => {
        if (issue.code === "too_big") {
          return `Name cannot exceed ${issue.maximum} characters!`;
        }
      },
    })
    .optional(),

  phone: z
    .string({ error: () => "Invalid Phone" })
    .regex(/^(?:\+8801\d{9}|01\d{9})$/, {
      error: () =>
        "Phone number must be valid for Bangladesh. Format: +8801XXXXXXXXX or 01XXXXXXXXX",
    })
    .optional(),

  role: z
    .enum(UserRole, {
      error: () => "Invalid Role.",
    })
    .optional(),

  address: z
    .string({ error: () => "Invalid address!" })
    .max(500, { message: "Address cannot exceed 500 characters." })
    .optional(),
});
