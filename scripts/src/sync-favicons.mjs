import { cp } from "node:fs/promises";
import { resolve } from "node:path";

// Workspace scripts run from the app directory.
await cp(new URL("../../public/favicon/", import.meta.url), resolve("public/favicon"), {
  recursive: true,
});
