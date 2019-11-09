module.exports = {
  devServer: {
    proxy: {
      '/physical-report': {
        target: 'https://www.edolphin.cn/',
        changeOrigin: true
      }
    },
    port: 8080,
    disableHostCheck: true
  },
  publicPath: './',
  productionSourceMap: false,
  filenameHashing: true,
}
