import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";
import { build } from "esbuild";

const PKG_ROOT = fileURLToPath(
	new URL("../../packages/motion-provider/", import.meta.url),
);
const DIST_ENTRY = path.join(PKG_ROOT, "dist", "index.js");
const OUT_DIR = path.join(PKG_ROOT, "out");
const OUT = path.join(OUT_DIR, "bunle-sizes.json");

if (!existsSync(DIST_ENTRY)) {
	throw new Error(
		`Missing build output at ${DIST_ENTRY}. Build packages/motion-provider first.`,
	);
}

const cases = {
	"Engine animateElement": `export {animateElement} from './dist/engine/index.js'`,
	"Lite component + fadeIn": `export {Motion} from './dist/components/motion.js';export {fadeIn} from './dist/presets/index.js'`,
	"MotionContainer + full preset registry": `export {MotionContainer} from './dist/index.js'`,
	"All React exports": `export * from './dist/index.js'`,
	"Config getter only": `export {createMotionRegistry} from './dist/config.js'`,
};

const rows = [];

for (const [name, source] of Object.entries(cases)) {
	const result = await build({
		absWorkingDir: PKG_ROOT,
		stdin: {
			contents: source,
			resolveDir: PKG_ROOT,
		},
		bundle: true,
		write: false,
		minify: true,
		format: "esm",
		target: "es2022",
		external: ["react", "react/*"],
		metafile: true,
		logLevel: "silent",
	});

	const code = result.outputFiles[0].contents;

	const inputs = Object.values(result.metafile.outputs).flatMap((output) =>
		Object.entries(output.inputs)
			.filter(([, value]) => value.bytesInOutput > 0)
			.map(([inputPath]) => inputPath),
	);
	if (inputs.some((p) => /node_modules\/(motion|framer-motion)/.test(p)))
		throw new Error("Animation dependency leaked");
	if (
		name === "Config getter only" &&
		inputs.some((p) => /components|presets/.test(p))
	)
		throw new Error("Server helper did not shake");
	if (
		name === "MotionContainer + full preset registry" &&
		inputs.some((p) => /motion-(image|movie|text|chain|link)\.js/.test(p))
	)
		throw new Error("Unused component did not shake");
	rows.push({
		entry: name,
		minifiedBytes: code.byteLength,
		gzipBytes: gzipSync(code).byteLength,
	});
}

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(
	OUT,
	`${JSON.stringify(
		{
			reactExcluded: true,
			tool: "esbuild",
			measurements: rows,
		},
		null,
		2,
	)}\n`,
);
console.table(rows);