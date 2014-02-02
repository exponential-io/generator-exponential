'use strict';

var util        = require('util'),
    yeoman      = require('yeoman-generator'),
    _eArguments = require('../util/arguments'),
    _eOptions   = require('../util/options');

/**
 * Setup the generator's basic functionality.
 * @type {Function}
 */
var Generator = module.exports = function Generator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    // Register all CLI arguments and options
    _eArguments(this);
    _eOptions(this);

    this._eDir = require('../util/directories')();
};

util.inherits(Generator, yeoman.generators.Base);
