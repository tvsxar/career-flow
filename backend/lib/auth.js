import { betterAuth } from "better-auth";
import { username } from "better-auth/plugins";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { client } from "../config/db.js";

export const auth = betterAuth({
  database: mongodbAdapter(client),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [username()],
});
