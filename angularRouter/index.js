/**
 * Create an Angular router.
 *
 * @copyright Copyright 2014 Exponential.io. All rights reserved.
 * @author Akbar S. Ahmed <akbar@exponential.io>
 */
'use strict';


var util            = require('util'),
    _               = require('lodash'),
    _eInject        = require('../util/inject'),
    _eGeneratorBase = require('../util/generator-base'),
    _eLoadMdf       = require('../util/load-mdf'),
    _eMkDirs        = require('../util/mkdir'),
    rimraf           = require('rimraf'),
    _eDownloadSource = require('../util/download-source'),
    _eConfig         = require('../util/config');


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

/** Download the source files */
AngularRouterGenerator.prototype.generateSrc = function generateSrc() {
    _eDownloadSource.apply(this, [{
        _eMkDirs: _eMkDirs,
        generator: 'angularRouter'
    }]);
};

/** Create the Angular files - Routes */
AngularRouterGenerator.prototype.angularServiceFiles = function angularRouterFiles() {
    var appNameLp    = this.mdf.app.name.lowerPlural,
        moduleNameLp = this.mdf.module.name.lowerPlural;

    // Generator paths
    var genRouters = this._eDir.download.src + 'client/' + appNameLp + '/js/routers/',
        genRouter  = genRouters + moduleNameLp + '.js';

    // Project paths
    var projectRouters = this._eDir.project.client + appNameLp + '/js/routers/',
        moduleRouter   = projectRouters + moduleNameLp + '.js';

    // Routers
    this.copy(genRouter, moduleRouter);

    // Insert references to each router in the index.html file.
    // The 'js/' prefix to each path and the '.js' file extension are
    // automatically added by the inject method.

    var routersJsDir = 'routers/';
    var jsFiles = [
        routersJsDir + moduleNameLp
    ];

    var indexHtml = this._eDir.project.client + appNameLp + '/index.html';

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

    // Insert the module name into the app.js file so that the module's routes
    // are loaded.
    var appJs = this._eDir.project.client + appNameLp + '/js/app.js';

    _eInject({
        targetFile: appJs,
        needle: '])',
        splicable: [
            '    \'' + this.mdf.module.angular.module + '\''
        ],
        appendComma: true
    });

    var navbarHtml = this._eDir.project.client + appNameLp + '/views/common/navbar.html';

    // Insert the module into the navbar
    if (this.mdf.module.navbar.display) {
        _eInject({
            targetFile: navbarHtml,
            needle: '<!-- exp-nav-modules -->',
            splicable: [
                '<li><a href="' + this.mdf.module.urlBase + '">' + this.mdf.module.navbar.label + '</a></li>'
            ],
            appendComma: false
        });
    }
};

/** Cleanup downloadDir */
AngularRouterGenerator.prototype.cleanupDownloadDir = function cleanupDownloadDir() {
    rimraf(this._eDir.download.root, function(err) {
        if (err) {
            console.log(err);
        }
    });
};
