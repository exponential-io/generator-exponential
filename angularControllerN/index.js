/**
 * Create a server-side Express controller.
 *
 * @copyright Copyright 2014 Exponential.io. All rights reserved.
 * @author Akbar S. Ahmed <akbar@exponential.io>
 */
'use strict';

var util             = require('util'),
    _                = require('lodash'),
    _eCleanup        = require('../util/cleanup-download-dir'),
    _eConfig         = require('../util/config'),
    _eDownloadSource = require('../util/download-source'),
    _eGeneratorBase  = require('../util/generator-base'),
    _eInject         = require('../util/inject'),
    _eLoadMdf        = require('../util/load-mdf'),
    _eMkDirs         = require('../util/mkdir');


var angularControllerNGenerator = module.exports = function angularControllerNGenerator() {
    _eGeneratorBase.apply(this, arguments);
    _eLoadMdf.apply(this, [{
        project: false,
        app: false,
        module: true
    }]);
    _eConfig.apply(this);
};

util.inherits(angularControllerNGenerator, _eGeneratorBase);

// Pre-cleanup downloadDir
angularControllerNGenerator.prototype.preCleanup = _eCleanup;

/** Download the source files */
angularControllerNGenerator.prototype.generateSrc = function generateSrc() {
    _eDownloadSource.apply(this, [{
        _eMkDirs: _eMkDirs,
        generator: 'angularControllerN'
    }]);
};

/** Create the directory structure */
angularControllerNGenerator.prototype.createDirs = function createDirs() {
    // TODO: CREATE A DIRECTORY STRUCTURE FOR TESTS ONE THE MONGOOSE MODEL
    //var _apiTest = 'test/api/' + this.mdf.module.name.lowerPlural + '-api';
    //this.mkdir('test/angular/models/');
};

/** Create the Express controller(s) */
angularControllerNGenerator.prototype.createController = function createController() {
    var filename = this.mdf.project.angular.controllers.filename,
        extension = '.' + this.mdf.project.angular.controllers.extension;

    var genControllersPath = this._eDir.download.src +
                             'client/' + this.mdf.app.angular.directory +
                             '/js/controllers/' + this.mdf.module.path + '/';

    var genCreateCtrlFile  = genControllersPath + filename.create  + extension,
        genReadOneCtrlFile = genControllersPath + filename.readOne + extension,
        genReadAllCtrlFile = genControllersPath + filename.readAll + extension,
        genUpdateCtrlFile  = genControllersPath + filename.update  + extension,
        genDeleteCtrlFile  = genControllersPath + filename.delete  + extension;
//        genGetItemCtrlFile = genControllersPath + filename.getItem  + extension;

    var projectControllersPath = this._eDir.project.client +
                                 this.mdf.app.angular.directory +
                                 '/js/controllers/' + this.mdf.module.path + '/';

    var projectCreateCtrlFile  = projectControllersPath + filename.create  + extension,
        projectReadOneCtrlFile = projectControllersPath + filename.readOne + extension,
        projectReadAllCtrlFile = projectControllersPath + filename.readAll + extension,
        projectUpdateCtrlFile  = projectControllersPath + filename.update  + extension,
        projectDeleteCtrlFile  = projectControllersPath + filename.delete  + extension;
//        projectGetItemCtrlFile = projectControllersPath + filename.getItem + extension;

    // Path to .js files on disk that will be injected into the index.html file.
    // All paths are relative to the base href. Controllers is an array of
    // controllers that will be injected into the index.html file.
    var controllerJsDir = 'controllers/' + this.mdf.module.path + '/',
        controllers = [];

    if (this.mdf.module.angular.create.use) {
        // Inject a reference to the controller in the index.html file.
        controllers.push(controllerJsDir + 'create-ctrl');
        this.copy(genCreateCtrlFile, projectCreateCtrlFile);
    }

    if (this.mdf.module.angular.readAll.use) {
        controllers.push(controllerJsDir + 'read-all-ctrl');
        this.copy(genReadAllCtrlFile, projectReadAllCtrlFile);
    }

    if (this.mdf.module.angular.readOne.use) {
        controllers.push(controllerJsDir + 'read-one-ctrl');
        this.copy(genReadOneCtrlFile, projectReadOneCtrlFile);
    }

    if (this.mdf.module.angular.update.use) {
        controllers.push(controllerJsDir + 'update-ctrl');
        this.copy(genUpdateCtrlFile, projectUpdateCtrlFile);
    }

    // Delete is not a separate controller in Angular b/c a simple click event
    // is handled by the Read One Controller which then send the delete request
    // to the API. There is no separate URL / post like with Express.
//    if (this.mdf.module.angular.delete.use) {
//        this.copy(genDeleteCtrlFile, projectDeleteCtrlFile);
//    }

//    if (this.mdf.module.angular.update.use || this.mdf.module.angular.delete.use) {
//        this.copy(genGetItemCtrlFile, projectGetItemCtrlFile);
//    }
};

    // urlBase
    var indexHtml = this._eDir.project.client +
                    this.mdf.app.angular.directory + '/index.html';
    controllers.forEach(function(controllerJs) {
        _eInject({
            targetFile: indexHtml,
            needle: '<!-- endbuild -->',
            splicable: [
                '<script type="text/javascript" src="js/' + controllerJs.replace('\\', '/') + '.js"></script>'
            ],
            appendComma: false
        });
    });

/** Cleanup downloadDir */
angularControllerNGenerator.prototype.cleanupDownloadDir = _eCleanup;
