import { betterAuth } from "better-auth";
import { username } from "better-auth/plugins";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { client, db } from "../config/db.js";

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  trustedOrigins: [process.env.CLIENT_URL || "http://localhost:5173"],
  emailAndPassword: {
    enabled: true,
  },
  plugins: [username()],
});
