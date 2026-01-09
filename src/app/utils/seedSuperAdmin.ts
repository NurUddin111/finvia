import bcryptjs from "bcryptjs";
import { envVars } from "../config/env";
import { prisma } from "../../lib/prisma";
import { IAuthProvider } from "../modules/auth/auth.interface";
import { UserRole } from "@prisma/client";

export const seedSuperAdmin = async () => {
  try {
    const isSuperAdminExist = await prisma.user.findUnique({
      where: {
        email: envVars.SUPER_ADMIN_EMAIL,
      },
    });

    if (isSuperAdminExist && !isSuperAdminExist.isDeleted) {
      console.log("Super Admin Already Exists!");
      return;
    }

    if (isSuperAdminExist && isSuperAdminExist.isDeleted) {
      await prisma.user.update({
        where: {
          email: isSuperAdminExist.email,
        },
        data: {
          isDeleted: false,
        },
      });
      console.log("Super Admin Revived!");
      return;
    }

    console.log("...Creating Super Admin");

    const hashedPassword = await bcryptjs.hash(
      envVars.SUPER_ADMIN_PASSWORD,
      Number(envVars.BCRYPT_SALT_ROUND)
    );

    const authProvider: IAuthProvider = {
      provider: "credentials",
      providerId: envVars.SUPER_ADMIN_EMAIL,
    };

    const superAdmin = await prisma.user.create({
      data: {
        name: "SUPER_ADMIN",
        role: UserRole.ADMIN,
        email: envVars.SUPER_ADMIN_EMAIL,
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
    console.log("Super Admin Created Successfuly! \n");
    console.log(superAdmin);
  } catch (error) {
    console.error(error);
  }
};
