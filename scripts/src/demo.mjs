import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { build } from "esbuild";

process.chdir(fileURLToPath(new URL("..", import.meta.url)));

const result = await build({
	absWorkingDir: process.cwd(),
	entryPoints: ["examples/react/main.tsx"],
	bundle: true,
	write: false,
	outdir: "demo-output",
	format: "esm",
	sourcemap: "inline",
	logLevel: "silent",
});

const files = new Map(
	result.outputFiles.map((file) => [
		file.path.split("/").at(-1),
		file.contents,
	]),
);

const server = createServer((req, res) => {
	if (req.url === "/main.js" || req.url === "/main.css") {
		res.setHeader(
			"Content-Type",
			req.url.endsWith(".js") ? "text/javascript" : "text/css",
		);
		res.end(files.get(req.url.slice(1)));
		return;
	}
	res.setHeader("Content-Type", "text/html");
	res.end(
		'<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Motion Provider · WAAPI</title><link rel="stylesheet" href="/main.css"><div id="root"></div><script type="module" src="/main.js"></script></html>',
	);
});

server.listen(4173, "127.0.0.1", () =>
	console.log(
		`Motion Provider demo: http://localhost:${server.address().port}`,
	),
);
