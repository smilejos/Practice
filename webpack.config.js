var fs = require('fs')
var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: './public/assets/js/client.js',
  output: {
    path: __dirname + '/build',
    filename: 'bundle.js',
    chunkFilename: '[id].chunk.js',
    publicPath: '/build/'
  },
  module: {
     loaders: [
            { 
                test: /\.jsx$/,  loader: 'babel', query: { presets:['react'] }
            },{ 
                test: /\.js$/,  loader: 'babel', query: { presets:['react'] }
            },{ 
                test: /\.json$/, loader: 'json-loader'
            }
        ]
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin()
  ]

}
