/**
 * Inject an Angular module's URL into the navbar.
 *
 * @copyright Copyright 2014 Exponential.io. All rights reserved.
 * @author Akbar S. Ahmed <akbar@exponential.io>
 */
'use strict';


var _                = require('lodash'),
    chalk            = require('chalk'),
    util             = require('util'),
    _eCleanup        = require('../util/cleanup-download-dir'),
    _eConfig         = require('../util/config'),
    _eDownloadSource = require('../util/download-source'),
    _eGeneratorBase  = require('../util/generator-base'),
    _eInject         = require('../util/inject'),
    _eLoadMdf        = require('../util/load-mdf'),
    _eMkDirs         = require('../util/mkdir');


var AngularNavbarGenerator = module.exports = function AngularNavbarGenerator() {
    _eGeneratorBase.apply(this, arguments);
    _eLoadMdf.apply(this, [{
        project: false,
        app: false,
        module: true
    }]);
    _eConfig.apply(this);
};

util.inherits(AngularNavbarGenerator, _eGeneratorBase);

// Pre-cleanup downloadDir
AngularNavbarGenerator.prototype.preCleanup = _eCleanup;

/** Download the source files */
AngularNavbarGenerator.prototype.generateSrc = function generateSrc() {
    _eDownloadSource.apply(this, [{
        _eMkDirs: _eMkDirs,
        generator: 'angularNavbarN'
    }]);
};

/** Create the Angular files - Routes */
AngularNavbarGenerator.prototype.angularServiceFiles = function angularRouterFiles() {
    var angularDir   = this.mdf.app.angular.directory,
        moduleNameLp = this.mdf.module.name.lowerPlural;

    // Inject module's URL into Navbar
    // -------------------------------

    var navbar = this._eDir.project.client + angularDir + '/views/common/navbar.html',
        needle = '<!-- exp-nav-modules -->',
        url = this.mdf.module.angular.readAll.url,
        title = this.mdf.module.angular.readAll.title,
        link = ['<li><a href="' + url + '">' + title + '</a></li>'];

    // Insert the module into the navbar
    if (this.mdf.module.navbar.display) {
        _eInject({
            targetFile: navbar,
            needle: needle,
            splicable: link,
            appendComma: false
        });

        console.log(
            chalk.green('Exponential:'),
            'Injected URL to',
            chalk.blue(title),
            'into',
            navbar
        );
    }
};

/** Cleanup downloadDir */
AngularNavbarGenerator.prototype.cleanupDownloadDir = _eCleanup;
