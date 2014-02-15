'use strict';

var rimraf = require('rimraf');


var cleanupDownloadDir = function cleanupDownloadDir() {
    rimraf.sync(this._eDir.download.root);
};

module.exports = cleanupDownloadDir;
