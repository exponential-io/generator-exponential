/**
 * Create a server-side Express controller.
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
    _eConfig         = require('../util/config'),
    _eCleanup        = require('../util/cleanup-download-dir');


var expressControllerGenerator = module.exports = function expressControllerGenerator() {
    _eGeneratorBase.apply(this, arguments);
    _eLoadMdf.apply(this, [{
        project: false,
        app: false,
        module: true
    }]);
    _eConfig.apply(this);
};

util.inherits(expressControllerGenerator, _eGeneratorBase);

// Pre-cleanup downloadDir
expressControllerGenerator.prototype.preCleanup = _eCleanup;

/** Download the source files */
expressControllerGenerator.prototype.generateSrc = function generateSrc() {
    _eDownloadSource.apply(this, [{
        _eMkDirs: _eMkDirs,
        generator: 'expressController'
    }]);
};

/** Create the directory structure */
expressControllerGenerator.prototype.createDirs = function createDirs() {
    // TODO: CREATE A DIRECTORY STRUCTURE FOR TESTS ONE THE MONGOOSE MODEL
    //var _apiTest = 'test/api/' + this.mdf.module.name.lowerPlural + '-api';
    //this.mkdir('test/express/models/');
};

/** Create the Express controller(s) */
expressControllerGenerator.prototype.createController = function createController() {
    // Shortcuts to the MDF controller definitions
//    var mdfCreateCtrl  = this.mdf.module.express.create.controller,
//        mdfReadAllCtrl = this.mdf.module.express.readAll.controller,
//        mdfReadOneCtrl = this.mdf.module.express.readOne.controller,
//        mdfUpdateCtrl  = this.mdf.module.express.update.controller,
//        mdfUpdateCtrl  = this.mdf.module.express.delete.controller;

    var filename = this.mdf.project.express.controllers.filename,
        extension = '.' + this.mdf.project.express.controllers.extension;

    var genControllersPath = this._eDir.download.src +
                             'server/controllers/' + this.mdf.module.path + '/';

    var genCreateCtrlFile  = genControllersPath + filename.create  + extension,
        genReadOneCtrlFile = genControllersPath + filename.readOne + extension,
        genReadAllCtrlFile = genControllersPath + filename.readAll + extension,
        genUpdateCtrlFile  = genControllersPath + filename.update  + extension,
        genDeleteCtrlFile  = genControllersPath + filename.delete  + extension;

    var projectControllersPath = this._eDir.project.server +
                                 'controllers/' + this.mdf.module.path + '/';

    var projectCreateCtrlFile  = projectControllersPath + filename.create  + extension,
        projectReadOneCtrlFile = projectControllersPath + filename.readOne + extension,
        projectReadAllCtrlFile = projectControllersPath + filename.readAll + extension,
        projectUpdateCtrlFile  = projectControllersPath + filename.update  + extension,
        projectDeleteCtrlFile  = projectControllersPath + filename.delete  + extension;

    if (this.mdf.module.express.create.use) {
        this.copy(genCreateCtrlFile, projectCreateCtrlFile);
    }

    if (this.mdf.module.express.readAll.use) {
        this.copy(genReadAllCtrlFile, projectReadAllCtrlFile);
    }

    if (this.mdf.module.express.readOne.use) {
        this.copy(genReadOneCtrlFile, projectReadOneCtrlFile);
    }

    if (this.mdf.module.express.update.use) {
        this.copy(genUpdateCtrlFile, projectUpdateCtrlFile);
    }

    if (this.mdf.module.express.delete.use) {
        this.copy(genDeleteCtrlFile, projectDeleteCtrlFile);
    }
};

/** Cleanup downloadDir */
expressControllerGenerator.prototype.cleanupDownloadDir = function cleanupDownloadDir() {
    rimraf(this._eDir.download.root, function(err) {
        if (err) {
            console.log(err);
        }
    });
};
