import { execSync } from "node:child_process";

function globalSetup() {
  execSync("npm run test:e2e:setup", {
    cwd: "../backend",
    stdio: "inherit",
  });
}

export default globalSetup;
