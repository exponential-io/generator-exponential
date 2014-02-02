'use strict';

/**
 * Create a directory in the target project for each directory in the dirs array.
 * @param dirs Array of directories
 */
var mkdir = module.exports = function mkdir(dirs) {
    var self = this;

    // Prefix each directory with a full path if we're running in server mode.
    // Relative paths do not work in server mode, therefore we must prefix each
    // directory with a full path to the project directory where the current
    // user's project directory structure will be created.
    var dirPrefix = self.options.server ? self._eDir.project.root : '';

    dirs.forEach(function(dir) {
        self.mkdir(dirPrefix + dir);
    });
};
