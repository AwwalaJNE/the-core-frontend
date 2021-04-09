const ExtractTextPlugin = require("mini-css-extract-plugin");
const path = require("path");

const host = '0.0.0.0'
const port = 8080

module.exports = {
  lintOnSave: false,
  devServer: {
    port,
    host,
    public: `${host}:${port}`,
    hotOnly: true,
    disableHostCheck: true,
    clientLogLevel: 'warning',
    inline: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    },
  },
  runtimeCompiler: true,
  chainWebpack: (config) => {
    config.optimization.delete("splitChunks");

    config.output.filename("[name].js");

    config.plugin("extract-css").use(ExtractTextPlugin, [
      {
        filename: "[name].css",
        allChunks: true,
      },
    ]);
    config.module
      .rule('css-loader', [
        {
          test: /\.css$/,
          use: [
            {
              loader: ExtractTextPlugin.loader,
              options: {
                publicPath: (resourcePath, context) => {
                  // publicPath is the relative path of the resource to the context
                  // e.g. for ./css/admin/main.css the publicPath will be ../../
                  // while for ./css/main.css the publicPath will be ../
                  return path.relative(path.dirname(resourcePath), context) + '/';
                },
              },
            },
            'css-loader',
          ],
        },
      ]);
  },
  configureWebpack: {
    output: {
      filename: "[name].js",
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
      extensions: [".js", ".vue", ".json"],
    },
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: `
          @import "@/scss/style.scss";
        `,
      },
    },
  },
};
