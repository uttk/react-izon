const path = require("path");
const nodeExternals = require('webpack-node-externals');

module.exports = [
  {
    entry: path.resolve("src/components/index.tsx"),

    mode: "production",

    output: {
      path: path.resolve(__dirname, "./public"),
      publicPath: "/",
      filename: "bundle.js"
    },

    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: "ts-loader"
        },
        {
          test: /\.s[ac]ss$/i,
          loader: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                modules: true
              }
            },
            "sass-loader"
          ]
        }
      ]
    }
  },
  {
    entry: path.resolve("src/lib/index.ts"),

    mode: "production",

    target: "node",

    externals: [nodeExternals()],

    output: {
      path: path.resolve(__dirname, "./lib"),
      publicPath: "/",
      filename: "index.js"
    },

    node: {
      // Need this when working with express, otherwise the build fails
      __dirname: false,   // if you don't put this is, __dirname
      __filename: false,  // and __filename return blank or /
    },

    module: {
      rules: [
        {
          test: /\.ts$/,
          use: {
            loader: "ts-loader",
            options: {
              configFile: "tsconfig.lib.json"
            }
          }
        }
      ]
    },

  }
];
