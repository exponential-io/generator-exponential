















// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

// This generator is no longer used as it's fairly pointless. All it did was
// copy website files from a local directory on top of the project files.
// However, it would be much easier for a user to modify the original files in
// the project so that they can watch the updates as they edit files.

// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
// XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

















/**
 * Create the scaffolding for an Express app or website.
 *
 * @copyright Copyright 2014 Exponential.io. All rights reserved.
 * @author Akbar S. Ahmed <akbar@exponential.io>
 */
'use strict';


var util            = require('util'),
    _               = require('lodash'),
    fs              = require('fs'),
    path            = require('path'),
    _eGeneratorBase = require('../util/generator-base'),
    _eLoadMdf       = require('../util/load-mdf'),
    _eMkDirs        = require('../util/mkdir'),
    rimraf           = require('rimraf'),
    _eDownloadSource = require('../util/download-source'),
    _eConfig         = require('../util/config');


var expressAppGenerator = module.exports = function expressAppGenerator() {
    _eGeneratorBase.apply(this, arguments);
    _eLoadMdf.apply(this, [{
        project: true,
        app: true,
        module: false
    }]);
    _eConfig.apply(this);
};

util.inherits(expressAppGenerator, _eGeneratorBase);

/** Download the source files */
expressAppGenerator.prototype.generateSrc = function generateSrc() {
    _eDownloadSource.apply(this, [{
        _eMkDirs: _eMkDirs,
        generator: 'expressApp'
    }]);
};

/** Create project directory structure */
expressAppGenerator.prototype.projectDirs = function projectDirs() {
    _eMkDirs.apply(this, [[
        'client/images/website',
        'server/views/website',
        'server/controllers/website',
        'test/website'
    ]]);
};

/** Setup website */
expressAppGenerator.prototype.setupExpress = function setupExpress() {
    var self = this;

    var genViews    = this._eDir.download.src + 'server/views/',
        genHelpers  = this._eDir.download.src + 'server/views/helpers/',
        genLayouts  = this._eDir.download.src + 'server/views/layouts/',
        genPartials = this._eDir.download.src + 'server/views/partials/';

    var projectViews    = this._eDir.project.server + 'views/',
        projectHelpers  = this._eDir.project.server + 'views/helpers/',
        projectLayouts  = this._eDir.project.server + 'views/layouts/',
        projectPartials = this._eDir.project.server + 'views/partials/';

    // Views
    this.copy(genViews + '404.hbs', projectViews + '404.hbs');
    this.copy(genViews + '500.hbs', projectViews + '500.hbs');

    // Helpers
    fs.readdirSync(genHelpers).forEach(function(helper) {
        var helperPath = genHelpers + helper;
        if (!fs.statSync(helperPath).isDirectory()) {
            self.copy(helperPath, projectHelpers + helper);
        }
    });

    // Layouts
    fs.readdirSync(genLayouts).forEach(function(layout) {
        var layoutPath = genLayouts + layout;
        if (!fs.statSync(layoutPath).isDirectory()) {
            self.copy(layoutPath, projectLayouts + layout);
        }
    });

    // Partials
    fs.readdirSync(genPartials).forEach(function(partial) {
        var partialPath = genPartials + partial;
        if (!fs.statSync(partialPath).isDirectory()) {
            self.copy(partialPath, projectPartials + partial);
        }
    });
};

/** Copy images */
expressAppGenerator.prototype.copyImages = function copyImages() {
    var genFavicon = this._eDir.download.src + 'client/images/favicon.ico',
        projectFavicon = this._eDir.project.client + 'favicon.ico';

    this.copy(genFavicon, projectFavicon);
};

/** Setup styles (CSS, Sass, Less, etc) */
expressAppGenerator.prototype.setupStyles = function setupStyles() {
    var genStyles = this._eDir.download.src + 'client/styles/',
        projectStyles = this._eDir.project.client + 'styles/';

    this.copy(genStyles + 'app.css',    projectStyles + 'app.css');
    this.copy(genStyles + 'common.css', projectStyles + 'common.css');
};

/** Cleanup downloadDir */
expressAppGenerator.prototype.cleanupDownloadDir = function cleanupDownloadDir() {
    rimraf(this._eDir.download.root, function(err) {
        if (err) {
            console.log(err);
        }
    });
};
