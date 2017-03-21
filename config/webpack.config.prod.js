var webpack = require('webpack');

var config = require('./webpack.config.base');
config.externals = {"http": "http"};
config.plugins.push(new webpack.IgnorePlugin(/http/));

module.exports = config;