const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const OUTPUT_PATH = path.join(__dirname, '..', 'dist')
const PUBLIC_PATH = '/'
const extractSass = new ExtractTextPlugin({
  filename: '[name].css',
})

module.exports = {
  devtool: 'eval',
  entry: [
    'babel-polyfill',
    './src/index',
  ],
  output: {
    path: OUTPUT_PATH,
    filename: 'bundle.js',
    publicPath: PUBLIC_PATH,
  },
  devServer: {
    historyApiFallback: true,
    host: '0.0.0.0',
    disableHostCheck: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        DATA_URL: JSON.stringify(process.env.DATA_URL)
      },
    }),
    new webpack.HotModuleReplacementPlugin(),
    //new CopyWebpackPlugin([
    //  { from: 'src/assets', to: 'assets' },
    //]),
    extractSass,
  ],
  resolve: {
    extensions: ['.js'],
  },
  module: {
    rules: [{
      test: /^(?!.*\.spec\.js$).*\.js$/,
      exclude: /node_modules/,
      use: [
        'babel-loader',
        {
          loader: 'eslint-loader',
          options: {
            quiet: true,
          },
        },
      ],
    },
    {
      test: /\.css$/,
      use: [
        'style-loader',
        { loader: 'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]' },
        'postcss-loader',
        'sass-loader',
      ],
    },
    {
      test: /\.scss$/,
      use: extractSass.extract({
        use: [{
          loader: 'css-loader',
        }, 'postcss-loader', {
          loader: 'sass-loader',
        }],
      }),
    },
    {
      test: /\.(woff2|woff)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loaders: ['url-loader?limit=10000&minetype=application/font-woff&name=/fonts/[name].[ext]'],
      include: /fonts/,
    },
    {
      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loaders: ['url-loader?name=/fonts/[name].[ext]'],
      include: /fonts/,
    },
    {
      test: /\.(jpe?g|png|gif|svg|ico)$/i,
      loaders: [
        'file-loader?hash=sha512&digest=hex&name=[name].[ext]',
        'image-webpack-loader?bypassOnDebug=false&optimizationLevel=7&interlaced=false',
      ],
      include: /images/,
    },
    {
      test: /\.json$/,
      loaders: ['json-loader'],
    }],
  },
}
