'use strict';

var async = require('async'),
    path  = require('path'),
    fs    = require('fs');

/**
 * Read the ~/.exponential/config.json configuration file.
 *
 * If the config.json file is not found, or if the email/password is not setup,
 * then:
 * 1. create the ~/.exponential directory
 * 2. prompt the user for their email and password
 * 3. save the user's login information to ~/.exponential/config.json
 *
 * Create the .exponential directory
 * @type {Config}
 */
var Config = module.exports = function Config() {
    var self = this;

    var configDir  = process.env.HOME + '/.exponential/',
        configFile = configDir + 'config.json',
        config     = {};

    var cb = this.async();

    // Read the ~/.exponential/config.json configuration file
    fs.readFile(configFile, 'utf8', readConfig);

    function readConfig(err, contents) {
        if (err) {
            throw err;
        }

        config = JSON.parse(contents);
        self._eEmail = config.email;
        self._ePassword = config.password;

        cb();
    }

//    function createConfig() {
//        async.series([
//            function(callback) {
//                // Read the ~/.exponential/config.json configuration file
//                fs.readFile(configFile, 'utf8', readConfig);
//
//                function readConfig(err, contents) {
//                    if (err) {
//                        //throw err;
//                        console.log(err);
//                        // Create the ~/.exponential/config.json directory and file if they
//                        // do not exist
//                        createConfig();
//                    }
//
//                    config = JSON.parse(contents);
//                    self._eEmail = config.email;
//                    self._ePassword = config.password;
//
//                    callback(null);
//                }
//            },
//            function(callback) {
//                // Create the ~/.exponential directory
//                fs.mkdir(configDir, '0700', function(err) {
//                    if (err) {
//                        // Ignore the error if ~/.exponential already exists
//                        if (err.code !== 'EEXIST') {
//                            throw err;
//                        }
//                    }
//                });
//
//                callback(null);
//            }
//        ]);
//    }
//
//    function makeConfigDir() {
//
//    }
//
//    function mkdirCb(err) {
//        if (err) {
//            // Ignore the error if ~/.exponential already exists
//            if (err.code === 'EEXIST') {
//                promptUser();
//            } else {
//                throw err;
//            }
//        } else {
//            promptUser();
//        }
//    }
};
