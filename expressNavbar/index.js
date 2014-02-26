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
    _eDownloadSource = require('../util/download-source'),
    _eConfig         = require('../util/config'),
    _eCleanup        = require('../util/cleanup-download-dir');


/**
 *
 * @param mdfPath
 * @returns {Object} mdfLoadSettings
 */
function mdfType(mdfPath){
    // `mdfLoadSettings` default to
    // `mdfPath` is the path to the MDF file passed via --mdf.
    var mdfLoadSettings = {
            project: false,
            app: false,
            module: true
        },
        mdfPathComponents = mdfPath.split('/'),
        mdfFile = mdfPathComponents[mdfPathComponents.length - 1];

    if (mdfFile === 'app') {
        mdfLoadSettings = {
            project: false,
            app: true,
            module: false
        };
    }

    return mdfLoadSettings;
}

var expressNavbarGenerator = module.exports = function expressNavbarGenerator() {
    _eGeneratorBase.apply(this, arguments);

    // This module can be called with either an app MDF or an Express module
    // MDF.
    this.mdfLoadSettings = mdfType(this.mdf);

    _eLoadMdf.apply(this, [this.mdfLoadSettings]);
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
        url = '',
        title = '';

    if (this.mdfLoadSettings.app === true) {
        // Inject a link to the root of an Angular app
        url = this.mdf.app.url;
        title = this.mdf.app.name.upperSingular;
    } else {
        // Default: Inject a link to an express module
        url = this.mdf.module.express.readAll.url;
        title = this.mdf.module.express.readAll.title;
    }

    var link = ['<li><a href="' + url + '">' + title + '</a></li>'];

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
