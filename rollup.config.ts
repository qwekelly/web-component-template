import resolve from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";

const pkg = {
  "exportName": "web-ui",
  "main": "dist/web-ui.common.js",
  "module": "dist/web-ui.esm.js",
  "browser": "dist/web-ui.min.js",
}

export default [
  {
    input: 'src/index.ts',
    output: {
      file: pkg.module,
      format: 'esm',
      name: pkg.exportName,
      exports: 'named'
    },
    plugins: [
      // resolve(),
      typescript()
    ]
  }
]