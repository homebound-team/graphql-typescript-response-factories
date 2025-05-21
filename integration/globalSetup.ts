import { execSync } from "node:child_process";
import { join } from "node:path";

export default async function globalSetup() {
  execSync("yarn build", { stdio: "inherit" });
  execSync(join(__dirname, "runCodegen.sh"), { stdio: "inherit" });
}
