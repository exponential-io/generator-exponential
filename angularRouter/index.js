/**
 * Create an Angular router.
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


var AngularRouterGenerator = module.exports = function AngularRouterGenerator() {
    _eGeneratorBase.apply(this, arguments);
    _eLoadMdf.apply(this, [{
        project: false,
        app: false,
        module: true
    }]);
    _eConfig.apply(this);
};

util.inherits(AngularRouterGenerator, _eGeneratorBase);

// Pre-cleanup downloadDir
AngularRouterGenerator.prototype.preCleanup = _eCleanup;

/** Download the source files */
AngularRouterGenerator.prototype.generateSrc = function generateSrc() {
    _eDownloadSource.apply(this, [{
        _eMkDirs: _eMkDirs,
        generator: 'angularRouter'
    }]);
};

/** Create the Angular files - Routes */
AngularRouterGenerator.prototype.angularRouterFiles = function angularRouterFiles() {
    var appNameLp    = this.mdf.app.name.lowerPlural,
        moduleNameLp = this.mdf.module.name.lowerPlural,
        angularDir   = this.mdf.app.angular.directory,
        ext          = '.' + this.mdf.project.angular.router.extension,
        downloadSrc  = this._eDir.download.src;

    // Generator paths
    var genRouterPath = downloadSrc + 'client/' + angularDir + '/js/routers/',
        genRouterFile = genRouterPath + moduleNameLp + ext;


    // Project paths
    var projectRouterPath = this._eDir.project.client + angularDir + '/js/routers/',
        projectRouterFile = projectRouterPath + moduleNameLp + ext;


    // Router
    this.copy(genRouterFile, projectRouterFile);


    // Inject router's .js file into index.html
    // ----------------------------------------

    // Insert references to each router in the index.html file.
    // The 'js/' prefix to each path and the '.js' file extension are
    // automatically added by the inject method.

    var routersJsDir = 'routers/';
    var jsFiles = [
        routersJsDir + moduleNameLp
    ];

    var indexHtml = this._eDir.project.client + angularDir + '/index.html';

    jsFiles.forEach(function(jsFile) {
        _eInject({
            targetFile: indexHtml,
            needle: '<!-- endrouters -->',
            splicable: [
                '<script type="text/javascript" src="js/' + jsFile.replace('\\', '/') + '.js"></script>'
            ],
            appendComma: false
        });
    });

    // Inject module's name into app.js
    // --------------------------------

    // Insert the module name into the app.js file so that the module's routes
    // are loaded.
    var appJs = this._eDir.project.client + angularDir + '/js/app.js';

    _eInject({
        targetFile: appJs,
        needle: '])',
        splicable: [
            '    \'' + this.mdf.module.angular.module + '\''
        ],
        appendComma: true
    });
};

/** Cleanup downloadDir */
AngularRouterGenerator.prototype.cleanupDownloadDir = _eCleanup;
