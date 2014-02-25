/**
 * Create an Angular service.
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


var AngularServiceNGenerator = module.exports = function AngularServiceNGenerator() {
    _eGeneratorBase.apply(this, arguments);
    _eLoadMdf.apply(this, [{
        project: false,
        app: false,
        module: true
    }]);
    _eConfig.apply(this);
};

util.inherits(AngularServiceNGenerator, _eGeneratorBase);

// Pre-cleanup downloadDir
AngularServiceNGenerator.prototype.preCleanup = _eCleanup;

/** Download the source files */
AngularServiceNGenerator.prototype.generateSrc = function generateSrc() {
    _eDownloadSource.apply(this, [{
        _eMkDirs: _eMkDirs,
        generator: 'angularServiceN'
    }]);
};

/** Create the Angular files - Service */
AngularServiceNGenerator.prototype.angularServiceFiles = function angularServiceFiles() {
    var appNameLp    = this.mdf.app.name.lowerPlural,
        moduleNameLp = this.mdf.module.name.lowerPlural;

    // Generator paths
    var genServicesPath = this._eDir.download.src +
                          'client/' + this.mdf.app.angular.directory +
                          '/js/services/' + this.mdf.module.path + '/';
    var genServicesFile = genServicesPath +
        moduleNameLp + this.mdf.project.angular.service.filename +
        '.' + this.mdf.project.angular.service.extension;

    // Project paths
    var projectServicesPath = this._eDir.project.client +
        this.mdf.app.angular.directory +
        '/js/services/' + this.mdf.module.path + '/';

    var projectServicesFile  = projectServicesPath +
        moduleNameLp + this.mdf.project.angular.service.filename +
        '.' + this.mdf.project.angular.service.extension;

    // Services
    this.copy(genServicesFile, projectServicesFile);

    // Insert references to each router in the index.html file.
    // The 'js/' prefix to each path and the '.js' file extension are
    // automatically added by the inject method.

    var servicesJsDir = 'services/' + this.mdf.module.path + '/';
    var jsFiles = [
        servicesJsDir + moduleNameLp + this.mdf.project.angular.service.filename
    ];

    var indexHtml = this._eDir.project.client +
                    this.mdf.app.angular.directory + '/index.html';
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
AngularServiceNGenerator.prototype.cleanupDownloadDir = _eCleanup;
