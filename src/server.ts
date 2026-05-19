import { Server } from "http";
import app from "./app";
import { errorShutDown, gracefullShutDown } from "./app/utils/shutDown";
import { envVars } from "./app/config/env";
import { connectRedis } from "./app/config/redis.config";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin";
import { prisma } from "./lib/prisma";

let server: Server;

const bootstrap = async () => {
  try {
    await prisma.$connect();
    console.log("💾 Database connection established successfully.");

    await connectRedis();
    await seedSuperAdmin();

    server = app.listen(envVars.PORT, () => {
      console.log(`Server is listening to PORT ${envVars.PORT}`);
    });
  } catch (error) {
    console.error("⛔ Critical startup failure! Shutting down process.");
    console.error(error);
    process.exit(1);
  }
};

bootstrap();

// Handle graceful terminations
process.on("SIGINT", () => gracefullShutDown("SIGINT", server));
process.on("SIGTERM", () => gracefullShutDown("SIGTERM", server));

// Handle unrecoverable core syntax or promise bugs
process.on("unhandledRejection", (reason) => {
  console.error("🚨 Unhandled Promise Rejection:", reason);
  errorShutDown("Unhandled Rejection", server);
});

process.on("uncaughtException", (error) => {
  console.error("🚨 Uncaught Exceptions:", error);
  errorShutDown("Uncaught Exception", server);
});
