import { Server } from "http";
import { prisma } from "../../lib/prisma";
import { redisClient } from "../config/redis.config";

export const gracefullShutDown = async (signal: string, server: Server) => {
  console.log(`${signal} signal received. Server shutting down...`);

  if (server) {
    server.close(async () => {
      console.log("🛑 Server closed!!!");

      try {
        await prisma.$disconnect();
        console.log("📦 DB connection closed.");
        await redisClient.quit();
        console.log("🎒 Redis connection closed.");

        process.exit(0);
      } catch (error) {
        console.error("❌ Error during graceful shutdown cleanup:", error);
        process.exit(1);
      }
    });
  } else {
    process.exit(0);
  }
};

export const errorShutDown = async (signal: string, server: Server) => {
  console.log(`❌ ${signal} detected. Server shutting down...`);

  if (server) {
    server.close(async () => {
      console.log("🛑 Server closed!!!");

      try {
        await prisma.$disconnect();
        console.log("📦 DB connection closed.");

        await redisClient.quit();
        console.log("🎒 Redis connection closed.");
      } catch (error) {
        console.error("❌ Error during error shutdown cleanup:", error);
      } finally {
        process.exit(1);
      }
    });
  } else {
    process.exit(1);
  }
};
