const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.(scss|sass|css)$/,
        use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            { loader: 'resolve-url-loader' },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
                includePaths: [path.resolve(__dirname, 'src')]
              }
            }
          ],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.(woff|woff2|ttf|otf|svg|jpe?g|gif|ico)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'static/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'style.css',
      disable: process.env.NODE_ENV !== 'production'
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'dist')
  }
}
