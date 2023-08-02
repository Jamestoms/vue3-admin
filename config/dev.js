module.exports = {
  devServer: {
    overlay: {
      warings: false,
      errors: false,
    },
    proxy: {
      "/api": {
        // 开发
        target: "http://192.168.1.40:8080",
        changeOrigin: true,
        // pathRewrite: {
        //     '^/api': ''
        // }
      },
    },
  },
  chainWebpack(config) {
    // 开发模式下去掉预加载和预请求的优化
    config.plugins.delete("preload");
    config.plugins.delete("prefetch");
  },
};
