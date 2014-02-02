'use strict';

var _ = require('lodash');

/**
 * Load the Module Definition File (MDF) specified on the command line. Pass
 * dependencies via parameters as the mdf files do not have access to
 * generator-level `node_modules`.
 * @type {Function}
 */
var loadMdf = module.exports = function loadMdf(options) {
    options = options || {
        project: false,
        app: false,
        module: false
    };

    this.mdfPath = this.mdf;
    this.mdf = {};

    // Load the project MDF
    if (options.project) {
        this.mdf.project = {};
        this.mdf.project = require(this._eDir.project.exponential + 'project')(_);
    }

    // Load the app MDF
    if (options.app) {
        this.mdf.app = {};
        this.mdf.app = require(this._eDir.project.exponential + this.mdfPath)(_);
    }

    // Load the module MDF
    if (options.module) {
        this.mdf = require(this._eDir.project.exponential + this.mdfPath)(_);
    }
};
