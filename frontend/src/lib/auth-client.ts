import { createAuthClient } from "better-auth/react";
import { usernameClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL,
  plugins: [usernameClient()],
});

export const {
  signUp,
  signIn,
  signOut,
  useSession,
} = authClient;