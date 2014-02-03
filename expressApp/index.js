'use strict';

/**
 * Create the scaffolding for an Express app or website.
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
    _eGeneratorBase = require('../util/generator-base'),
    _eLoadMdf       = require('../util/load-mdf'),
    _eMkDirs        = require('../util/mkdir');


var expressAppGenerator = module.exports = function expressAppGenerator() {
    _eGeneratorBase.apply(this, arguments);
    _eLoadMdf.apply(this, [{
        project: true,
        app: true,
        module: false
    }]);
};

util.inherits(expressAppGenerator, _eGeneratorBase);

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

    var webTemplate    = this._eDir.website.root,
        webServer      = this._eDir.website.server.root,
//        webControllers = this._eDir.website.views.controllers,
//        webModels      = this._eDir.website.views.models,
        webViews       = this._eDir.website.server.views.root,
        webHelpers     = this._eDir.website.server.views.helpers,
        webLayouts     = this._eDir.website.server.views.layouts,
        webPartials    = this._eDir.website.server.views.partials;

    // Views
    this.copy(webViews + '404.hbs', 'server/views/404.hbs');
    this.copy(webViews + '500.hbs', 'server/views/500.hbs');

    // Helpers
    fs.readdirSync(this._eDir.website.server.views.helpers).forEach(function(helper) {
        var helperPath = this._eDir.website.server.views.helpers + helper;
        if (!fs.statSync(helperPath).isDirectory()) {
            self.template(helperPath, 'server/views/helpers/' + helper);
        }
    });

    // Layouts
    fs.readdirSync(this._eDir.website.server.views.layouts).forEach(function(layout) {
        var layoutPath = this._eDir.website.server.views.layouts + layout;
        if (!fs.statSync(layoutPath).isDirectory()) {
            self.template(layoutPath, 'server/views/layouts/' + layout);
        }
    });

    // Partials
    fs.readdirSync(this._eDir.website.server.views.partials).forEach(function(partial) {
        var partialPath = this._eDir.website.server.views.partials + partial;
        if (!fs.statSync(partialPath).isDirectory()) {
            self.template(partialPath, 'server/views/partials/' + partial);
        }
    });
};

/** Copy images */
expressAppGenerator.prototype.copyImages = function copyImages() {
    var projectClient = 'client/';
//        projectImages = projectClient + 'images/';

    this.copy(this._eDir.website.client.images + 'favicon.ico', projectClient + 'favicon.ico');
};

/** Setup styles (CSS, Sass, Less, etc) */
expressAppGenerator.prototype.setupStyles = function setupStyles() {
    var projectClient = 'client/',
        projectStyles = projectClient + 'styles/';

    this.copy(this._eDir.website.client.styles + 'app.css',    projectStyles + 'app.css');
    this.copy(this._eDir.website.client.styles + 'common.css', projectStyles + 'common.css');
};
