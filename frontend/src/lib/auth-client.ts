import { createAuthClient } from "better-auth/react";
import { usernameClient } from "better-auth/client/plugins";

export const { signUp, signIn, signOut, useSession } = createAuthClient({
  baseURL: import.meta.env.VITE_API_URL,
  plugins: [usernameClient()],
});
