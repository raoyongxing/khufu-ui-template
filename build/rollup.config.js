import babel from 'rollup-plugin-babel'  // js语法转换到低版本
import postcss from 'rollup-plugin-postcss'   // css, less, scss 的转换和压缩
import postcssImport from 'postcss-import'   // 处理css的@import
import autoprefixer from 'autoprefixer'  // 增加各个浏览器的前缀
import cssnano from 'cssnano'  // 对抽离的css文件压缩
import vue from 'rollup-plugin-vue'   // 增加对vue2的支持,暂不支持vue3
import { terser } from 'rollup-plugin-terser'  // 输出代码压缩

const name = 'khufu-ui'
const file = type => `dist/${name}.${type}.js`;

export { name, file }

export default {
    input: 'src/index.js',
    output: {
        name,
        file: file('esm'),
        format: 'es'
    },
    plugins: [
        vue(),
        babel({ exclude: 'node_modules/**' }),  // 语法转换到低版本
        postcss({
            plugins: [
                postcssImport(),
                autoprefixer(),
                cssnano()
            ],
            extract: 'css/index.css'  // 抽离css到单独的文件，使用时需要单独引入
        }),
        terser()
    ],
    external: [ 'vue' ]  // 本组件库依赖于vue,引用本组件库先引入vue
}