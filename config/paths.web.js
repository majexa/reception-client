var path = require('path');
var fs = require('fs');

var appDirectory = fs.realpathSync(process.cwd());
function resolveApp(relativePath) {
  return path.resolve(appDirectory, relativePath);
}

var paths = require('./paths');

paths.appBuild = resolveApp('build');

module.exports = paths;