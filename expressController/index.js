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
    _eConfig         = require('../util/config');


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
    var mdfCreateCtrl  = this.mdf.module.express.create.controller,
        mdfReadAllCtrl = this.mdf.module.express.readAll.controller,
        mdfReadOneCtrl = this.mdf.module.express.readOne.controller,
        mdfUpdateCtrl  = this.mdf.module.express.update.controller;

    if (this.mdf.module.express.create.use) {
        var genCreateCtrlFile = [
            this._eDir.download.src, 'server/controllers/', mdfCreateCtrl.path,
            '/', mdfCreateCtrl.filename, mdfCreateCtrl.extension
        ].join('');

        var projectCreateCtrlFile = [
            this._eDir.project.server, 'controllers/', mdfCreateCtrl.path,
            '/', mdfCreateCtrl.filename, mdfCreateCtrl.extension
        ].join('');

        this.copy(genCreateCtrlFile, projectCreateCtrlFile);
    }

    if (this.mdf.module.express.readAll.use) {
        var genReadAllCtrlFile = [
            this._eDir.download.src, 'server/controllers/', mdfReadAllCtrl.path,
            '/', mdfReadAllCtrl.filename, mdfReadAllCtrl.extension
        ].join('');

        var projectReadAllCtrlFile = [
            this._eDir.project.server, 'controllers/', mdfReadAllCtrl.path,
            '/', mdfReadAllCtrl.filename, mdfReadAllCtrl.extension
        ].join('');

        this.copy(genReadAllCtrlFile, projectReadAllCtrlFile);
    }

    if (this.mdf.module.express.readOne.use) {
        var genReadOneCtrlFile = [
            this._eDir.download.src, 'server/controllers/', mdfReadOneCtrl.path,
            '/', mdfReadOneCtrl.filename, mdfReadOneCtrl.extension
        ].join('');

        var projectReadOneCtrlFile = [
            this._eDir.project.server, 'controllers/', mdfReadOneCtrl.path,
            '/', mdfReadOneCtrl.filename, mdfReadOneCtrl.extension
        ].join('');

        this.copy(genReadOneCtrlFile, projectReadOneCtrlFile);
    }

    if (this.mdf.module.express.update.use) {
        var genUpdateCtrlFile = [
            this._eDir.download.src, 'server/controllers/', mdfUpdateCtrl.path,
            '/', mdfUpdateCtrl.filename, mdfUpdateCtrl.extension
        ].join('');

        var projectUpdateCtrlFile = [
            this._eDir.project.server, 'controllers/', mdfUpdateCtrl.path,
            '/', mdfUpdateCtrl.filename, mdfUpdateCtrl.extension
        ].join('');

        this.copy(genUpdateCtrlFile, projectUpdateCtrlFile);
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
