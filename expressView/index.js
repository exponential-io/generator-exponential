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
    _eDownloadSource = require('../util/download-source'),
    _eConfig         = require('../util/config'),
    _eCleanup        = require('../util/cleanup-download-dir');


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

// Pre-cleanup downloadDir
expressViewGenerator.prototype.preCleanup = _eCleanup;

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

/** Create the Express view(s) */
expressViewGenerator.prototype.createView = function createView() {
    var filename = this.mdf.project.express.views.filename,
        extension = '.' + this.mdf.project.express.views.extension;

    var genViewsPath = this._eDir.download.src +
        'server/views/' + this.mdf.module.path + '/';

    var genCreateViewFile  = genViewsPath + filename.create  + extension,
        genReadOneViewFile = genViewsPath + filename.readOne + extension,
        genReadAllViewFile = genViewsPath + filename.readAll + extension,
        genUpdateViewFile  = genViewsPath + filename.update  + extension;

    var projectViewsPath = this._eDir.project.server +
        'views/' + this.mdf.module.path + '/';

    var projectCreateViewFile  = projectViewsPath + filename.create  + extension,
        projectReadOneViewFile = projectViewsPath + filename.readOne + extension,
        projectReadAllViewFile = projectViewsPath + filename.readAll + extension,
        projectUpdateViewFile  = projectViewsPath + filename.update  + extension;

    if (this.mdf.module.express.create.use) {
        this.copy(genCreateViewFile, projectCreateViewFile);
    }

    if (this.mdf.module.express.readAll.use) {
        this.copy(genReadAllViewFile, projectReadAllViewFile);
    }

    if (this.mdf.module.express.readOne.use) {
        this.copy(genReadOneViewFile, projectReadOneViewFile);
    }

    if (this.mdf.module.express.update.use) {
        this.copy(genUpdateViewFile, projectUpdateViewFile);
    }
};

/** Cleanup downloadDir */
expressViewGenerator.prototype.cleanupDownloadDir = _eCleanup;
