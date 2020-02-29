const path = require(`path`);
const htmlWebpackPlugin = require(`html-webpack-plugin`);
const copyPlugin = require('copy-webpack-plugin');

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
        test: /\.(png|jpe?g|gif|svg|ttf|woff|woff2|eot)$/i,
        loader: `file-loader`,
        options: {
          outputPath: 'images',
          name: `[hash:16].[ext]`,
          esModule: false,
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          `style-loader`,
          `css-loader`,
          `postcss-loader`,
          `sass-loader`
        ]
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        include: [
          path.resolve(__dirname, "./src"),
        ]
      },
    ]
  },
  plugins: [
    new copyPlugin([
      {
        from: `src/assets/fonts`,
        to: `assets/fonts`
      }
    ]),
    new htmlWebpackPlugin({
      inject: true,
      chunks: ["script/main"],
      template: path.join(__dirname, `src/views/index.html`),
      filename: `index.html`,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
    }),
  ],
  optimization: {},
  resolve: {
    alias: {
      "@": path.resolve(__dirname, `./src`),
      "Images": path.resolve(__dirname, `./src/assets/images`),
      "Modules": path.resolve(__dirname, `./node_modules`),
    },
  },
  devtool: `inline-source-map`,
  devServer: {
    contentBase: path.join(__dirname, `/dist`),
    publicPath: `/`,
    port: 8000,
    open: true,
  },
}