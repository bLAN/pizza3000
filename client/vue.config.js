const prefixer = require('postcss-prefixer');

module.exports = {
  lintOnSave: false,
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
