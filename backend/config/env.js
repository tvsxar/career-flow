import dotenv from "dotenv";

const envFile =
  process.env.NODE_ENV === "e2e"
    ? ".env.e2e"
    : ".env";

dotenv.config({ path: envFile });
