"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorShutDown = exports.gracefullShutDown = void 0;
const prisma_1 = require("../../lib/prisma");
const redis_config_1 = require("../config/redis.config");
const gracefullShutDown = async (signal, server) => {
    console.log(`${signal} signal received. Server shutting down...`);
    if (server) {
        server.close(async () => {
            console.log("🛑 Server closed!!!");
            try {
                await prisma_1.prisma.$disconnect();
                console.log("📦 DB connection closed.");
                await redis_config_1.redisClient.quit();
                console.log("🎒 Redis connection closed.");
                process.exit(0);
            }
            catch (error) {
                console.error("❌ Error during graceful shutdown cleanup:", error);
                process.exit(1);
            }
        });
    }
    else {
        process.exit(0);
    }
};
exports.gracefullShutDown = gracefullShutDown;
const errorShutDown = async (signal, server) => {
    console.log(`❌ ${signal} detected. Server shutting down...`);
    if (server) {
        server.close(async () => {
            console.log("🛑 Server closed!!!");
            try {
                await prisma_1.prisma.$disconnect();
                console.log("📦 DB connection closed.");
                await redis_config_1.redisClient.quit();
                console.log("🎒 Redis connection closed.");
            }
            catch (error) {
                console.error("❌ Error during error shutdown cleanup:", error);
            }
            finally {
                process.exit(1);
            }
        });
    }
    else {
        process.exit(1);
    }
};
exports.errorShutDown = errorShutDown;
