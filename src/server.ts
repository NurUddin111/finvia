import { Server } from "http";
import app from "./app";
import { errorShutDown, gracefullShutDown } from "./app/utils/shutDown";
import { envVars } from "./app/config/env";

let server: Server;
const startServer = async () => {
  try {
    console.log("...Connecting to DB");
    // Connect DB here.

    console.log("DB Connected!");

    server = app.listen(envVars.PORT, () => {
      console.log(`Server is listening to PORT ${envVars.PORT}`);
    });
  } catch (error) {
    console.error("Failed to run server. Error:", error);
  }
};

(async () => {
  await startServer();
})();

// Termination Signals

process.on("SIGTERM", () => gracefullShutDown("SIGTERM", server));

process.on("SIGINT", () => gracefullShutDown("SIGTERM", server));

process.on("unhandledRejection", () =>
  errorShutDown("Unhandled Rejection", server)
);

process.on("uncaughtException", () =>
  errorShutDown("Uncaught Exception", server)
);
