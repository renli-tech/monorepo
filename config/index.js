import { omit } from "lodash/fp";
import replace from "@rollup/plugin-replace";
import typescript from "rollup-plugin-typescript2";
import { babel } from "@rollup/plugin-babel";
import json from "@rollup/plugin-json";
import commonjs from "@rollup/plugin-commonjs";
import nodeResolve from "@rollup/plugin-node-resolve";
import alias from "@rollup/plugin-alias";
import postcss from "rollup-plugin-postcss";
import autoprefixer from "autoprefixer";
import progress from "rollup-plugin-progress";
import { terser } from "rollup-plugin-terser";
import sourcemap from "rollup-plugin-sourcemaps";

import { clean } from "./plugins/clean";
import { copy as Cpy } from "./plugins/copy";

const env = process.env.NODE_ENV;
const isProduction = env === `production`;

const EXTENSIONS = [`.ts`, `.tsx`, `.js`, `.jsx`, `.es6`, `.es`, `.mjs`];
const omitOpts = omit([
  `alias`, //
  `external`,
  `output`,
  `plugins`,
  `babelHelpers`,
  `filename`,
]);

const defaultExternal = (id) => {
  return (
    !id.startsWith(`\0`) &&
    !id.startsWith(`~`) &&
    !id.startsWith(`.`) &&
    !id.startsWith(process.platform === `win32` ? process.cwd() : `/`)
  );
};

const createOutput = (dir = `dist`, defaultOpts) => {
  const opts = omitOpts(defaultOpts);
  const {
    alias: moduleAlias, //
    external,
    output,
    plugins = [],
    filename,
  } = defaultOpts;

  const tsconfigOverride = {
    compilerOptions: {
      sourceMap: !isProduction,
      mapRoot: dir,
    },
  };

  const defaultPlugins = [
    isProduction && clean(dir),
    replace({
      "process.env.NODE_ENV": JSON.stringify(
        isProduction ? `production` : `development`
      ),
      preventAssignment: true,
    }),
    postcss({
      plugins: [autoprefixer()],
      inject: false,
    }),
    Object.keys(moduleAlias || {}).length > 0 &&
      alias({
        ...moduleAlias,
        resolve: EXTENSIONS,
      }),
    nodeResolve({
      mainFields: [`module`, `main`],
      browser: true,
    }),
    commonjs({
      include: /\/node_modules\//,
    }),
    json(),
    typescript({
      typescript: require(`typescript`),
      tsconfigOverride,
      objectHashIgnoreUnknownHack: true,
      rollupCommonJSResolveHack: true,
    }),
    babel({
      babelHelpers: `bundled`,
      extensions: EXTENSIONS,
      exclude: `node_modules/**`,
    }),
    sourcemap(),
    isProduction && terser(),
    progress({
      clearLine: false,
    }),
  ];

  const outputs = [
    {
      dir,
      format: `cjs`,
      sourcemap: isProduction ? `` : true,
      chunkFileNames: filename ? `${filename}.js` : `[name].js`,
      entryFileNames: filename ? `${filename}.js` : `[name].js`,
      ...output,
    },
    {
      dir,
      format: `esm`,
      sourcemap: isProduction ? `` : true,
      chunkFileNames: filename ? `${filename}.esm.js` : `[name].esm.js`,
      entryFileNames: filename ? `${filename}.esm.js` : `[name].esm.js`,
      ...output,
    },
  ];

  return {
    ...opts,
    external: external || defaultExternal,
    plugins: defaultPlugins.filter(Boolean).concat(plugins),
    output: outputs,
  };
};

export const copy = Cpy;

const config = (opts) => {
  const inputs = Array.isArray(opts) ? opts : [opts];
  return inputs.map(({ dest: dir, ...opts }) => {
    return createOutput(dir, opts);
  });
};

export default config;
