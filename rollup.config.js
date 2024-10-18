import typescript from 'rollup-plugin-typescript2'
import resolve from '@rollup/plugin-node-resolve'
import dts from 'rollup-plugin-dts'
import commonjs from '@rollup/plugin-commonjs'

const input = 'src/index.ts'
const external = ['dayjs']
export default [
  {
    input,
    external,
    output: [
      {
        format: 'umd',
        file: 'dist/index.umd.js',
        name: 'DevopsUtils',
        globals: {
          dayjs: 'Dayjs',
        },
      },
    ],
    plugins: [resolve(), commonjs(), typescript()],
  },
  {
    input,
    external,
    output: [
      {
        format: 'cjs',
        dir: 'lib',
        entryFileNames: '[name].cjs',
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    ],
    plugins: [resolve(), commonjs(), typescript()],
  },
  {
    external,
    input,
    output: [
      {
        format: 'cjs',
        dir: 'lib',
        entryFileNames: '[name].d.cts',
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    ],
    plugins: [dts()],
  },
  {
    input,
    external,
    output: [
      {
        format: 'es',
        dir: 'es',
        entryFileNames: '[name].js',
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    ],
    plugins: [resolve(), commonjs(), typescript()],
  },
  {
    external,
    input,
    output: [
      {
        format: 'es',
        dir: 'es',
        entryFileNames: '[name].d.ts',
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    ],
    plugins: [dts()],
  },
]
