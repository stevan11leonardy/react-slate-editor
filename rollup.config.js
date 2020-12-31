import peerDepsExternal from "rollup-plugin-peer-deps-external";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "rollup-plugin-typescript2";
import sass from "rollup-plugin-sass";

const packageJson = require("./package.json");

export default {
  input: ["src/TestComponent/index.tsx"],
  output: [
    {
      dir: "build",
      format: "cjs",
      sourcemap: true
    }
  ],
  preserveModules: true,
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'node_modules/react-is/index.js': ['isFragment', 'ForwardRef', 'Memo']
      }
    }),
    typescript({ useTsconfigDeclarationDir: true }),
    json(),
    sass({
      insert: true
    }),
  ]
};