import { gzipSync } from "node:zlib";

const executable = `#!/usr/bin/env node
import { createHash, randomUUID } from "node:crypto";
import { link, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, isAbsolute, resolve } from "node:path";
import { gunzipSync } from "node:zlib";

async function main([code, path = "src/components/animated-component.tsx"]) {
  if (!code || code === "--help") {
    console.log("Usage: motion-playground <export-code> [relative-path.tsx]");
    return;
  }
  if (code.length > 100_000 || !/^[a-f0-9]{64}\\.[A-Za-z0-9_-]+$/.test(code)) {
    throw new Error("Invalid export code.");
  }
  if (isAbsolute(path) || path.split(/[\\\\/]/).includes("..") || !path.endsWith(".tsx")) {
    throw new Error("Choose a relative .tsx file path inside this project.");
  }
  const [expected, payload] = code.split(".");
  const source = gunzipSync(Buffer.from(payload, "base64url"), { maxOutputLength: 1_000_000 });
  if (createHash("sha256").update(source).digest("hex") !== expected) {
    throw new Error("The export code is incomplete or has changed.");
  }
  const destination = resolve(path);
  await mkdir(dirname(destination), { recursive: true });
  const temp = resolve(dirname(destination), ".motion-" + randomUUID() + ".tmp");
  try {
    await writeFile(temp, source, { flag: "wx" });
    await link(temp, destination);
  } catch (error) {
    if (error.code === "EEXIST") throw new Error(path + " already exists. Choose a different file.");
    throw error;
  } finally {
    await rm(temp, { force: true });
  }
  console.log("Created " + path);
}

main(process.argv.slice(2)).catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
`;

function tarEntry(name: string, text: string, mode: number) {
  const data = Buffer.from(text);
  const header = Buffer.alloc(512);
  function octal(value: number, offset: number, width: number) {
    header.write(
      value.toString(8).padStart(width - 1, "0") + "\0",
      offset,
      width,
      "ascii",
    );
  }
  header.write(name);
  octal(mode, 100, 8);
  octal(0, 108, 8);
  octal(0, 116, 8);
  octal(data.length, 124, 12);
  octal(0, 136, 12);
  header.fill(32, 148, 156);
  header.write("0", 156);
  header.write("ustar\0" + "00", 257);
  octal(
    header.reduce((sum, byte) => sum + byte, 0),
    148,
    8,
  );
  return Buffer.concat([
    header,
    data,
    Buffer.alloc((512 - (data.length % 512)) % 512),
  ]);
}

export function cliPackage() {
  const manifest = JSON.stringify({
    name: "@motion-provider/playground-cli",
    version: "1.0.0",
    bin: { "motion-playground": "./cli.mjs" },
    engines: { node: ">=20" },
  });
  const archive = Buffer.concat([
    tarEntry("package/package.json", manifest, 0o644),
    tarEntry("package/cli.mjs", executable, 0o755),
    Buffer.alloc(1024),
  ]);
  return gzipSync(archive);
}
