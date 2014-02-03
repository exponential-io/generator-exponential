'use strict';

/**
 * Create an Angular router.
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
    _eInject        = require('../util/inject'),
    _eGeneratorBase = require('../util/generator-base'),
    _eLoadMdf       = require('../util/load-mdf');


var AngularRouterGenerator = module.exports = function AngularRouterGenerator() {
    _eGeneratorBase.apply(this, arguments);
    _eLoadMdf.apply(this, [{
        project: false,
        app: false,
        module: true
    }]);
};

util.inherits(AngularRouterGenerator, _eGeneratorBase);

/**
 * Create the Angular files - Routes
 */
AngularRouterGenerator.prototype.angularServiceFiles = function angularRouterFiles() {
    // Generator template base directory
    var genBase = _eDir.generator.templates;

    // Directory of the template used by the application defined in the MDF
    var genTemplate      = genBase + this.mdf.module.angular.template + '/',
        genAngularModule = genTemplate + 'angular/',
        genJs            = genAngularModule + 'js/',
        genRouters       = genJs + 'routers/';

    // Relative project paths
    var projectRouters = 'client/' + this.mdf.app.urlBase + '/js/routers/',
        moduleRouter   = projectRouters + this.mdf.module.name.lowerPlural + '.js';

    // Routers
    this.template(genRouters + 'routes.js', moduleRouter);

    /*
        Insert references to each router in the index.html file.

        The 'js/' prefix to each path and the '.js' file extension are
        automatically added by the inject method.
     */

    var routersJsDir = 'routers/';
    var jsFiles = [
        routersJsDir + this.mdf.module.name.lowerPlural
    ];

    var indexHtml = _eDir.project.client + this.mdf.app.urlBase + '/index.html';

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

    /*
        Insert the module name into the app.js file so that the module's routes
        are loaded.
     */
    var appJs = _eDir.project.client + this.mdf.app.name.lowerPlural + '/js/app.js';

    _eInject({
        targetFile: appJs,
        needle: '])',
        splicable: [
            '    \'' + this.mdf.module.angular.module + '\''
        ],
        appendComma: true
    });

    var navbarHtml = _eDir.project.client + this.mdf.app.urlBase + '/views/common/navbar.html';

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
