// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        assets: path.resolve(__dirname, "./src/assets"),
        "@": path.resolve(__dirname, "./src"),
      },
      extensions: [".ts", ".js", ".vue", ".json"],
    },
  },
  chainWebpack: (config) => {
    config.output.chunkFilename("static/js/[name].[hash].js");
    config.output.filename("static/js/[name].[hash].js");
  },
};
