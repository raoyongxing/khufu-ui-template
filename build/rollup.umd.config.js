import basicConfig, { name, file } from './rollup.config.js'
export default {
  ...basicConfig,
  output: {
    name: 'well-bricks',
    file: file('umd'),
    format: 'umd',
    globals: {
      'lodash-es': '_'
    },
    exports: 'named'
  }
}