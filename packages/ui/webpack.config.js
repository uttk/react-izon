const path = require('path')

module.exports = {
  entry: path.resolve('src/index.tsx'),

  output: {
    path: path.resolve(__dirname, '/dist'),
    publicPath: '/',
    filename: 'bundle.js',
  },

  module: {
    rules: [{
      test: /\.(ts|tsx)$/,
      use: 'awesome-typescript-loader',
    }],
  },

  devServer: {
    host: 'localhost',
    port: 9000,
    contentBase: path.resolve("public"),
  },
}
