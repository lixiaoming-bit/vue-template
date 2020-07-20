const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  pages: {
    // 多入口配置
    // filename: {
    //   entry: '',
    //   template: '',
    //   filename: ''
    // },
  },
  outputDir: '',
  assetsDir: '',
  indexPath: '',
  lintOnSave: true,
  devServer: {
    // host: 'localhost',
    // port: 8080, // 端口号
    // https: false,
    open: true, //配置自动启动浏览器
    proxy: {} // 代理
  },
  chainWebpack: config => {
    config.resolve.alias.set('@$', resolve('src'))
    config.entry('main').add('babel-polyfill')
  }
}
