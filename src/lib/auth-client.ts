import { createAuthClient } from 'better-auth/react';
import { usernameClient,  lastLoginMethodClient } from 'better-auth/client/plugins';

export const authClient = createAuthClient({ plugins: [usernameClient(),  lastLoginMethodClient() ] });

export const { useSession } = authClient;
