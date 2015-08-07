var webpack = require('webpack');

var definePlugin = new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    AUCTION_API_URL: JSON.stringify(process.env.NODE_ENV || 'http://localhost:3000')
  }
});

module.exports = {
  output: {
    filename: 'app.js'
  },
  module: {
    loaders: [
      { test: /src\/(.*)\.(js|jsx)$/, loader: 'babel-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' },
      { test: require.resolve('react'), loader: 'expose?React' }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    definePlugin
  ]
};
