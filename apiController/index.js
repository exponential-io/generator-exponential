/**
 * Create Express API controller(s).
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
//    rimraf           = require('rimraf'),
    _eDownloadSource = require('../util/download-source'),
    _eConfig         = require('../util/config'),
    _eCleanup        = require('../util/cleanup-download-dir');


var apiControllerGenerator = module.exports = function apiControllerGenerator() {
    _eGeneratorBase.apply(this, arguments);
    _eLoadMdf.apply(this, [{
        project: false,
        app: false,
        module: true
    }]);
    _eConfig.apply(this);
};

util.inherits(apiControllerGenerator, _eGeneratorBase);

// Pre-cleanup downloadDir
apiControllerGenerator.prototype.preCleanup = _eCleanup;

/** Download the source files */
apiControllerGenerator.prototype.generateSrc = function generateSrc() {
    _eDownloadSource.apply(this, [{
        _eMkDirs: _eMkDirs,
        generator: 'apiController'
    }]);
};

/** Create the directory structure */
apiControllerGenerator.prototype.createDirs = function createDirs() {
    // TODO: CREATE A DIRECTORY STRUCTURE FOR TESTS ONE THE MONGOOSE MODEL
    //var _apiTest = 'test/api/' + this.mdf.module.name.lowerPlural + '-api';
    //this.mkdir('test/api/models/');
};

/** Create the Express controller(s) */
apiControllerGenerator.prototype.createController = function createController() {
    var filename = this.mdf.project.api.controllers.filename,
        extension = '.' + this.mdf.project.api.controllers.extension;

    var genControllersPath = this._eDir.download.src +
                             'server/controllers/' + this.mdf.module.path + '/';

    var genCreateCtrlFile  = genControllersPath + filename.create  + extension,
        genReadOneCtrlFile = genControllersPath + filename.readOne + extension,
        genReadAllCtrlFile = genControllersPath + filename.readAll + extension,
        genUpdateCtrlFile  = genControllersPath + filename.update  + extension,
        genDeleteCtrlFile  = genControllersPath + filename.delete  + extension;
//        genGetItemCtrlFile = genControllersPath + filename.getItem  + extension;

    var projectControllersPath = this._eDir.project.server +
                                 'controllers/' + this.mdf.module.path + '/';

    var projectCreateCtrlFile  = projectControllersPath + filename.create  + extension,
        projectReadOneCtrlFile = projectControllersPath + filename.readOne + extension,
        projectReadAllCtrlFile = projectControllersPath + filename.readAll + extension,
        projectUpdateCtrlFile  = projectControllersPath + filename.update  + extension,
        projectDeleteCtrlFile  = projectControllersPath + filename.delete  + extension;
//        projectGetItemCtrlFile = projectControllersPath + filename.getItem + extension;

    if (this.mdf.module.api.create.use) {
        this.copy(genCreateCtrlFile, projectCreateCtrlFile);
    }

    if (this.mdf.module.api.readAll.use) {
        this.copy(genReadAllCtrlFile, projectReadAllCtrlFile);
    }

    if (this.mdf.module.api.readOne.use) {
        this.copy(genReadOneCtrlFile, projectReadOneCtrlFile);
    }

    if (this.mdf.module.api.update.use) {
        this.copy(genUpdateCtrlFile, projectUpdateCtrlFile);
    }

    if (this.mdf.module.api.delete.use) {
        this.copy(genDeleteCtrlFile, projectDeleteCtrlFile);
    }

//    if (this.mdf.module.api.update.use || this.mdf.module.api.delete.use) {
//        this.copy(genGetItemCtrlFile, projectGetItemCtrlFile);
//    }
};

/** Cleanup downloadDir */
apiControllerGenerator.prototype.cleanupDownloadDir = _eCleanup;
