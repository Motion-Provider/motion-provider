import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { gzipSync } from "node:zlib";
import { build } from "esbuild";

process.chdir(fileURLToPath(new URL("..", import.meta.url)));
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
		absWorkingDir: process.cwd(),
		stdin: {
			contents: source,
			resolveDir: process.cwd(),
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
			.map(([path]) => path),
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
writeFileSync(
	"docs/bundle-sizes.json",
	JSON.stringify(
		{
			reactExcluded: true,
			tool: "esbuild",
			measurements: rows,
		},
		null,
		2,
	) + "\n",
);
console.table(rows);
