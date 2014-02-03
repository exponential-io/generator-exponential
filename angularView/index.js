'use strict';

/**
 * Create an Angular view.
 *
 * @copyright Copyright 2013 Exponential.io. All rights reserved.
 * @author Akbar S. Ahmed <akbar@exponential.io>
 */

var util            = require('util'),
    _               = require('lodash'),
    yeoman          = require('yeoman-generator'),
    _eArguments     = require('../util/arguments'),
    _eOptions       = require('../util/options'),
    _eDir           = require('../util/directories')(),
    _eCreateHtml    = require('../util/angular/views/create'),
    _eReadAllHtml   = require('../util/angular/views/read-all'),
    _eReadOneHtml   = require('../util/angular/views/read-one'),
    _eGeneratorBase = require('../util/generator-base'),
    _eLoadMdf       = require('../util/load-mdf');


var AngularViewGenerator = module.exports = function AngularViewGenerator() {
    _eGeneratorBase.apply(this, arguments);
    _eLoadMdf.apply(this, [{
        project: false,
        app: false,
        module: true
    }]);
};

util.inherits(AngularViewGenerator, _eGeneratorBase);

/**
 * Create the Angular views directory structure
 */
AngularViewGenerator.prototype.angularDirs = function angularDirs() {
    var self = this;

    // Relative project paths
    var projectAngularApp = 'client/' + this.mdf.app.name.lowerPlural + '/',
        projectModuleViews = projectAngularApp + 'js/views/' + this.mdf.module.name.lowerPlural + '/';

    var appDirs = [
        projectModuleViews
    ];

    appDirs.forEach(function(element) {
        self.mkdir(element);
    });

    // TODO: This is not yet usable. I need to upgrade the entire automation of
    // TODO: test automation so that its production ready.
    var testRoot = 'test/angular/' + this.mdf.app.name.lowerPlural + '/views/' + this.mdf.module.name.lowerPlural + '/';

    var testDirs = [
        testRoot
    ];

    testDirs.forEach(function(element) {
        self.mkdir(element);
    });
};

/**
 * Create the Angular files - Routes
 */
AngularViewGenerator.prototype.angularFiles = function angularFiles() {
    // Generator template base directory
    var genBase = _eDir.generator.templates;

    // Directory of the template used by the application defined in the MDF
    var genTemplate      = genBase + this.mdf.module.angular.template + '/',
        genAngularModule = genTemplate + 'angular/',
        genViews         = genAngularModule + 'views/';

    // Relative project paths
    var projectAngularApp    = 'client/' + this.mdf.app.name.lowerPlural + '/',
        projectViews         = projectAngularApp + 'views/',
        moduleViews          = projectViews + this.mdf.module.name.lowerPlural + '/';

    var modelName = this.mdf.module.model.name;

    // Views
    this.createHtml = _eCreateHtml(modelName, this.mdf.module.schema.fields);
    this.template(genViews + 'create.html',   moduleViews + 'create.html');

    this.readAllHtml = _eReadAllHtml(this.mdf.module.urlBase, modelName, this.mdf.module.schema.fields);
    this.template(genViews + 'read-all.html', moduleViews + 'read-all.html');

    this.readOneHtml = _eReadOneHtml(modelName, this.mdf.module.schema.fields);
    this.template(genViews + 'read-one.html', moduleViews + 'read-one.html');
};
