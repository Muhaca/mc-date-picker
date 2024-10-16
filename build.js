const esbuild = require('esbuild');
const cssModulesPlugin = require('esbuild-css-modules-plugin');

const buildOptions = {
    entryPoints: ['src/index.ts'],
    bundle: true,
    outfile: 'dist/index.js',
    format: 'esm',
    minify: true,
    sourcemap: true,
    plugins: [cssModulesPlugin()],
    external: ['react', 'react-dom'],
};

esbuild.build(buildOptions).then(() => {
    console.log('Build succeeded.');
}).catch(() => process.exit(1));
