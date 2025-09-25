import { sendingResetPassword } from '@/components/email/reset-password';
import { sendingEmailVerification } from '@/components/email/verification';
import { db } from '@/db/drizzle';
import { betterAuth } from 'better-auth';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { APIError, createAuthMiddleware } from 'better-auth/api';
import { nextCookies } from 'better-auth/next-js';
import * as schema from '../db/schema';

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema,
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      await sendingResetPassword({ url: url, name: user.name, email: user.email });
    },
  },
  emailVerification: {
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      await sendingEmailVerification({ url: url, name: user.name, email: user.email });
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
  plugins: [nextCookies()],
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      const path = ctx.path;
      const response = ctx.context.returned as APIError;
      if (path.startsWith('/sign-up') && response.body?.code === 'USER_ALREADY_EXISTS') {
        throw new APIError('BAD_REQUEST', {
          ...response.body,
          message: 'Akun sudah terdaftar',
        });
      }
      if (path.startsWith('/sign-in') && response.body?.code === 'INVALID_EMAIL_OR_PASSWORD') {
        throw new APIError('UNAUTHORIZED', {
          ...response.body,
          message: 'Email atau Password salah',
        });
      }
      if (path.startsWith('/sign-in') && response.body?.code === 'INVALID_EMAIL') {
        throw new APIError('BAD_REQUEST', {
          ...response.body,
          message: 'Email atau Password salah',
        });
      }
      if (path.startsWith('/sign-in') && response.body?.code === 'EMAIL_NOT_VERIFIED') {
        throw new APIError('FORBIDDEN', {
          ...response.body,
          message: 'Email belum terverifikasi',
        });
      }
      if (path.startsWith('/sign-up') && response.body?.code === 'USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL') {
        throw new APIError('UNPROCESSABLE_ENTITY', {
          ...response.body,
          message: 'Pengguna sudah terdaftar, gunakan email lain',
        });
      }
      if (path.startsWith('/change-password') && response.body?.code === 'INVALID_PASSWORD') {
        throw new APIError('BAD_REQUEST', {
          ...response.body,
          message: 'Password lama salah',
        });
      }
      if (path.startsWith('/change-password') && response.body?.code === 'PASSWORD_TOO_SHORT') {
        throw new APIError('BAD_REQUEST', {
          ...response.body,
          message: 'Password terlalu pendek, minimal 8 karakter',
        });
      }
      if (path.startsWith('/reset-password') && response.body?.code === 'INVALID_TOKEN') {
        throw new APIError('BAD_REQUEST', {
          ...response.body,
          message: 'Token tidak valid atau sudah kadaluarsa',
        });
      }
      if (path.startsWith('/reset-password') && response.body?.code === 'PASSWORD_TOO_SHORT') {
        throw new APIError('BAD_REQUEST', {
          ...response.body,
          message: 'Password terlalu pendek, minimal 8 karakter',
        });
      }
    }),
  },
});
