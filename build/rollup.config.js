import babel from 'rollup-plugin-babel'  // js语法转换到低版本
import postcss from 'rollup-plugin-postcss'   // css, less, scss 的转换和压缩
import postcssImport from 'postcss-import'   // 处理css的@import
import autoprefixer from 'autoprefixer'  // 增加各个浏览器的前缀
import cssnano from 'cssnano'  // 对抽离的css文件压缩
import { terser } from 'rollup-plugin-terser'  // 输出代码压缩
import resolve from 'rollup-plugin-node-resolve'  // 解析node_modules中的模块
import commonjs from 'rollup-plugin-commonjs'  // 转换commonjs模块

const name = 'khufu-file-preview'
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
        resolve(),  // 解析node_modules中的模块
        commonjs(),  // 转换commonjs模块
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
}