import dotenv from "dotenv";

dotenv.config();

interface IEnvConfig {
  PORT: string;
  DB_URL: string;
  NODE_ENV: "development" | "production";
  REDIS_USERNAME: string;
  REDIS_PASSWORD: string;
  REDIS_HOST: string;
  REDIS_PORT: string;
  EMAIL_SENDER: {
    SMTP_USER: string;
    SMTP_PASS: string;
    SMTP_PORT: string;
    SMTP_HOST: string;
    SMTP_FROM: string;
  };
  JWT_CREATION_SECRET: string;
  JWT_CREATION_EXPIRES: string;
  JWT_VERIFIED_CREATION_SECRET: string;
  JWT_VERIFIED_CREATION_EXPIRES: string;
  JWT_ACCESS_SECRET: string;
  JWT_ACCESS_EXPIRES: string;
  JWT_REFRESH_SECRET: string;
  JWT_REFRESH_EXPIRES: string;
  BCRYPT_SALT_ROUND: string;
  EXPRESS_SESSION_SECRET: string;
  FRONTEND_URL: string;
}

const loadEnvVariables = (): IEnvConfig => {
  const requiredEnvVariables: string[] = [
    "PORT",
    "DB_URL",
    "NODE_ENV",
    "REDIS_USERNAME",
    "REDIS_PASSWORD",
    "REDIS_HOST",
    "REDIS_PORT",
    "SMTP_PASS",
    "SMTP_PORT",
    "SMTP_HOST",
    "SMTP_USER",
    "SMTP_FROM",
    "JWT_CREATION_SECRET",
    "JWT_CREATION_EXPIRES",
    "JWT_VERIFIED_CREATION_SECRET",
    "JWT_VERIFIED_CREATION_EXPIRES",
    "JWT_ACCESS_SECRET",
    "JWT_ACCESS_EXPIRES",
    "JWT_REFRESH_SECRET",
    "JWT_REFRESH_EXPIRES",
    "BCRYPT_SALT_ROUND",
    "EXPRESS_SESSION_SECRET",
    "FRONTEND_URL"
  ];

  requiredEnvVariables.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing require environment variable ${key}`);
    }
  });

  return {
    PORT: process.env.PORT as string,
    DB_URL: process.env.DB_URL as string,
    NODE_ENV: process.env.NODE_ENV as "development" | "production",
    REDIS_USERNAME: process.env.REDIS_USERNAME as string,
    REDIS_PASSWORD: process.env.REDIS_PASSWORD as string,
    REDIS_HOST: process.env.REDIS_HOST as string,
    REDIS_PORT: process.env.REDIS_PORT as string,
    EMAIL_SENDER: {
      SMTP_USER: process.env.SMTP_USER as string,
      SMTP_PASS: process.env.SMTP_PASS as string,
      SMTP_PORT: process.env.SMTP_PORT as string,
      SMTP_HOST: process.env.SMTP_HOST as string,
      SMTP_FROM: process.env.SMTP_FROM as string,
    },
    JWT_CREATION_SECRET: process.env.JWT_CREATION_SECRET as string,
    JWT_CREATION_EXPIRES: process.env.JWT_CREATION_EXPIRES as string,
    JWT_VERIFIED_CREATION_SECRET: process.env
      .JWT_VERIFIED_CREATION_SECRET as string,
    JWT_VERIFIED_CREATION_EXPIRES: process.env
      .JWT_VERIFIED_CREATION_EXPIRES as string,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
    JWT_ACCESS_EXPIRES: process.env.JWT_ACCESS_EXPIRES as string,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET as string,
    JWT_REFRESH_EXPIRES: process.env.JWT_REFRESH_EXPIRES as string,
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
    EXPRESS_SESSION_SECRET: process.env.EXPRESS_SESSION_SECRET as string,
    FRONTEND_URL: process.env.FRONTEND_URL as string,
  };
};

export const envVars = loadEnvVariables();
