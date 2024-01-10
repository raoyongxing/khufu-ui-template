import demo from "../packages/demo/index.js"

function install (Vue) {
    Vue.use(demo)
}

export { // 按需引入，按需不能使用export default
    demo
}

export default install   // umd 全量引入
