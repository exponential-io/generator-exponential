/**
 * Create an Exponential API. APIs are created using a single generator as each
 * API is a combination of an application + module. Therefore, the application
 * and module generators are combined into a single generator (this one).
 *
 * @copyright Copyright 2014 Exponential.io. All rights reserved.
 * @author Akbar S. Ahmed <akbar@exponential.io>
 */
'use strict';


var util             = require('util'),
    _                = require('lodash'),
    _eGeneratorBase  = require('../util/generator-base'),
    _eLoadMdf        = require('../util/load-mdf'),
    _eMkDirs         = require('../util/mkdir'),
    rimraf           = require('rimraf'),
    _eDownloadSource = require('../util/download-source'),
    _eConfig         = require('../util/config');


var apiGenerator = module.exports = function apiGenerator() {
    _eGeneratorBase.apply(this, arguments);
    _eLoadMdf.apply(this, [{
        project: false,
        app: false,
        module: true
    }]);
    _eConfig.apply(this);
};

util.inherits(apiGenerator, _eGeneratorBase);

/** Download the source files */
apiGenerator.prototype.generateSrc = function generateSrc() {
    _eDownloadSource.apply(this, [{
        _eMkDirs: _eMkDirs,
        generator: 'api'
    }]);
};

/** Create the API application directory structure */
apiGenerator.prototype.apiDirs = function apiDirs() {
    _eMkDirs.apply(this, [[
        'test/api/' + this.mdf.module.name.lowerPlural + '-api'
    ]]);
};

/** Create the API application files */
apiGenerator.prototype.apiModuleFiles = function apiModuleFiles() {
    var moduleNameLs = this.mdf.module.name.lowerSingular,
        moduleNameLp = this.mdf.module.name.lowerPlural;

    // Controller
    var genController = [
        this._eDir.download.src, 'server/controllers/', moduleNameLp, '-api.js'
    ].join('');

    var projectController = [
        this._eDir.project.server, 'controllers/', moduleNameLp, '-api.js'
    ].join('');

    this.copy(genController, projectController);

//    // Model
//    var genModel = [
//        this._eDir.download.src, 'server/models/', moduleNameLs, '.js'
//    ].join('');
//
//    var projectModel = [
//        this._eDir.project.server, 'models/', moduleNameLs, '.js'
//    ].join('');
//
//    this.copy(genModel, projectModel);

    // Router
    var genRouter = [
        this._eDir.download.src, 'server/routers/', moduleNameLp, '-api.js'
    ].join('');

    var projectRouter = [
        this._eDir.project.server, 'routers/', moduleNameLp, '-api.js'
    ].join('');

    this.copy(genRouter, projectRouter);
};

/** Cleanup downloadDir */
apiGenerator.prototype.cleanupDownloadDir = function cleanupDownloadDir() {
    rimraf(this._eDir.download.root, function(err) {
        if (err) {
            console.log(err);
        }
    });
};
