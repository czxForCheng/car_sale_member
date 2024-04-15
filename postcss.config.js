// module.exports = {
//     plugins: {
//         "postcss-pxtorem": {
//             rootValue: 37.5,  // ps设计图纸宽度为750px时 就写上面的比例75  设计稿宽度的1/10
//             propList: ["*"]
//         }
//     }
// }
module.exports = {
    "plugins": {
        "postcss-import": {},
        "postcss-url": {},
        "postcss-aspect-ratio-mini": {},
        // "postcss-cssnext": {}, //该插件可以让我们使用CSS未来的特性，其会对这些特性做相关的兼容性处理。
        "postcss-px-to-viewport": {
            viewportWidth: 375,
            viewportHeight: 667,
            unitPrecision: 3,
            viewportUnit: 'vw',
            selectorBlackList: ['.ignore', '.hairlines',],
            exclude: [/node_modules/, /page/],
            minPixelValue: 1,
            mediaQuery: false
        },
        "cssnano": {
            "cssnano-preset-advanced": {
                zindex: false,
                autoprefixer: false
            },
        }
    }
};