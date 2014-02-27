'use strict';

var chalk = require('chalk'),
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
            console.log(
                chalk.blue('Exponential:'),
                'An error occurred when reading the config file.'
            );
            console.log('err: ' + err);
            console.log('');
            console.log('Please run the following command to fix your config file:');
            console.log(chalk.green('exponential --config'));
        }

        // If there are no errors, then we'll simply read the config file and
        // attempt a login.
        config = JSON.parse(contents);
        self._eEmail = config.email;
        self._ePassword = config.password;
        cb();
    }
};
