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
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index', 'vue', 'vue-router', 'vuex'],
    },
  },
  css: {
    loaderOptions: {
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "${path.join(
              __dirname,
              './src/stylus/theme.less',
            )}";`,
          },
        },
      },
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
