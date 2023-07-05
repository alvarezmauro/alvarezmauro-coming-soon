const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const MASTER_JS_FILE = "./src/scripts/master.js";
const MASTER_HTML_FILE = "./src/index.html";
const OUTPUT_FOLDER = "public";
const OUTPUT_MASTER_JS = "[name].bundle.js";

module.exports = (env) => {
  return {
    mode: env.mode || "none",

    entry: {
      main: MASTER_JS_FILE,
    },

    output: {
      filename: OUTPUT_MASTER_JS,
      path: path.resolve(__dirname, OUTPUT_FOLDER),
      clean: true,
    },

    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.less$/,
          use: ["style-loader", "css-loader", "less-loader"],
        },
        {
          test: /\.(jpe?g|png|gif|ico|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
          type: "asset/inline",
          generator: {
            filename: "[name][ext]",
          },
        },
      ],
    },

    devtool: env.mode !== "production" ? "inline-source-map" : "none",

    devServer: {
      static: {
        directory: path.resolve(__dirname, OUTPUT_FOLDER),
      },
      compress: true,
      port: 8000,
    },

    plugins: getPlugins(env),
  };
};

function getHtmlWebpackPluginOpt(env) {
  const opt = {
    template: MASTER_HTML_FILE,
    minify: {
      collapseInlineTagWhitespace: true,
      collapseWhitespace: true,
    },
    scriptLoading: "blocking",
  };
  return opt;
}

function getPlugins(env) {
  const plugins = [new HtmlWebpackPlugin(getHtmlWebpackPluginOpt(env))];
  return plugins;
}
