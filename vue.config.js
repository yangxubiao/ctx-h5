// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  publicPath: './',
  productionSourceMap: false,
  assetsDir: 'static',
  indexPath: './index.html',
  transpileDependencies: ['vant'],
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.ts',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        assets: path.resolve(__dirname, './src/assets'),
        '@': path.resolve(__dirname, './src'),
      },
      extensions: ['.ts', '.js', '.vue', '.json'],
    },
  },
  chainWebpack: config => {
    config.output.chunkFilename('static/js/[name].[hash].js');
    config.output.filename('static/js/[name].[hash].js');
  },
};
