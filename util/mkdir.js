'use strict';

/**
 * Create a directory in the target project for each directory in the dirs array.
 * @param dirs Array of directories
 */
var mkdir = module.exports = function mkdir(dirs) {
    var self = this;

    dirs.forEach(function(dir) {
        self.mkdir(dir);
    });
};
