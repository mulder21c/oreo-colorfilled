const path = require(`path`);
const htmlWebpackPlugin = require(`html-webpack-plugin`);
const copyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require(`mini-css-extract-plugin`);
const {CleanWebpackPlugin} = require(`clean-webpack-plugin`);

module.exports = (env, argv) => {
  const staticPath = argv.mode == `production` ? `/oreo-colorfilled/` : `/`;
  return {
    mode: `development`,
    entry: {
      "main": `./src/scripts/main.js`,
      "step1": `./src/scripts/step1.js`,
      "step2": `./src/scripts/step2.js`,
      "step3": `./src/scripts/step3.js`,
      "complete": `./src/scripts/complete.js`,
    },
    output: {
      filename: `script/[name].[hash:8].js`,
      path: path.join(__dirname, `dist`),
      publicPath: staticPath,
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
            publicPath: `${staticPath}images`,
            name: `[hash:16].[ext]`,
            esModule: false,
          },
        },
        {
          test: /\.(ttf|woff|woff2|eot)$/i,
          loader: `file-loader`,
          options: {
            outputPath: 'assets/fonts',
            publicPath: `${staticPath}assets/fonts/`,
            name: `[hash:16].[ext]`,
            esModule: false,
          },
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
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
        chunks: ["runtime", "common", "main", "fontawesome"],
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
        chunks: ["runtime", "common", "step1", "fontawesome"],
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
        chunks: ["runtime", "common", "step2", "fontawesome"],
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
        chunks: ["runtime", "common", "step3", "fontawesome"],
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
        chunks: ["runtime", "common", "complete", "fontawesome"],
        template: path.join(__dirname, `src/views/complete.html`),
        filename: `complete.html`,
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true
        },
      }),
      new MiniCssExtractPlugin({
        filename: `css/[name].[hash:8].css`,
      }),
      new CleanWebpackPlugin(),
    ],
    optimization: {
      splitChunks: {
        name: "common",
        chunks: "initial",
      },
      runtimeChunk: {
        name: "runtime"
      }
    },
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
      publicPath: staticPath,
      port: 8000,
      open: true,
    },
  }
}