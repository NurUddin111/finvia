import { PrismaPg } from '@prisma/adapter-pg'
// import { PrismaClient } from "../generated/prisma/client";
import { envVars } from "../app/config/env";
import { PrismaClient } from '@prisma/client';

const connectionString = `${envVars.DB_URL}`

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

export { prisma }