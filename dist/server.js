"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const shutDown_1 = require("./app/utils/shutDown");
const env_1 = require("./app/config/env");
const redis_config_1 = require("./app/config/redis.config");
const seedSuperAdmin_1 = require("./app/utils/seedSuperAdmin");
const prisma_1 = require("./lib/prisma");
let server;
const bootstrap = async () => {
    try {
        await prisma_1.prisma.$connect();
        console.log("💾 Database connection established successfully.");
        await (0, redis_config_1.connectRedis)();
        await (0, seedSuperAdmin_1.seedSuperAdmin)();
        server = app_1.default.listen(env_1.envVars.PORT, () => {
            console.log(`Server is listening to PORT ${env_1.envVars.PORT}`);
        });
    }
    catch (error) {
        console.error("⛔ Critical startup failure! Shutting down process.");
        console.error(error);
        process.exit(1);
    }
};
bootstrap();
// Handle graceful terminations
process.on("SIGINT", () => (0, shutDown_1.gracefullShutDown)("SIGINT", server));
process.on("SIGTERM", () => (0, shutDown_1.gracefullShutDown)("SIGTERM", server));
// Handle unrecoverable core syntax or promise bugs
process.on("unhandledRejection", (reason) => {
    console.error("🚨 Unhandled Promise Rejection:", reason);
    (0, shutDown_1.errorShutDown)("Unhandled Rejection", server);
});
process.on("uncaughtException", (error) => {
    console.error("🚨 Uncaught Exceptions:", error);
    (0, shutDown_1.errorShutDown)("Uncaught Exception", server);
});
