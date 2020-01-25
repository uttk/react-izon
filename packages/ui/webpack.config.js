const path = require('path')

module.exports = {
  entry: path.resolve('src/index.tsx'),

  mode: "production",

  output: {
    path: path.resolve(__dirname, './public'),
    publicPath: "/",
    filename: 'bundle.js',
  },

  module: {
    rules: [{
      test: /\.(ts|tsx)$/,
      use: 'ts-loader',
    }],
  }
}
