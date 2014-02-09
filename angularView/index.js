// # Create an Angular view.

// @copyright Copyright 2014 Exponential.io. All rights reserved.
// @author Akbar S. Ahmed <akbar@exponential.io>
'use strict';


var util             = require('util'),
    _                = require('lodash'),
    _eGeneratorBase  = require('../util/generator-base'),
    _eLoadMdf        = require('../util/load-mdf'),
    _eMkDirs         = require('../util/mkdir'),
    rimraf           = require('rimraf'),
    _eDownloadSource = require('../util/download-source'),
    _eConfig         = require('../util/config');


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

// Download the source files
AngularViewGenerator.prototype.generateSrc = function generateSrc() {
    _eDownloadSource.apply(this, [{
        _eMkDirs: _eMkDirs,
        generator: 'angularView'
    }]);
};

// Create the Angular views directory structure
AngularViewGenerator.prototype.angularDirs = function angularDirs() {
    var appNameLp    = this.mdf.app.name.lowerPlural,
        moduleNameLp = this.mdf.module.name.lowerPlural;

    // Relative project paths
    var projectModuleViews = [
        this._eDir.project.client,
        appNameLp + '/' + 'js/views/' + moduleNameLp + '/'
    ].join('');

    // TODO: This is not yet usable. I need to upgrade the entire automation of
    // TODO: test automation so that its production ready.
    var testRoot = 'test/angular/' + appNameLp + '/views/' + moduleNameLp + '/';

    _eMkDirs.apply(this, [[
        projectModuleViews,
        testRoot
    ]]);
};

// Create the Angular files - Routes
AngularViewGenerator.prototype.angularFiles = function angularFiles() {
    var appNameLp    = this.mdf.app.name.lowerPlural,
        moduleNameLp = this.mdf.module.name.lowerPlural;

    var genViews = [
        this._eDir.download.src,
        'client/' + appNameLp + '/views/' + moduleNameLp + '/'
    ].join('');

    var projectViews = [
        this._eDir.project.client,
        appNameLp + '/views/' + moduleNameLp + '/'
    ].join('');

    // Views
    this.copy(genViews + 'create.html',   projectViews + 'create.html');
    this.copy(genViews + 'read-all.html', projectViews + 'read-all.html');
    this.copy(genViews + 'read-one.html', projectViews + 'read-one.html');
};

// Cleanup downloadDir
AngularViewGenerator.prototype.cleanupDownloadDir = function cleanupDownloadDir() {
    rimraf(this._eDir.download.root, function(err) {
        if (err) {
            console.log(err);
        }
    });
};
