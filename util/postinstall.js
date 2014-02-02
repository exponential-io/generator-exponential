'use strict';

var fs = require('fs');


module.exports = function() {
    // Create the ~/.exponential directory
    fs.mkdir(process.env.HOME + '/.exponential', '0700', mkdirCallback);

    function mkdirCallback(err) {
        if (err) {
            // Ignore the error if ~/.exponential already exists
            if (err.code !== 'EEXIST') {
                console.log(err);
            }
        }
    }
};
