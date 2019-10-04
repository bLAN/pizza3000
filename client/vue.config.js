const prefixer = require('postcss-prefixer');

module.exports = {
  lintOnSave: false,
  outputDir: '../public',
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          prefixer({
            prefix: '',
          }),
        ],
      },
    },
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8081/',
        changeOrigin: true,
      },
    },
  },
};
