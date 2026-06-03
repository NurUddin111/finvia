"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedSuperAdmin = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const env_1 = require("../config/env");
const prisma_1 = require("../../lib/prisma");
const client_1 = require("@prisma/client");
const seedSuperAdmin = async () => {
    try {
        // This query acts as your implicit database connection check during startup!
        const isSuperAdminExist = await prisma_1.prisma.user.findUnique({
            where: {
                email: env_1.envVars.SUPER_ADMIN_EMAIL,
            },
        });
        if (isSuperAdminExist && !isSuperAdminExist.isDeleted) {
            console.log("🚀 Super Admin Already Exists!");
            return;
        }
        if (isSuperAdminExist && isSuperAdminExist.isDeleted) {
            await prisma_1.prisma.user.update({
                where: {
                    email: isSuperAdminExist.email,
                },
                data: {
                    isDeleted: false,
                },
            });
            console.log("🔄 Super Admin Revived!");
            return;
        }
        console.log("...Creating Super Admin");
        const hashedPassword = await bcryptjs_1.default.hash(env_1.envVars.SUPER_ADMIN_PASSWORD, Number(env_1.envVars.BCRYPT_SALT_ROUND));
        const authProvider = {
            provider: "credentials",
            providerId: env_1.envVars.SUPER_ADMIN_EMAIL,
        };
        const superAdmin = await prisma_1.prisma.user.create({
            data: {
                name: "SUPER_ADMIN",
                role: client_1.UserRole.ADMIN,
                email: env_1.envVars.SUPER_ADMIN_EMAIL,
                password: hashedPassword,
                isVerified: true,
                auths: {
                    create: {
                        provider: authProvider.provider,
                        providerId: authProvider.providerId,
                    },
                },
            },
        });
        console.log("✨ Super Admin Created Successfully! \n");
        console.log(superAdmin);
    }
    catch (error) {
        console.error("❌ Error running seedSuperAdmin:");
        throw error;
    }
};
exports.seedSuperAdmin = seedSuperAdmin;
