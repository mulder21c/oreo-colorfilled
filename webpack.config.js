const path = require(`path`);
const htmlWebpackPlugin = require(`html-webpack-plugin`);

module.exports = {
  mode: `development`,
  entry: {
    "script/main": `./src/script/main.js`,
  },
  output: {
    path: path.join(__dirname, `dist`),
    publicPath: `/`,
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: `html-loader`,
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: path.join(__dirname, `src/views/index.html`),
      filename: `index.html`,
    }),
  ],
  optimization: {},
  resolve: {},
  devServer: {
    contentBase: path.join(__dirname, `/dist`),
    publicPath: `/`,
    port: 8000,
    open: true,
  }
}