import basicConfig, { name, file } from './rollup.config.js'
export default {
  ...basicConfig,
  output: {
    name: 'well-bricks',
    file: file('umd'),
    format: 'umd',
    globals: {
      'vue': 'Vue',
      'lodash-es': '_'
    },
    exports: 'named'
  }
}