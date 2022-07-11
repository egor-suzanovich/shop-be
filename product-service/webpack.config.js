const slsw = require('serverless-webpack');
const path = require('path');

module.exports =  {
    entry: slsw.lib.entries,
    mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
    target: 'node',
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    },
    output: {
        libraryTarget: 'commonjs',
        path: path.join(__dirname, '.webpack'),
        filename: '[name].js',
    },
    module: {
      rules: [
        {
            test: /\.(tsx?)$/,
            loader: 'ts-loader',
            exclude: [
              [
                path.resolve(__dirname, 'node_modules'),
                path.resolve(__dirname, '.serverless'),
                path.resolve(__dirname, '.webpack'),
              ],
            ],
          },
      ]
    }
  };
