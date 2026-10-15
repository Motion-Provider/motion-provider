// scripts/src/clean.mjs
import { readdir, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);
const includeDist = process.argv.includes("--dist");
const includeLock = process.argv.includes("--lock");

async function listDirs(parent) {
  try {
    const entries = await readdir(path.join(root, parent), {
      withFileTypes: true,
    });
    return entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => path.join(parent, entry.name));
  } catch {
    return [];
  }
}

const workspaces = [
  ".",
  "scripts",
  "tests",
  ...(await Promise.all(["apps", "packages"].map(listDirs))).flat(),
];

const targets = new Set();

for (const ws of workspaces) {
  targets.add(path.join(ws, "node_modules"));
  targets.add(path.join(ws, ".next"));
  targets.add(path.join(ws, ".turbo"));
  if (ws.startsWith("apps")) targets.add(path.join(ws, "out"));
  if (includeDist) {
    targets.add(path.join(ws, "dist"));
    const files = await readdir(path.join(root, ws), { withFileTypes: true });
    for (const file of files) {
      // A stale tsbuildinfo makes tsc skip emitting after dist is deleted.
      if (file.isFile() && file.name.endsWith(".tsbuildinfo")) {
        targets.add(path.join(ws, file.name));
      }
    }
  }
}

if (includeLock) targets.add("package-lock.json");

await Promise.all(
  [...targets].map((target) =>
    rm(path.join(root, target), {
      recursive: true,
      force: true,
      maxRetries: 5,
      retryDelay: 200,
    }),
  ),
);

console.log(`Cleaned ${targets.size} targets.`);