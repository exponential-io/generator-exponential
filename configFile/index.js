/**
 * Create or update an Exponential.io config file.
 *
 * @copyright Copyright 2014 Exponential.io. All rights reserved.
 * @author Akbar S. Ahmed <akbar@exponential.io>
 */
'use strict';

var chalk            = require('chalk'),
    util             = require('util'),
    _                = require('lodash'),
    _eGeneratorBase  = require('../util/generator-base'),
    _eMkDirs         = require('../util/mkdir');


var configFileGenerator = module.exports = function configFileGenerator() {
    _eGeneratorBase.apply(this, arguments);
};

util.inherits(configFileGenerator, _eGeneratorBase);

configFileGenerator.prototype.notify = function notify() {
    console.log();
    console.log(
        chalk.blue('Exponential:'),
        'You require an account on www.Exponential.io.',
        'Please create one if you have not done so already.',
        '\n'
    );
};

configFileGenerator.prototype.getConfigInfo = function getConfigInfo() {
    var cb = this.async();

    var prompts = [
        {
            name: 'email',
            message: 'What is your email (login) for Exponential.io?'
        },
        {
            name: 'password',
            message: 'What is your password for Exponential.io?'
        }];

    this.prompt(prompts, function (props) {
        this.email = props.email;
        this.password = props.password;

        cb();
    }.bind(this));
};

/** Create the directory structure */
configFileGenerator.prototype.createConfig = function createConfig() {
    var home = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE,
        exponentialDir = home + '/.exponential/',
        configFile = exponentialDir + 'config.json';

    this.mkdir(exponentialDir);
    this.template('config.json', configFile);
};
