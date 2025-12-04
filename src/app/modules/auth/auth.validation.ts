import z from "zod";

export const RegisterRequestZodSchemaValidation = z.object({
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
          return `Name cannot exceed ${issue.minimum} characters!`;
        }
      },
    })
    .optional(),

  email: z
    .email({
      error: (issue) =>
        issue.input === undefined ? "Email is required" : "Invalid Email",
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
});

export const RegisterVerificationZodSchemaValidation = z.object({
  otp: z.string().min(6, "OTP must be at least 6 characters long"),
});

export const RegisterSuccessZodSchemaValidation = z.object({
  password: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Password is required" : "Invalid Password",
    })
    .min(8, {
      error: (issue) => {
        if (issue.code === "too_small") {
          return `Password must be ${issue.minimum} characters long!`;
        }
      },
    })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      {
        error: () => {
          return "Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character.";
        },
      }
    ),
});
