// postcss.config.js
module.exports = {
  plugins: {
    // postcss-pxtorem 插件的版本需要 >= 5.0.0
    'postcss-pxtorem': {
      // rootValue 设置设计稿量出来的尺寸除以多少设置基准字体大小
      rootValue ({ file }) {
        // ||后面意思：只有自己写的样式才除以75转换成rem,其他的vant内置样式github markdown样式除以37.5
        // 样式稿宽度是750
        return file.indexOf('vant') !== -1 || file.indexOf('github-markdown-css') !== -1 ? 37.5 : 75
      },
      propList: ['*'] // 设置有哪些样式属性名，比如可以填写width，height就是只这些可以转换
    }
  }
}
