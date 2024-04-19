
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devServer: {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
        }
    },
    experiments: {
        buildHttp: {
            allowedUris: [
                'http://localhost:8080',
                'http://localhost:8080/.*',
            ],
        },
    },
    entry: './src/index',
    cache: false,
  
    mode: 'development',
    devtool: 'source-map',
  
    optimization: {
      minimize: false,
    },
  
    output: {
      publicPath: 'auto',
    },
  
    resolve: {
      extensions: ['.jsx', '.js', '.json', '.mjs'],
    },
  
    module: {
      rules: [
        {
          test: /\.m?js$/,
          type: 'javascript/auto',
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.jsx?$/,
          loader: require.resolve('babel-loader'),
          exclude: /node_modules/,
          options: {
            presets: [require.resolve('@babel/preset-react')],
          },
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
      ],
    },
  
    plugins: [
      new HtmlWebpackPlugin({
        template: './public/index.html',
      }),
    ],
}