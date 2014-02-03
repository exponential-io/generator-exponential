/**
 * Create Angular application container.
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


var AngularAppGenerator = module.exports = function AngularAppGenerator() {
    _eGeneratorBase.apply(this, arguments);
    _eLoadMdf.apply(this, [{
        project: true,
        app: true,
        module: false
    }]);
    _eConfig.apply(this);
};

util.inherits(AngularAppGenerator, _eGeneratorBase);

/** Generate the project skeleton files */
AngularAppGenerator.prototype.generateApp = function generateApp() {
    _eDownloadSource.apply(this, [{
        _eMkDirs: _eMkDirs,
        generator: 'angularApp'
    }]);
};

/** Create the Angular application directory structure */
AngularAppGenerator.prototype.angularDirs = function angularDirs() {
    // Relative project paths
    var projectAngularApp = 'client/' + this.mdf.app.name.lowerPlural + '/';

    _eMkDirs.apply(this, [[
        projectAngularApp,
        projectAngularApp + 'css',
        projectAngularApp + 'img',
        projectAngularApp + 'js',
        projectAngularApp + 'js/controllers',
        projectAngularApp + 'js/directives',
        projectAngularApp + 'js/filters',
        projectAngularApp + 'js/models',
        projectAngularApp + 'js/routers',
        projectAngularApp + 'js/services',
        projectAngularApp + 'views',
        projectAngularApp + 'views/accounts',
        projectAngularApp + 'views/common',
        projectAngularApp + 'views/home'
    ]]);

    // TODO: Create production ready tests.
    _eMkDirs.apply(this, [[
        'test/angular/' + this.mdf.app.name.lowerPlural
    ]]);
};

/** Create the Angular application files */
AngularAppGenerator.prototype.angularAppFiles = function angularAppFiles() {
    // Generator directory structure: angular-skel
    var genAngularSkel   = this._eDir.download.src +
            'client/' +
            this.mdf.app.name.lowerPlural +
            '/',
        genCss           = genAngularSkel + 'css/',
        genImg           = genAngularSkel + 'img/',
        genJs            = genAngularSkel + 'js/',
        genControllers   = genAngularSkel + 'js/controllers/',
        genDirectives    = genAngularSkel + 'js/directives/',
        genFilters       = genAngularSkel + 'js/filters/',
        genModels        = genAngularSkel + 'js/models/',
        genRouters       = genAngularSkel + 'js/routers/',
        genServices      = genAngularSkel + 'js/services/',
        genViews         = genAngularSkel + 'views/',
        genViewsAccounts = genAngularSkel + 'views/accounts/',
        genViewsCommon   = genAngularSkel + 'views/common/',
        genViewsHome     = genAngularSkel + 'views/home/';

    // Relative project paths
    var projectAngularApp    = this._eDir.project.client + this.mdf.app.name.lowerPlural + '/',
        projectCss           = projectAngularApp + 'css/',
        projectImg           = projectAngularApp + 'img/',
        projectJs            = projectAngularApp + 'js/',
        projectControllers   = projectAngularApp + 'js/controllers/',
        projectDirectives    = projectAngularApp + 'js/directives/',
        projectFilters       = projectAngularApp + 'js/filters/',
        projectModels        = projectAngularApp + 'js/models/',
        projectRouters       = projectAngularApp + 'js/routers/',
        projectServices      = projectAngularApp + 'js/services/',
        projectViews         = projectAngularApp + 'views/',
        projectViewsAccounts = projectAngularApp + 'views/accounts/',
        projectViewsCommon   = projectAngularApp + 'views/common/',
        projectViewsHome     = projectAngularApp + 'views/home/';

    // HTML
    this.copy(genAngularSkel + 'index.html', projectAngularApp + 'index.html');

    // CSS
    this.copy(genCss + 'app.css', projectCss + 'app.css');

    // Images
    //this.copy(genImg + '', projectImg + '');

    // JavaScript
    this.copy(genJs + 'app.js', projectJs + 'app.js');

    // Controllers
    this.copy(genControllers + 'accounts/login-ctrl.js',  projectControllers + 'accounts/login-ctrl.js');
    this.copy(genControllers + 'accounts/signup-ctrl.js', projectControllers + 'accounts/signup-ctrl.js');
    this.copy(genControllers + 'common/navbar-ctrl.js',   projectControllers + 'common/navbar-ctrl.js');
    this.copy(genControllers + 'website/home-ctrl.js',    projectControllers + 'website/home-ctrl.js');

    // Directives
    //this.copy(genDirectives + '', projectDirectives + '');

    // Filters
    //this.copy(genFilters + '', projectFilters + '');

    // Models
    //this.copy(genModels + '', projectModels + '');

    // Routers
    this.copy(genRouters + 'accounts.js', projectRouters + 'accounts.js');

    // Services
    this.copy(genServices + 'accounts/accounts-srv.js', projectServices + 'accounts/accounts-srv.js');

    // Views
    //this.copy(genViews + '', projectViews + '');
    this.copy(genViewsAccounts + 'login.html',  projectViewsAccounts + 'login.html');
    this.copy(genViewsAccounts + 'signup.html', projectViewsAccounts + 'signup.html');

    this.copy(genViewsCommon + '401.html',    projectViewsCommon + '401.html');
    this.copy(genViewsCommon + '404.html',    projectViewsCommon + '404.html');
    this.copy(genViewsCommon + 'navbar.html', projectViewsCommon + 'navbar.html');

    this.copy(genViewsHome + 'main.html', projectViewsHome + 'main.html');
};

/** Inject an Angular entry point into the Express router */
AngularAppGenerator.prototype.routerEntryPoint = function routerEntryPoint() {
    var appName = this.mdf.app.name.lowerPlural;

    _eInject({
        targetFile: 'server/routers/angular-entry-points.js',
        needle: '};',
        splicable: [
            '    app.get(\'/' + appName + '/*\',',
            '        function(req, res) {',
            '            res.sendfile(\'client/' + appName + '/index.html\');',
            '        }',
            '    );'
        ],
        appendComma: false
    });
};

/** Cleanup downloadDir */
AngularAppGenerator.prototype.cleanupDownloadDir = function cleanupDownloadDir() {
    rimraf(this._eDir.download.root, function(err) {
        if (err) {
            console.log(err);
        }
    });
};
