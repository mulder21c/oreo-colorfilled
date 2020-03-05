const path = require(`path`);
const htmlWebpackPlugin = require(`html-webpack-plugin`);
const copyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: `development`,
  entry: {
    "script/main": `./src/scripts/main.js`,
    "script/step1": `./src/scripts/step1.js`,
    "script/step2": `./src/scripts/step2.js`,
    "script/step3": `./src/scripts/step3.js`,
    "script/complete": `./src/scripts/complete.js`,
  },
  output: {
    path: path.join(__dirname, `dist`),
    publicPath: `./`,
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        use: [
          {
            loader: `html-loader`,
            options: {
              interpolate: true,
              esModule: false,
            },
          },
          {
            loader: `img-svg-inline-loader`,
            options: {
              svgo: null
            }
          }
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        exclude: [
          path.resolve(__dirname, `./src/assets/images/paint.svg`)
        ],
        loader: `file-loader`,
        options: {
          outputPath: 'images',
          name: `[hash:16].[ext]`,
          esModule: false,
        },
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/i,
        loader: `file-loader`,
        options: {
          outputPath: 'assets/fonts',
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
        from: `src/public/images`,
        to: `images`
      },
      {
        from: `src/public/video`,
        to: `video`
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
    new htmlWebpackPlugin({
      inject: true,
      chunks: ["script/step1"],
      template: path.join(__dirname, `src/views/step1.html`),
      filename: `step1.html`,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
    }),
    new htmlWebpackPlugin({
      inject: true,
      chunks: ["script/step2"],
      template: path.join(__dirname, `src/views/step2.html`),
      filename: `step2.html`,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
    }),
    new htmlWebpackPlugin({
      inject: true,
      chunks: ["script/step3"],
      template: path.join(__dirname, `src/views/step3.html`),
      filename: `step3.html`,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
    }),
    new htmlWebpackPlugin({
      inject: true,
      chunks: ["script/complete"],
      template: path.join(__dirname, `src/views/complete.html`),
      filename: `complete.html`,
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
      "Fonts": path.resolve(__dirname, `./src/assets/fonts`),
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