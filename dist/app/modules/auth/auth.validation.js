"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterSuccessZodSchemaValidation = exports.RegisterVerificationZodSchemaValidation = exports.RegisterRequestZodSchemaValidation = void 0;
const zod_1 = __importDefault(require("zod"));
exports.RegisterRequestZodSchemaValidation = zod_1.default.object({
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
    }),
    email: zod_1.default
        .email({
        error: (issue) => issue.input === undefined ? "Email is required" : "Invalid Email",
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
});
exports.RegisterVerificationZodSchemaValidation = zod_1.default.object({
    otp: zod_1.default.string().min(6, "OTP must be at least 6 characters long"),
});
exports.RegisterSuccessZodSchemaValidation = zod_1.default.object({
    password: zod_1.default
        .string({
        error: (issue) => issue.input === undefined ? "Password is required" : "Invalid Password",
    })
        .min(8, {
        error: (issue) => {
            if (issue.code === "too_small") {
                return `Password must be ${issue.minimum} characters long!`;
            }
        },
    })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
        error: () => {
            return "Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character.";
        },
    }),
});
