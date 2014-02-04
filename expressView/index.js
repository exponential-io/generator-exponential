/**
 * Create a server-side Express view.
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


var expressViewGenerator = module.exports = function expressViewGenerator() {
    _eGeneratorBase.apply(this, arguments);
    _eLoadMdf.apply(this, [{
        project: false,
        app: false,
        module: true
    }]);
    _eConfig.apply(this);
};

util.inherits(expressViewGenerator, _eGeneratorBase);

/** Download the source files */
expressViewGenerator.prototype.generateSrc = function generateSrc() {
    _eDownloadSource.apply(this, [{
        _eMkDirs: _eMkDirs,
        generator: 'expressView'
    }]);
};

/** Create the directory structure */
expressViewGenerator.prototype.createDirs = function createDirs() {
    // TODO: CREATE A DIRECTORY STRUCTURE FOR TESTS ONE THE MONGOOSE MODEL
    //var _apiTest = 'test/api/' + this.mdf.module.name.lowerPlural + '-api';
    //this.mkdir('test/express/models/');
};

/** Create the Express controller(s) */
expressViewGenerator.prototype.createController = function createController() {
    // Shortcuts to the MDF view definitions
    var mdfCreateView  = this.mdf.module.express.create.view,
        mdfReadAllView = this.mdf.module.express.readAll.view,
        mdfReadOneView = this.mdf.module.express.readOne.view,
        mdfUpdateView  = this.mdf.module.express.update.view;

//    var projectViewPrefix  = 'server/views/';

    if (this.mdf.module.express.create.use) {
        var genCreateViewFile = [
            this._eDir.download.src, 'server/views/', mdfCreateView.path,
            '/', mdfCreateView.filename, mdfCreateView.extension
        ].join('');

        var projectCreateViewFile = [
            this._eDir.project.server, 'views/', mdfCreateView.path,
            '/', mdfCreateView.filename, mdfCreateView.extension
        ].join('');

        this.copy(genCreateViewFile, projectCreateViewFile);
    }

    if (this.mdf.module.express.readAll.use) {
        var genReadAllViewFile = [
            this._eDir.download.src, 'server/views/', mdfReadAllView.path,
            '/', mdfReadAllView.filename, mdfReadAllView.extension
        ].join('');

        var projectReadAllViewFile = [
            this._eDir.project.server, 'views/', mdfReadAllView.path,
            '/', mdfReadAllView.filename, mdfReadAllView.extension
        ].join('');

        this.copy(genReadAllViewFile, projectReadAllViewFile);
    }

    if (this.mdf.module.express.readOne.use) {
        var genReadOneFile = [
            this._eDir.download.src, 'server/views/', mdfReadOneView.path,
            '/', mdfReadOneView.filename, mdfReadOneView.extension
        ].join('');

        var projectReadOneViewFile = [
            this._eDir.project.server, 'views/', mdfReadOneView.path,
            '/', mdfReadOneView.filename, mdfReadOneView.extension
        ].join('');

        this.copy(genReadAllOneFile, projectReadOneViewFile);
    }

    if (this.mdf.module.express.update.use) {
        var genUpdateFile = [
            this._eDir.download.src, 'server/views/', mdfUpdateView.path,
            '/', mdfUpdateView.filename, mdfUpdateView.extension
        ].join('');

        var projectUpdateViewFile = [
            this._eDir.project.server, 'views/', mdfUpdateView.path,
            '/', mdfUpdateView.filename, mdfUpdateView.extension
        ].join('');

        this.copy(genUpdateFile, projectUpdateViewFile);
    }
};

/** Cleanup downloadDir */
expressViewGenerator.prototype.cleanupDownloadDir = function cleanupDownloadDir() {
    rimraf(this._eDir.download.root, function(err) {
        if (err) {
            console.log(err);
        }
    });
};
