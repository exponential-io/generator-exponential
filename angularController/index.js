/**
 * Create all Angular controllers for a module.
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


var AngularControllerGenerator = module.exports = function AngularControllerGenerator() {
    _eGeneratorBase.apply(this, arguments);
    _eLoadMdf.apply(this, [{
        project: false,
        app: false,
        module: true
    }]);
    _eConfig.apply(this);
};

util.inherits(AngularControllerGenerator, _eGeneratorBase);

/** Download the source files */
AngularControllerGenerator.prototype.generateSrc = function generateSrc() {
    _eDownloadSource.apply(this, [{
        _eMkDirs: _eMkDirs,
        generator: 'angularController'
    }]);
};

/** Create the Angular application directory structure */
AngularControllerGenerator.prototype.angularDirs = function angularDirs() {
    var appNameLp    = this.mdf.app.name.lowerPlural,
        moduleNameLp = this.mdf.module.name.lowerPlural;

    // Relative project paths
    var projectAngularApp = 'client/' + appNameLp + '/',
        projectModuleControllers = projectAngularApp + 'js/controllers/' + moduleNameLp + '/';

    // TODO: Create production ready tests.
    var testRoot = 'test/angular/' + appNameLp + '/controllers/' + moduleNameLp + '/';

    _eMkDirs.apply(this, [[
        projectModuleControllers,
        testRoot
    ]]);
};

/** Create the Angular files - Controller(s) */
AngularControllerGenerator.prototype.angularAppFiles = function angularAppFiles() {
    var appNameLp    = this.mdf.app.name.lowerPlural,
        moduleNameLp = this.mdf.module.name.lowerPlural;

    // Generator template base directory
//    var genBase = this._eDir.download.src + 'client/';

    // Directory of the template used by the application defined in the MDF
//    var genTemplate      = genBase + this.mdf.module.angular.template + '/',
//        genAngularModule = genTemplate + 'angular/',
//        genJs            = genAngularModule + 'js/',
//        genControllers   = genJs + 'controllers/';

//    genControllers = this._eDir.download.src + 'client/';
    var genAngularApp    = this._eDir.download.src + 'client/' + appNameLp + '/',
        genJs            = genAngularApp + 'js/',
        genControllers   = genJs + 'controllers/' + moduleNameLp + '/';

    // Relative project paths
    var projectAngularApp    = this._eDir.project.client + appNameLp + '/',
        projectJs            = projectAngularApp + 'js/',
        projectControllers   = projectJs + 'controllers/' + moduleNameLp + '/';

    // HTML
    //this.template(genAngularSkel + 'index.html', projectAngularApp + 'index.html');

    // Controllers
    this.template(genControllers + 'create-ctrl.js',   projectControllers + 'create-ctrl.js');
    this.template(genControllers + 'read-all-ctrl.js', projectControllers + 'read-all-ctrl.js');
    this.template(genControllers + 'read-one-ctrl.js', projectControllers + 'read-one-ctrl.js');

    // Insert references to each controller in the index.html file.
    // The 'js/' prefix to each path and the '.js' file extension are
    // automatically added by the inject method.

    var controllerJsDir = 'controllers/' + moduleNameLp + '/';
    var controllers = [
        controllerJsDir + 'create-ctrl',
        controllerJsDir + 'read-all-ctrl',
        controllerJsDir + 'read-one-ctrl'
    ];

    // urlBase
    var indexHtml = this._eDir.project.client + appNameLp + '/index.html';
    controllers.forEach(function(controllerJs) {
        _eInject({
            targetFile: indexHtml,
            needle: '<!-- endbuild -->',
            splicable: [
                '<script type="text/javascript" src="js/' + controllerJs.replace('\\', '/') + '.js"></script>'
            ],
            appendComma: false
        });
    });




    // Directives
    //this.copy(genDirectives + '', projectDirectives + '');

    // Filters
    //this.copy(genFilters + '', projectFilters + '');

    // Models
    //this.copy(genModels + '', projectModels + '');

    // Routers
    //this.template(genRouters + 'accounts.js', projectRouters + 'accounts.js');

    // Services
    //this.template(genServices + 'accounts/accounts-srv.js', projectServices + 'accounts/accounts-srv.js');

    // Views
    //this.copy(genViews + '', projectViews + '');
//    this.template(genViewsAccounts + 'login.html',  projectViewsAccounts + 'login.html');
//    this.template(genViewsAccounts + 'signup.html', projectViewsAccounts + 'signup.html');
//
//    this.template(genViewsCommon + '401.html',    projectViewsCommon + '401.html');
//    this.template(genViewsCommon + '404.html',    projectViewsCommon + '404.html');
//    this.template(genViewsCommon + 'navbar.html', projectViewsCommon + 'navbar.html');
//
//    this.template(genViewsHome + 'main.html', projectViewsHome + 'main.html');
};

/** Cleanup downloadDir */
AngularControllerGenerator.prototype.cleanupDownloadDir = function cleanupDownloadDir() {
    rimraf(this._eDir.download.root, function(err) {
        if (err) {
            console.log(err);
        }
    });
};
