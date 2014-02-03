'use strict';

/**
 * Create Exponential Project.
 * Execution env: Client (CLI)
 *
 * @copyright Copyright 2014 Exponential.io. All rights reserved.
 * @author Akbar S. Ahmed <akbar@exponential.io>
 */

var util             = require('util'),
    _                = require('lodash'),
    yeoman           = require('yeoman-generator'),
    _eGeneratorBase  = require('../util/generator-base'),
    _eLoadMdf        = require('../util/load-mdf'),
    _eMkDirs         = require('../util/mkdir'),
    rimraf           = require('rimraf'),
    _eDownloadSource = require('../util/download-source'),
    _eConfig         = require('../util/config');


var ExponentialProjectGenerator = module.exports = function ExponentialProjectGenerator() {
    _eGeneratorBase.apply(this, arguments);
    _eLoadMdf.apply(this, [{
        project: true,
        app: true,
        module: false
    }]);
    _eConfig.apply(this);
};

util.inherits(ExponentialProjectGenerator, _eGeneratorBase);

/** Generate the project skeleton files */
ExponentialProjectGenerator.prototype.generateProject = function generateProject() {
    _eDownloadSource.apply(this, [{
        _eMkDirs: _eMkDirs,
        generator: 'project'
    }]);
};

/* Copy the generated project files and directories to the current directory */

/** Create project directory structure */
ExponentialProjectGenerator.prototype.projectDirs = function projectDirs() {
    _eMkDirs.apply(this, [[
        'build',
        'build/images',
        'build/images/icons',
        'build/scripts',
        'build/styles',
        'client',
        'client/images',
        'client/images/website',
        'client/images/website/home',
        'client/images/website/icons',
        'client/scripts',
        'client/styles',
        'docs',
        'exponential',
        'server',
        'server/controllers',
        'server/lib',
        'server/models',
        'server/routers',
        'server/views',
        'server/views/helpers',
        'server/views/layouts',
        'server/views/partials',
        'server/views/website',
        'server/config',
        'server/config/env',
        'test'
    ]]);
};

/** Setup Express server */
ExponentialProjectGenerator.prototype.setupExpress = function setupExpress() {
    // Server directory
    var _server = this._eDir.download.projectSkel + 'server/';

    // Express configuration
    var _config     = _server + 'config/',
        _env        = _config + 'env/',
        _middleware = _server + 'middleware/';

    // Common (shared) controllers, models, routers and views
    var _controllers = _server + 'controllers/',
        _models      = _server + 'models/',
        _views       = _server + 'views/',
        _helpers     = _views  + 'helpers/',
        _layouts     = _views  + 'layouts/',
        _partials    = _views  + 'partials/';


    // Main server.js
    this.copy(_server + 'server.js', this._eDir.project.server + 'server.js');

    // Express configuration
//    var _projectConfig = 'server/config/';
    var _projectConfig = this._eDir.project.server + 'config/';

    this.copy(    _config + 'config.js',      _projectConfig + 'config.js');
    this.template(_config + 'database.js',    _projectConfig + 'database.js');
    this.copy(    _config + 'directories.js', _projectConfig + 'directories.js');
    this.copy(    _config + 'passport.js',    _projectConfig + 'passport.js');

    var _projectEnv = this._eDir.project.server + 'config/env/';

    this.copy(_env + 'all.js',         _projectEnv + 'all.js');
    this.copy(_env + 'development.js', _projectEnv + 'development.js');
    this.copy(_env + 'production.js',  _projectEnv + 'production.js');
    this.copy(_env + 'test.js',        _projectEnv + 'test.js');
    this.copy(_env + 'travis.json',    _projectEnv + 'travis.json');

    // Express middleware
    var _projectMiddleware = this._eDir.project.server + 'middleware/';

    this.copy(_middleware + 'authorization.js', _projectMiddleware + 'authorization.js');
    this.copy(_middleware + 'csrf.js',          _projectMiddleware + 'csrf.js');

    var _projectViews = this._eDir.project.server + 'views/';

    // Common views
    this.copy(_views + '404.hbs', _projectViews + '404.hbs');
    this.copy(_views + '500.hbs', _projectViews + '500.hbs');

    // Common helpers
    this.copy(_helpers + 'app.js',   _projectViews + 'helpers/app.js');
    this.copy(_helpers + 'index.js', _projectViews + 'helpers/index.js');

    // Common layouts
    this.copy(_layouts + 'main.hbs', _projectViews + 'layouts/main.hbs');

    // Common partials
    this.copy(_partials + 'footer.hbs', _projectViews + 'partials/footer.hbs');
    this.copy(_partials + 'navbar.hbs', _projectViews + 'partials/navbar.hbs');
};

/** Create the server code library */
ExponentialProjectGenerator.prototype.serverLib = function serverLib() {
    // Lib
    var genLib = this._eDir.download.projectSkel + 'server/lib/';

    var projectLib = this._eDir.project.server + 'lib/';

    this.copy(genLib + 'usa-states.js', projectLib + 'usa-states.js');
};

/** Create an Express router for all Angular entry points */
ExponentialProjectGenerator.prototype.angularEntryPoints = function angularEntryPoints() {
    // Generator routers directory
    var genRouters = this._eDir.download.projectSkel + 'server/routers/';

    // Project routers directory
    var projectRouters = this._eDir.project.server + 'routers/';

    this.copy(genRouters + 'angular-entry-points.js', projectRouters + 'angular-entry-points.js');
};

/** Create the Index page */
ExponentialProjectGenerator.prototype.indexPage = function indexPage() {
//    // Server directory
//    var gServer = this._eDir.download.projectSkel + 'server/';
//
//    // Common (shared) controllers, models, routers and views
//    var gControllers = gServer + 'controllers/',
//        gRouters     = gServer + 'routers/',
//        gWebsite     = gServer + 'views/website/';

    // Generator routers directory
    var genRouters = this._eDir.download.projectSkel + 'server/routers/';

    // Project routers directory
    var projectRouters = this._eDir.project.server + 'routers/';

    //this.copy(gControllers + 'index.js',  'server/controllers/index.js');
    this.copy(genRouters     + 'website.js',  projectRouters + 'website.js');
    //this.copy(gWebsite     + 'index.hbs', 'server/views/website/home.hbs');
};

/** Create the Accounts module */
ExponentialProjectGenerator.prototype.accountsModule = function accountsModule() {
    // Server directory
    var genServer = this._eDir.download.projectSkel + 'server/';

    // Common (shared) controllers, models, routers and views
    var genControllers = genServer + 'controllers/',
        genModels      = genServer + 'models/',
        genRouters     = genServer + 'routers/',
        genViews       = genServer + 'views/';

    // Project directory
    var projectServer = this._eDir.project.server;

    // Common (shared) controllers, models, routers and views
    var projectControllers = projectServer + 'controllers/',
        projectModels      = projectServer + 'models/',
        projectRouters     = projectServer + 'routers/',
        projectViews       = projectServer + 'views/';

    // Controllers
    this.copy(genControllers + 'accounts.js', projectControllers + 'accounts.js');
    this.copy(genControllers + 'accounts-api.js', projectControllers + 'accounts-api.js');

    // Models
    this.copy(genModels + 'user.js', projectModels + 'user.js');

    // Routers
    this.copy(genRouters + 'accounts.js',     projectRouters + 'accounts.js');
    this.copy(genRouters + 'accounts-api.js', projectRouters + 'accounts-api.js');

    // Views
    var genAccounts = this._eDir.download.projectSkel + 'server/views/accounts/';
    var projectAccounts = projectViews + 'accounts/';


    _eMkDirs.apply(this, [[
        'server/views/accounts'
    ]]);

    this.copy(genAccounts + 'login.hbs',  projectAccounts + 'login.hbs');
    this.copy(genAccounts + 'signup.hbs', projectAccounts + 'signup.hbs');
};

/** Copy images */
ExponentialProjectGenerator.prototype.copyImages = function copyImages() {
    var genClient = this._eDir.download.projectSkel + 'client/',
        genHome  = genClient + 'images/website/home/',
        genIcons = genClient + 'images/website/icons/';

    var projectClient = this._eDir.project.client,
        projectHome = projectClient + 'images/website/home/',
        projectIcons = projectClient + 'images/website/icons/';

    this.copy(genHome + 'angular-source.png',  projectHome + 'angular-source.png');
    this.copy(genHome + 'node-source.png',     projectHome + 'node-source.png');
    this.copy(genHome + 'mongoose-source.png', projectHome + 'mongoose-source.png');
    this.copy(genHome + 'mdf-source.png',      projectHome + 'mdf-source.png');

    this.copy(genIcons + 'lab-140.png',     projectIcons + 'lab-140.png');
    this.copy(genIcons + 'startup-140.png', projectIcons + 'startup-140.png');
    this.copy(genIcons + 'website-140.png', projectIcons + 'website-140.png');

    //this.directory(genClient + 'images', 'client/images');
};

/** Setup styles (CSS, Sass, Less, etc) */
ExponentialProjectGenerator.prototype.setupStyles = function setupStyles() {
    var genStyles = this._eDir.download.projectSkel + 'client/styles/';

    var projectStyles = this._eDir.project.client + 'styles/';

    this.copy(genStyles + 'app.css',    projectStyles + 'app.css');
    this.copy(genStyles + 'common.css', projectStyles + 'common.css');
};

/** Setup Grunt for task automation */
ExponentialProjectGenerator.prototype.setupGrunt = function setupGrunt() {
    var genProjectSkel = this._eDir.download.projectSkel;

    var projectRoot = this._eDir.project.root;

    this.copy(genProjectSkel + 'Gruntfile.js', projectRoot + 'Gruntfile.js');
};

/** Setup NPM for server-side packages */
ExponentialProjectGenerator.prototype.setupNpm = function setupNpm() {
    var genProjectSkel = this._eDir.download.projectSkel;

    var projectRoot = this._eDir.project.root;

    this.template(genProjectSkel + 'package.json', projectRoot + 'package.json');
};

/** Setup Bower for client-side packages */
ExponentialProjectGenerator.prototype.setupBower = function setupBower() {
    var genProjectSkel = this._eDir.download.projectSkel;

    var projectRoot = this._eDir.project.root;

    this.copy(genProjectSkel + '.bowerrc', projectRoot + '.bowerrc');
    this.template(genProjectSkel + 'bower.json', projectRoot + 'bower.json');
};

/** Setup Git / Github support for revision control */
ExponentialProjectGenerator.prototype.setupGit = function setupGit() {
    var genProjectSkel = this._eDir.download.projectSkel;

    var projectRoot = this._eDir.project.root;

    this.copy(genProjectSkel + '.gitignore', projectRoot + '.gitignore');
};

/** EditorConfig to ensure a consistent coding style in Exponential projects */
ExponentialProjectGenerator.prototype.setupEditorConfig = function setupEditorConfig() {
    var genProjectSkel = this._eDir.download.projectSkel;

    var projectRoot = this._eDir.project.root;

    this.copy(genProjectSkel + '.editorconfig', projectRoot + '.editorconfig');
};

/** Setup JSHint to promote code quality */
ExponentialProjectGenerator.prototype.setupJSHint = function setupJSHint() {
    var genProjectSkel = this._eDir.download.projectSkel;

    var projectRoot = this._eDir.project.root;

    this.copy(genProjectSkel + '.jshintrc', projectRoot + '.jshintrc');
};

/** Setup misc project files */
ExponentialProjectGenerator.prototype.setupProjectFiles = function setupProjectFiles() {
    var genProjectSkel = this._eDir.download.projectSkel;

    var projectRoot = this._eDir.project.root;

    this.template(genProjectSkel + 'README.md', projectRoot + 'README.md');
    this.copy(genProjectSkel + 'LICENSE', projectRoot + 'LICENSE');
};

/** Setup Heroku support */
ExponentialProjectGenerator.prototype.setupHeroku = function setupHeroku() {
    var genProjectSkel = this._eDir.download.projectSkel;

    var projectRoot = this._eDir.project.root;

    if (this.heroku) {
        this.copy(genProjectSkel + 'Procfile', projectRoot + 'Procfile');
    }
};

/** Cleanup downloadDir */
ExponentialProjectGenerator.prototype.cleanupDownloadDir = function cleanupDownloadDir() {
    rimraf(this._eDir.download.root, function(err) {
        if (err) {
            console.log(err);
        }
    });
};
