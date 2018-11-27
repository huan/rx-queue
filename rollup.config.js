import json from 'rollup-plugin-json'

export default {
  input: 'dist/src/index.js',
  output: {
    file: 'bundles/rx-queue.es6.umd.js',
    name: 'window',
    sourcemap: true,
    format: 'umd',
    banner: '/* rx-queue version ' + require('./package.json').version + ' */',
    footer: '/* https://github.com/huan */',
  },
  plugins: [
    json()
  ]
}
