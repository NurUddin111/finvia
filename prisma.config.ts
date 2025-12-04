
import { defineConfig } from "prisma/config";
import { envVars } from "./src/app/config/env";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: envVars.DB_URL,
  },
});
