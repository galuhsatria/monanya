import { sendingResetPassword } from "@/components/email/reset-password";
import { sendingEmailVerification } from "@/components/email/verification";
import { db } from "@/db/drizzle";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { APIError, createAuthMiddleware } from "better-auth/api";
import { nextCookies } from "better-auth/next-js";
import * as schema from "../db/schema";
import { username, lastLoginMethod } from "better-auth/plugins";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { user as users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendingResetPassword({
        url: url,
        name: user.name,
        email: user.email,
      });
    },
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendingEmailVerification({
        url: url,
        name: user.name,
        email: user.email,
      });
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },
  user: {
    deleteUser: {
      enabled: true,
    },
  },
  plugins: [nextCookies(), username(), lastLoginMethod()],
  databaseHooks: {
    user: {
      create: {
        before: async (user, ctx) => {
          const baseUsername = user.email.split("@")[0];
          let username = baseUsername;
          let counter = 1;

          while (true) {
            const existingUser = await db
              .select()
              .from(users)
              .where(eq(users.username, username))
              .limit(1);

            if (existingUser.length === 0) {
              break;
            }

            username = `${baseUsername}${counter}`;
            counter++;
          }

          return {
            data: {
              ...user,
              username: username,
            },
          };
        },
      },
    },
  },
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      const path = ctx.path;
      const response = ctx.context.returned as APIError;
      if (
        path.startsWith("/sign-up") &&
        response.body?.code === "USER_ALREADY_EXISTS"
      ) {
        throw new APIError("BAD_REQUEST", {
          ...response.body,
          message: "Akun sudah terdaftar",
        });
      }
      if (
        path.startsWith("/sign-in") &&
        response.body?.code === "INVALID_EMAIL_OR_PASSWORD"
      ) {
        throw new APIError("UNAUTHORIZED", {
          ...response.body,
          message: "Email atau Password salah",
        });
      }
      if (
        path.startsWith("/sign-in") &&
        response.body?.code === "INVALID_EMAIL"
      ) {
        throw new APIError("BAD_REQUEST", {
          ...response.body,
          message: "Email atau Password salah",
        });
      }
      if (
        path.startsWith("/sign-in") &&
        response.body?.code === "EMAIL_NOT_VERIFIED"
      ) {
        throw new APIError("FORBIDDEN", {
          ...response.body,
          message: "Email belum terverifikasi",
        });
      }
      if (
        path.startsWith("/sign-up") &&
        response.body?.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL"
      ) {
        throw new APIError("UNPROCESSABLE_ENTITY", {
          ...response.body,
          message: "Pengguna sudah terdaftar, gunakan email lain",
        });
      }
      if (
        path.startsWith("/change-password") &&
        response.body?.code === "INVALID_PASSWORD"
      ) {
        throw new APIError("BAD_REQUEST", {
          ...response.body,
          message: "Password lama salah",
        });
      }
      if (
        path.startsWith("/change-password") &&
        response.body?.code === "PASSWORD_TOO_SHORT"
      ) {
        throw new APIError("BAD_REQUEST", {
          ...response.body,
          message: "Password terlalu pendek, minimal 8 karakter",
        });
      }
      if (
        path.startsWith("/reset-password") &&
        response.body?.code === "INVALID_TOKEN"
      ) {
        throw new APIError("BAD_REQUEST", {
          ...response.body,
          message: "Token tidak valid atau sudah kadaluarsa",
        });
      }
      if (
        path.startsWith("/reset-password") &&
        response.body?.code === "PASSWORD_TOO_SHORT"
      ) {
        throw new APIError("BAD_REQUEST", {
          ...response.body,
          message: "Password terlalu pendek, minimal 8 karakter",
        });
      }
    }),
  },
});

export const getCurrentUser = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    redirect("/login");
    throw new Error("Not authenticated");
  }

  return session?.user;
};
