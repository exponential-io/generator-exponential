/**
 * Initialize an Exponential.io project directory and setup the example MDF
 * files.
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


var initProjectGenerator = module.exports = function initProjectGenerator() {
    _eGeneratorBase.apply(this, arguments);
};

util.inherits(initProjectGenerator, _eGeneratorBase);

initProjectGenerator.prototype.notify = function notify() {
    console.log();
    console.log(chalk.blue('Exponential:'), 'Project name requirements');
    //console.log('--------------------------------------------------------------------------------');
    console.log('Your project name must be either a single word or must be written in camelcase.');
    console.log('For example, a name of `crm` or `projectManagement` are both acceptable.');
    console.log();
};

initProjectGenerator.prototype.getConfigInfo = function getConfigInfo() {
    var cb = this.async();

    var prompts = [
        {
            name: 'projectName',
            message: 'What is the name of your project?'
        },
        {
            name: 'author',
            message: 'What is your name?'
        }
    ];

    this.prompt(prompts, function (props) {
        this.projectName = props.projectName;

        cb();
    }.bind(this));
};

/** Create the directory structure */
initProjectGenerator.prototype.createConfig = function createConfig() {
//    var home = process.env.HOME || process.env.HOMEPATH || process.env.USERPROFILE,
//        exponentialDir = home + '/.exponential/',
//        configFile = exponentialDir + 'config.json';
//
//    this.mkdir(exponentialDir);
//    this.template('config.json', configFile);
    var mdfDir = this.projectName + '/exponential';

    this.mkdir(this.projectName);
    //this.mkdir(mdfDir);
    this.directory('exponential', mdfDir, this);

};
