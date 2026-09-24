import { fileURLToPath } from "node:url";
import parser from "@typescript-eslint/parser";
import { ESLint } from "eslint";
import hooks from "eslint-plugin-react-hooks";

process.chdir(fileURLToPath(new URL("..", import.meta.url)));
const eslint = new ESLint({
	overrideConfigFile: true,
	overrideConfig: [
		{
			files: ["src/**/*.ts", "src/**/*.tsx"],
			languageOptions: {
				parser,
				parserOptions: {
					ecmaVersion: 2022,
					sourceType: "module",
					ecmaFeatures: {
						jsx: true,
					},
				},
			},
			plugins: {
				"react-hooks": hooks,
			},
			rules: hooks.configs["recommended-latest"].rules,
		},
	],
});
const results = await eslint.lintFiles(["src"]);
console.log(await (await eslint.loadFormatter("stylish")).format(results));
const errors = results.reduce((n, r) => n + r.errorCount + r.warningCount, 0);
console.log(`React Hooks / React Compiler diagnostics: ${errors}`);
process.exitCode = errors ? 1 : 0;
