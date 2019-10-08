module.exports = {
  devServer: {
    proxy: {
      '/physical-report': {
        target: 'http://jt26996495.zicp.vip:26329',
        changeOrigin: true
      }
    },
    port: 8080,
    disableHostCheck: true
  },
  filenameHashing: true,
}
