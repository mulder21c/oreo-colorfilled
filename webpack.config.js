const path = require(`path`);
const htmlWebpackPlugin = require(`html-webpack-plugin`);

module.exports = {
  mode: `development`,
  entry: {
    "script/main": `./src/scripts/main.js`,
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
        options: {
          interpolate: true,
          esModule: false,
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: `file-loader`,
        options: {
          outputPath: 'images',
          name: `[hash:16].[ext]`,
          esModule: false,
        },
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