# Motion Playground

Import existing HTML or start with one of ten layouts. Choose a layer and edit its Motion Provider animation, then preview one layer or replay the full sequence in the sandbox. Export a React component with a typed `createMotionConfig` registry.

## Run locally

From the repository root, use Node 24 and the npm version declared in the root `package.json`.

```sh
npm ci
npm run build -w motion-provider
npm run dev -w playground
```

Open `http://localhost:8312`. Use `npm run build -w playground` to build the production app.

## Import and export

- Paste rendered HTML or open an HTML file. The sandbox supports inline styles, embedded style blocks, and standard Tailwind utilities. Include any custom class definitions in a style block. Use absolute image URLs for assets hosted elsewhere.
- Plain text tags can use `MotionText`. Rich text keeps its nested markup and can use `MotionContainer`. Images with a source can use `MotionImage`. Lists and repeated siblings can use `MotionChain`.
- Drafts and saved projects stay in the current browser. A copied project link contains its HTML and animation settings.
- **Export code** offers copy, download, or an npm executable. Run the generated command at the destination repository root. It verifies the export hash, writes the component to `src/components`, and preserves existing files. The command retrieves the executable from the running playground.
