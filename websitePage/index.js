'use strict';

/**
 * Create a server-side Express web page which includes:
 * 1. Create a view
 * 2. Create a controller
 * 3. Add a route to the website router
 *
 * @copyright Copyright 2013 Exponential.io. All rights reserved.
 * @author Akbar S. Ahmed <akbar@exponential.io>
 */

var util            = require('util'),
    _               = require('lodash'),
    yeoman          = require('yeoman-generator'),
    _eArguments     = require('../util/arguments'),
    _eOptions       = require('../util/options'),
    fs              = require('fs'),
    path            = require('path'),
    _eInject        = require('../util/inject'),
    _eGeneratorBase = require('../util/generator-base'),
    _eLoadMdf       = require('../util/load-mdf'),
    _eMkDirs        = require('../util/mkdir');


var websitePageGenerator = module.exports = function websitePageGenerator() {
    _eGeneratorBase.apply(this, arguments);
    _eLoadMdf.apply(this, [{
        project: false,
        app: false,
        module: true
    }]);
};

util.inherits(websitePageGenerator, _eGeneratorBase);

/** Create project directory structure */
websitePageGenerator.prototype.projectDirs = function projectDirs() {
    _eMkDirs.apply(this, [[
        'test/website'
    ]]);
};

/** Router */
websitePageGenerator.prototype.injectRouter = function injectRouter() {
    var url = this.mdf.module.express.url,
        controller = this.mdf.module.express.controller;

    _eInject({
        targetFile: 'server/routers/website.js',
        needle: '};',
        splicable: [
            '    // ' + this.mdf.module.name.upperSingular,
            '    app.get(\'' + url + '\', require(\'../controllers/' + controller + '\').render);'
        ],
        appendComma: false
    });
};

/** Controller */
websitePageGenerator.prototype.setupController = function setupController() {
    var controllerFile = this.mdf.module.express.controller + this.mdf.module.express.controllerExt;

    // The controller template is from the templates directory, not the
    // {{project}}/exponential directory.
    var genController = this._eDir.generator.website + 'controllers/index.js',
        projectController = 'server/controllers/' + controllerFile;

    this.template(genController, projectController);
};

/** View */
websitePageGenerator.prototype.setupView = function setupView() {
    var viewFile = this.mdf.module.express.view + this.mdf.module.express.viewExt;

    var nameLs = this.mdf.module.name.lowerSingular,
        websiteView = this._eDir.website.server.views.root + viewFile,
        projectView = 'server/views/' + viewFile;

    this.template(websiteView, projectView);
};

/** Page specific images */
websitePageGenerator.prototype.copyImages = function copyImages() {
    var self = this,
        nameLs = this.mdf.module.name.lowerSingular,
        projectImages = 'client/images/website/' + nameLs + '/';

    var genImagesDir = this._eDir.website.client.images + nameLs + '/',
        images = [];

    if (fs.existsSync(genImagesDir)) {
        // Create the page specific image directory
        _eMkDirs.apply(this, [[
            'client/images/website/' + this.mdf.module.name.lowerSingular
        ]]);
        images = fs.readdirSync(genImagesDir);
    }

    if (images.length > 0) {
        _eMkDirs.apply(this, [[
            'client/images/website/' + nameLs
        ]]);

        images.forEach(function(image) {
            var imagePath = genImagesDir  + image;
            if (!fs.statSync(imagePath).isDirectory()) {
                self.copy(imagePath, projectImages + image);
            }
        });
    }
};

/** Page specific helpers */
websitePageGenerator.prototype.setupHelpers = function setupHelpers() {
    var self = this,
        nameLs = this.mdf.module.name.lowerSingular;

    var genHelpersDir = this._eDir.website.server.views.helpers + nameLs + '/',
        helpers = [];

    if (fs.existsSync(genHelpersDir)) {
        helpers = fs.readdirSync(genHelpersDir);
    }

    if (helpers.length > 0) {
        helpers.forEach(function(helper) {
            var helperPath = genHelpersDir + helper;
            if (!fs.statSync(helperPath).isDirectory()) {
                self.template(helperPath, 'server/views/helpers/' + helper);
            }
        });
    }
};

/** Page specific layouts */
websitePageGenerator.prototype.setupLayouts = function setupLayouts() {
    var self = this,
        nameLs = this.mdf.module.name.lowerSingular;

    var genLayoutsDir = this._eDir.website.server.views.layouts + nameLs + '/',
        layouts = [];

    if (fs.existsSync(genLayoutsDir)) {
        layouts = fs.readdirSync(genLayoutsDir);
    }

    if (layouts.length > 0) {
        layouts.forEach(function(layout) {
            var layoutPath = genLayoutsDir + layout;
            if (!fs.statSync(layoutPath).isDirectory()) {
                self.template(layoutPath, 'server/views/layouts/' + layout);
            }
        });
    }
};

/** Page specific partials */
websitePageGenerator.prototype.setupPartials = function setupPartials() {
    var self = this,
        nameLs = this.mdf.module.name.lowerSingular;

    var genPartialsDir = this._eDir.website.server.views.partials + nameLs + '/',
        partials = [];

    if (fs.existsSync(genPartialsDir)) {
        partials = fs.readdirSync(genPartialsDir);
    }

    if (partials.length > 0) {
        partials.forEach(function(partial) {
            var partialPath = genPartialsDir + partial;
            if (!fs.statSync(partialPath).isDirectory()) {
                self.template(partialPath, 'server/views/partials/' + partial);
            }
        });
    }
};

/** Page specific  styles (CSS, Sass, Less, etc) */
websitePageGenerator.prototype.setupStyles = function setupStyles() {
    var self = this,
        nameLs = this.mdf.module.name.lowerSingular;

    var genStylesDir = this._eDir.website.client.styles + nameLs + '/',
        styles = [];

    if (fs.existsSync(genStylesDir)) {
        styles = fs.readdirSync(genStylesDir);
    }

    if (styles.length > 0) {
        styles.forEach(function(style) {
            var stylePath = genStylesDir + style;
            if (!fs.statSync(stylePath).isDirectory()) {
                self.copy(stylePath, 'client/styles/' + style);
            }
        });
    }
};
