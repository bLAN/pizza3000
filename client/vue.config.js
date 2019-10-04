const prefixer = require('postcss-prefixer');

module.exports = {
  lintOnSave: false,
  outputDir: '../public',
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          prefixer({
            prefix: 'b-',
          }),
        ],
      },
    },
  },
};
