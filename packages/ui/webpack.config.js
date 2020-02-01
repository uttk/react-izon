const path = require("path");
const nodeExternals = require("webpack-node-externals");

const mode = process.env.NODE_ENV || "development";

module.exports = [
  {
    entry: path.resolve("src/components/index.tsx"),

    mode,

    target: "web",

    output: {
      path: path.resolve(__dirname, "./lib/public"),
      publicPath: "/",
      filename: "bundle.js"
    },

    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx"]
    },

    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: "ts-loader"
        },
        {
          test: /\.module\.scss$/i,
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
        },
        {
          test: /\.css$/i,
          loader: ["style-loader", "css-loader"]
        }
      ]
    }
  },
  {
    entry: path.resolve("src/lib/index.ts"),

    mode,

    target: "node",

    externals: [nodeExternals()],

    output: {
      path: path.resolve(__dirname, "./lib"),
      filename: "index.js",
      libraryTarget: "commonjs"
    },

    node: {
      // Need this when working with express, otherwise the build fails
      __dirname: false, // if you don't put this is, __dirname
      __filename: false // and __filename return blank or /
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
    }
  }
];
