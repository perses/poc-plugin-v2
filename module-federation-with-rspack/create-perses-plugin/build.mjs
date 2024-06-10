import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["src/index.ts"],
  minify: true,
  outfile: "dist/index.mjs",
  platform: "node",
  format: "esm",
});
