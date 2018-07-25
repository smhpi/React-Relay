const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CleanWebPackPlugin = require('clean-webpack-plugin');

const outputDirectory = 'dist';
module.exports = {
  entry: './src/client/index.js',
  output: {
    path: path.join(__dirname, outputDirectory),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      }
    ]
  },
  devServer: {
    port: 3000,
    open: true,
    proxy: { '/api': 'http://localhost:8080' }
  },
  plugins: [
    new CleanWebPackPlugin([outputDirectory]),
    new HtmlWebPackPlugin({
      template: './src/client/index.html',
      filename: './public/index.html',
      favicon: './public/favicon.ico'
    })
  ]
};
