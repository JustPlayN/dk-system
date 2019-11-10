module.exports = {
  devServer: {
    proxy: {
      '/physical-report': {
        target: 'https://www.edolphin.cn/',
        changeOrigin: true
      }
    },
    port: 8666,
    disableHostCheck: true
  },
  publicPath: './',
  productionSourceMap: false,
  filenameHashing: true,
}
