/**
 * Create an Angular service.
 *
 * @copyright Copyright 2014 Exponential.io. All rights reserved.
 * @author Akbar S. Ahmed <akbar@exponential.io>
 */
'use strict';


var util             = require('util'),
    _                = require('lodash'),
    _eInject         = require('../util/inject'),
    _eGeneratorBase  = require('../util/generator-base'),
    _eLoadMdf        = require('../util/load-mdf'),
    _eMkDirs         = require('../util/mkdir'),
    rimraf           = require('rimraf'),
    _eDownloadSource = require('../util/download-source'),
    _eConfig         = require('../util/config');


var AngularServiceGenerator = module.exports = function AngularServiceGenerator() {
    _eGeneratorBase.apply(this, arguments);
    _eLoadMdf.apply(this, [{
        project: false,
        app: false,
        module: true
    }]);
    _eConfig.apply(this);
};

util.inherits(AngularServiceGenerator, _eGeneratorBase);

/** Download the source files */
AngularServiceGenerator.prototype.generateSrc = function generateSrc() {
    _eDownloadSource.apply(this, [{
        _eMkDirs: _eMkDirs,
        generator: 'angularService'
    }]);
};

/** Create the Angular files - Service */
AngularServiceGenerator.prototype.angularServiceFiles = function angularServiceFiles() {
    var appNameLp    = this.mdf.app.name.lowerPlural,
        moduleNameLp = this.mdf.module.name.lowerPlural;

    // Generator paths
    var genServices = [
        this._eDir.download.src + 'client/',
        appNameLp + '/' + 'js/services/' + moduleNameLp + '/',
        moduleNameLp + '-srv.js'
    ].join('');

    // Project paths
    var moduleServices = [
        this._eDir.project.client,
        appNameLp + '/' + 'js/services/' + moduleNameLp + '/',
        moduleNameLp + '-srv.js'
    ].join('');

    // Services
    this.copy(genServices, moduleServices);

    // Insert references to each router in the index.html file.
    // The 'js/' prefix to each path and the '.js' file extension are
    // automatically added by the inject method.

    var servicesJsDir = 'services/' + moduleNameLp + '/';
    var jsFiles = [
        servicesJsDir + moduleNameLp + '-srv'
    ];

    var indexHtml = this._eDir.project.client + appNameLp + '/index.html';

    jsFiles.forEach(function(jsFile) {
        _eInject({
            targetFile: indexHtml,
            needle: '<!-- endbuild -->',
            splicable: [
                '<script type="text/javascript" src="js/' + jsFile.replace('\\', '/') + '.js"></script>'
            ],
            appendComma: false
        });
    });
};

/** Cleanup downloadDir */
AngularServiceGenerator.prototype.cleanupDownloadDir = function cleanupDownloadDir() {
    rimraf(this._eDir.download.root, function(err) {
        if (err) {
            console.log(err);
        }
    });
};
