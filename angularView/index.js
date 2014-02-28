// Create one or more Angular views
// ================================
// @copyright Copyright 2014 Exponential.io. All rights reserved.
// @author Akbar S. Ahmed <akbar@exponential.io>
'use strict';

var _                = require('lodash'),
    util             = require('util'),
    _eCleanup        = require('../util/cleanup-download-dir'),
    _eConfig         = require('../util/config'),
    _eDownloadSource = require('../util/download-source'),
    _eGeneratorBase  = require('../util/generator-base'),
    _eLoadMdf        = require('../util/load-mdf'),
    _eMkDirs         = require('../util/mkdir');


var AngularViewGenerator = module.exports = function AngularViewGenerator() {
    _eGeneratorBase.apply(this, arguments);
    _eLoadMdf.apply(this, [{
        project: false,
        app: false,
        module: true
    }]);
    _eConfig.apply(this);
};

util.inherits(AngularViewGenerator, _eGeneratorBase);

// Pre-cleanup downloadDir
AngularViewGenerator.prototype.preCleanup = _eCleanup;

// Download the source files
AngularViewGenerator.prototype.generateSrc = function generateSrc() {
    _eDownloadSource.apply(this, [{
        _eMkDirs: _eMkDirs,
        generator: 'angularView'
    }]);
};

// Create the Angular views directory structure
AngularViewGenerator.prototype.angularDirs = function angularDirs() {
    this.angularDir = this.mdf.app.angular.directory;
    this.modulePath = this.mdf.module.path;

    // Project views directory
    var projectViewsPath = this._eDir.project.client +
                           this.angularDir + '/views/' + this.modulePath + '/';

    // TODO: This is not yet usable. I need to upgrade the entire automation of
    // TODO: test automation so that its production ready.
    var testRoot = 'test/angular/' + this.angularDir + '/views/' + this.modulePath + '/';

    _eMkDirs.apply(this, [[
        projectViewsPath,
        testRoot
    ]]);
};

// Create the Angular views
AngularViewGenerator.prototype.angularFiles = function angularFiles() {
    var filename = this.mdf.project.angular.views.filename,
        ext = '.' + this.mdf.project.angular.views.extension;

    var genViewsPath = this._eDir.download.src +
        'client/' + this.angularDir + '/views/' + this.modulePath + '/';

    var genCreateViewFile  = genViewsPath + filename.create  + ext,
        genReadOneViewFile = genViewsPath + filename.readOne + ext,
        genReadAllViewFile = genViewsPath + filename.readAll + ext,
        genUpdateViewFile  = genViewsPath + filename.update  + ext;

    var projectViewsPath = this._eDir.project.client +
                           this.angularDir + '/views/' + this.modulePath + '/';

    var projectCreateViewFile  = projectViewsPath + filename.create  + ext,
        projectReadOneViewFile = projectViewsPath + filename.readOne + ext,
        projectReadAllViewFile = projectViewsPath + filename.readAll + ext,
        projectUpdateViewFile  = projectViewsPath + filename.update  + ext;

    if (this.mdf.module.angular.create.use) {
        this.copy(genCreateViewFile, projectCreateViewFile);
    }

    if (this.mdf.module.angular.readAll.use) {
        this.copy(genReadAllViewFile, projectReadAllViewFile);
    }

    if (this.mdf.module.angular.readOne.use) {
        this.copy(genReadOneViewFile, projectReadOneViewFile);
    }

    if (this.mdf.module.angular.update.use) {
        this.copy(genUpdateViewFile, projectUpdateViewFile);
    }
};

// Cleanup downloadDir
AngularViewGenerator.prototype.cleanupDownloadDir = _eCleanup;
