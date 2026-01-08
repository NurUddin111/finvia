"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorShutDown = exports.gracefullShutDown = void 0;
const gracefullShutDown = (signal, server) => {
    console.log(`${signal} signal received.Server shutting down...`);
    if (server) {
        server.close(() => {
            console.log("🛑 Server closed!!!");
            //   Close DB here.
            console.log("📦 DB connection closed.");
            process.exit(0);
        });
    }
    else {
        process.exit(0);
    }
};
exports.gracefullShutDown = gracefullShutDown;
const errorShutDown = (signal, server) => {
    console.log(`${signal} detected.Server shutting down...`);
    if (server) {
        server.close(() => {
            console.log("🛑 Server closed!!!");
            //   Close DB here
            console.log("📦 DB connection closed.");
            process.exit(0);
        });
    }
    else {
        process.exit(0);
    }
};
exports.errorShutDown = errorShutDown;
