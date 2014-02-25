/**
 * Inject a module's URL into the server-side Express navbar.
 *
 * @copyright Copyright 2014 Exponential.io. All rights reserved.
 * @author Akbar S. Ahmed <akbar@exponential.io>
 */
'use strict';

var _                = require('lodash'),
    chalk            = require('chalk'),
    util             = require('util'),
    _eInject         = require('../util/inject'),
    _eGeneratorBase  = require('../util/generator-base'),
    _eLoadMdf        = require('../util/load-mdf'),
    _eMkDirs         = require('../util/mkdir'),
    rimraf           = require('rimraf'),
    _eDownloadSource = require('../util/download-source'),
    _eConfig         = require('../util/config'),
    _eCleanup        = require('../util/cleanup-download-dir');


var expressNavbarGenerator = module.exports = function expressNavbarGenerator() {
    _eGeneratorBase.apply(this, arguments);
    _eLoadMdf.apply(this, [{
        project: false,
        app: false,
        module: true
    }]);
    _eConfig.apply(this);
};

util.inherits(expressNavbarGenerator, _eGeneratorBase);

// Pre-cleanup downloadDir
expressNavbarGenerator.prototype.preCleanup = _eCleanup;

/** Download the source files */
expressNavbarGenerator.prototype.generateSrc = function generateSrc() {
    _eDownloadSource.apply(this, [{
        _eMkDirs: _eMkDirs,
        generator: 'expressNavbar'
    }]);
};

/** Navbar */
expressNavbarGenerator.prototype.injectNavbar = function injectNavbar() {
    var navbar = 'server/views/partials/navbar.hbs',
        needle = '<!-- exponential:navbar -->',
        url = this.mdf.module.express.readAll.url,
        title = this.mdf.module.express.readAll.title,
        link = ['<li><a href="' + url + '">' + title + '</a></li>'];

    // Inject the URL into the Express navbar
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
};

/** Cleanup downloadDir */
expressNavbarGenerator.prototype.cleanupDownloadDir = _eCleanup;
