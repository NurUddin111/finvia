"use strict";
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.globalErrorHandler = void 0;
const env_1 = require("../config/env");
const httpStatusCodes_1 = require("../utils/httpStatusCodes");
const handleZodError_1 = require("../errorHelpers/handleZodError");
const AppError_1 = __importDefault(require("../errorHelpers/AppError"));
const prisma_1 = require("../../generated/prisma");
/**
 * Hide sensitive Prisma details in production
 */
const sanitizePrismaError = (error) => {
    if (env_1.envVars.NODE_ENV === "production" && error?.code?.startsWith("P")) {
        return {
            message: "Database operation failed",
            errorDetails: null,
        };
    }
    return error;
};
const globalErrorHandler = (err, req, res, next) => {
    if (env_1.envVars.NODE_ENV === "development") {
        console.error("GLOBAL ERROR:", err);
    }
    let errorSources = [];
    let statusCode = httpStatusCodes_1.HttpStatusCodes.INTERNAL_SERVER_ERROR;
    let message = "Something Went Wrong";
    //   Zod Validation Error
    if (err?.name === "ZodError") {
        const simplifiedError = (0, handleZodError_1.handlerZodError)(err);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorSources = simplifiedError.errorSources;
    }
    //  Prisma Errors
    else if (err instanceof prisma_1.Prisma.PrismaClientKnownRequestError) {
        // P2002 — Unique constraint violation
        if (err.code === "P2002") {
            statusCode = httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST;
            message = "Duplicate field value violates unique constraint";
            errorSources = [
                {
                    path: `Model:${err.meta?.modelName}`,
                    message: `Unique Field Error`,
                },
            ];
        }
        else if (err.code === "P2003") {
            statusCode = httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST;
            message = "Invalid reference: related record not found";
            errorSources = [
                {
                    path: err.meta?.field_name || "relation",
                    message: "Referenced record does not exist",
                },
            ];
        }
        else {
            statusCode = httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST;
            message = err.message;
        }
    }
    else if (err instanceof prisma_1.Prisma.PrismaClientValidationError) {
        statusCode = httpStatusCodes_1.HttpStatusCodes.BAD_REQUEST;
        message = "Prisma validation error";
        errorSources = [
            {
                path: "Model Schema File",
                message: err.message,
            },
        ];
    }
    else if (err instanceof AppError_1.default) {
        statusCode = err.statusCode;
        message = err.message;
    }
    else if (err instanceof Error) {
        statusCode = httpStatusCodes_1.HttpStatusCodes.INTERNAL_SERVER_ERROR;
        message = err.message;
    }
    const sanitizedError = sanitizePrismaError(err);
    res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        err: env_1.envVars.NODE_ENV === "development" ? sanitizedError : null,
        stack: env_1.envVars.NODE_ENV === "development" ? err.stack : null,
    });
};
exports.globalErrorHandler = globalErrorHandler;
