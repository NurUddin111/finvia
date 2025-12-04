/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import { IErrorSources } from "../interfaces/error.types";
import { HttpStatusCodes } from "../utils/httpStatusCodes";
import { handlerZodError } from "../errorHelpers/handleZodError";
import AppError from "../errorHelpers/AppError";
import { Prisma } from "../../generated/prisma";

/**
 * Hide sensitive Prisma details in production
 */
const sanitizePrismaError = (error: any) => {
  if (envVars.NODE_ENV === "production" && error?.code?.startsWith("P")) {
    return {
      message: "Database operation failed",
      errorDetails: null,
    };
  }
  return error;
};

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (envVars.NODE_ENV === "development") {
    console.error("GLOBAL ERROR:", err);
  }

  let errorSources: IErrorSources[] = [];
  let statusCode = HttpStatusCodes.INTERNAL_SERVER_ERROR;
  let message = "Something Went Wrong";

  //   Zod Validation Error

  if (err?.name === "ZodError") {
    const simplifiedError = handlerZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources as IErrorSources[];
  }

  //  Prisma Errors
  else if (err instanceof Prisma.PrismaClientKnownRequestError) {
    // P2002 — Unique constraint violation
    if (err.code === "P2002") {
      statusCode = HttpStatusCodes.BAD_REQUEST;
      message = "Duplicate field value violates unique constraint";
      errorSources = [
        {
          path: `Model:${err.meta?.modelName}`,
          message: `Unique Field Error`,
        },
      ];
    } else if (err.code === "P2003") {
      statusCode = HttpStatusCodes.BAD_REQUEST;
      message = "Invalid reference: related record not found";
      errorSources = [
        {
          path: (err.meta?.field_name as string) || "relation",
          message: "Referenced record does not exist",
        },
      ];
    } else {
      statusCode = HttpStatusCodes.BAD_REQUEST;
      message = err.message;
    }
  } else if (err instanceof Prisma.PrismaClientValidationError) {
    statusCode = HttpStatusCodes.BAD_REQUEST;
    message = "Prisma validation error";
    errorSources = [
      {
        path: "Model Schema File",
        message: err.message,
      },
    ];
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    statusCode = HttpStatusCodes.INTERNAL_SERVER_ERROR;
    message = err.message;
  }

  const sanitizedError = sanitizePrismaError(err);

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err: envVars.NODE_ENV === "development" ? sanitizedError : null,
    stack: envVars.NODE_ENV === "development" ? err.stack : null,
  });
};
