const path = require('path');
// 清理dist旧文件
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 自动引入 budle.js 并生成新的 index.html
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 分离 样式为 单独的文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// 引入 webpack 
const webpack = require('webpack');

function resolve (dir) {
  return path.resolve(__dirname, dir)
}

module.exports = {
  mode: 'development',
  // 配置打包入口
  entry:[
    './example/index.js'
  ],
  // 配置打包出口
  output: {
    // __dirname:当前文件所在目录的绝对路径
    path: path.resolve(__dirname, 'dist'),
    // chunkhash:只要文件内容不变，其每次打包的hash值不变
    // name: 是文件名称
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].js',
    // publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // use 的执行顺序从后往前执行
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
            },
          },
          'css-loader'
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':img-src',':data-src']
          }
        }
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 80,
              name: path.posix.join('./','[path][name].[hash].[ext]')
            }
          }
        ]
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: path.posix.join('./','[path][name].[hash].[ext]')
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: path.posix.join('./','[path][name].[hash].[ext]')
            }
          }
        ]
      }
      
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    // compress: true,
    port: 9000,
    host: '0.0.0.0',
  },
  // 抽离公共代码
  optimization: {
    splitChunks: {
      // include all types of chunks
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test:/\.jsx?$/,
          filename: 'vendor/[name].[chunkhash].js'
        }
      }
    }
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css'
    }),
    new CleanWebpackPlugin({
      root:  path.resolve(__dirname, 'dist'),
      exclude:  [],
      verbose:  true,
      dry: false
    }),
    new HtmlWebpackPlugin({
      filename:'index.html',
      template: './example/index.html'
    }),
    // 配置全局变量
    new webpack.DefinePlugin({
      'version': JSON.stringify('1.0.1'),
    }),
    // 自动加载 jquery
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  devtool: 'source-map'
};