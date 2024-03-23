import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import svg from "rollup-plugin-svg";
import packagejson from "./package.json" assert {type: 'json'};

export default [
    {
        input: "src/index.ts",
        output: [
            {
                file: packagejson.main,
                format: "cjs",
                sourcemap: true
            },
            {
                file: packagejson.module,
                format: 'esm',
                sourcemap: true
            }
        ],
        plugins: [
            svg(),
            resolve(),
            commonjs(),
            typescript({ tsconfig: "./tsconfig.json" }),
            postcss({
                extensions: ['.css'],
                minimize: true,
                sourceMap: true,
                modules: true,
            }),
        ]
    },
    {
        input: "dist/esm/types/index.d.ts",
        output: [{ file: "dist/index.d.ts", format: 'esm' }],
        plugins: [dts()],
        external: [/\.css$/],
    }
];