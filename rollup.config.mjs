import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

export default {
    input: 'src/index.ts',
    output: {
        file: 'build/bundle.js',
        format: 'cjs',
        sourcemap: true
    },
    plugins: [
        typescript({ target: 'ESNext' }),
        nodeResolve(),
        commonjs()
    ]
}