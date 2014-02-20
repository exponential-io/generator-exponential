/**
 * Inject one or more server-side Express routes.
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


var expressRouterGenerator = module.exports = function expressRouterGenerator() {
    _eGeneratorBase.apply(this, arguments);
    _eLoadMdf.apply(this, [{
        project: false,
        app: false,
        module: true
    }]);
    _eConfig.apply(this);
};

util.inherits(expressRouterGenerator, _eGeneratorBase);

// Pre-cleanup downloadDir
expressRouterGenerator.prototype.preCleanup = _eCleanup;

/** Download the source files */
expressRouterGenerator.prototype.generateSrc = function generateSrc() {
    _eDownloadSource.apply(this, [{
        _eMkDirs: _eMkDirs,
        generator: 'expressRouter'
    }]);
};

expressRouterGenerator.prototype.copyRouter = function copyRouter() {
    // Markdown for page header comment
    this.h1Header = this.mdf.module.name.upperPlural + ' Router';
    this.h1Md = new Array((this.h1Header + 1).length).join('=');

    var genRouter = __dirname + '/../templates/' +
                    this.mdf.module.express.template +
                    '/express/routers/router.js';

    this.router = 'server/routers/' + this.mdf.module.name.lowerPlural + '.js';

    this.template(genRouter, this.router, this);
};

/** Router */
expressRouterGenerator.prototype.injectRouter = function injectRouter() {
    var url = '',
        controller = '',
        router = '',
        routes = [],
        moduleNameUp = this.mdf.module.name.upperPlural,
        moduleNameUs = this.mdf.module.name.upperSingular,
        moduleNameLs = this.mdf.module.name.lowerSingular;

    // Controllers
    var controllersDir = '../controllers/' + this.mdf.module.path + '/',
        ctrlFilename = this.mdf.project.express.controllers.filename;

    var createController  = controllersDir + ctrlFilename.create,
        readOneController = controllersDir + ctrlFilename.readOne,
        readAllController = controllersDir + ctrlFilename.readAll,
        updateController  = controllersDir + ctrlFilename.update,
        deleteController  = controllersDir + ctrlFilename.delete,
        getItemController = controllersDir + ctrlFilename.getItem;

    // Get Item
    if (this.mdf.module.express.readOne.use ||
        this.mdf.module.express.update.use ||
        this.mdf.module.express.delete.use) {

        var modelId = this.mdf.module.model.id;

        routes = routes.concat([
            '    // Get the ' + modelId + ' param',
            '    app.param(\'' + modelId + '\',',
            '        require(\'' + getItemController + '\').getItem',
            '    );',
            ''
        ]);
    }

    // Create
    if (this.mdf.module.express.create.use) {
        var createUrl = this.mdf.module.express.create.url,
            createCtrl = 'create' + moduleNameUs;

        routes = routes.concat([
            '    // Create ' + moduleNameUs,
            '    var ' + createCtrl + ' = require(\'' + createController + '\');',
            '    app.get(\'' + createUrl + '\',',
            '        csrf.token,',
            '        ' + createCtrl + '.render',
            '    );',
            '    app.post(\'' + createUrl + '\',',
            '        ' + createCtrl + '.create',
            '    );',
            ''
        ]);
    }

    // Read All
    if (this.mdf.module.express.readAll.use) {
        var readAllUrl = this.mdf.module.express.readAll.url,
            readAllCtrl = 'readAll' + moduleNameUp;

        routes = routes.concat([
            '    // Read All ' + moduleNameUp,
            '    var ' + readAllCtrl + '= require(\'' + readAllController + '\');',
            '    app.get(\'' + readAllUrl + '\',',
            '        ' + readAllCtrl + '.render',
            '    );',
            ''
        ]);
    }

    // Read One
    if (this.mdf.module.express.readOne.use) {
        var readOneUrl = this.mdf.module.express.readOne.url,
            readOneCtrl = 'readOne' + moduleNameUs;

        routes = routes.concat([
            '    // Read One ' + moduleNameUs,
            '    var ' + readOneCtrl + ' = require(\'' + readOneController + '\');',
            '    app.get(\'' + readOneUrl + '\',',
            '        ' + readOneCtrl + '.render',
            '    );',
            ''
        ]);
    }

    // Update
    if (this.mdf.module.express.update.use) {
        var updateUrl = this.mdf.module.express.update.url,
            updateCtrl = 'update' + moduleNameUs;

        routes = routes.concat([
            '    // Update ' + moduleNameUs,
            '    var ' + updateCtrl + ' = require(\'' + updateController + '\');',
            '    app.get(\'' + updateUrl + '\',',
            '        ' + updateCtrl + '.render',
            '    );',
            '    app.post(\'' + updateUrl + '\',',
            '        ' + updateCtrl + '.update',
            '    );',
            ''
        ]);
    }

    // Delete
    if (this.mdf.module.express.delete.use) {
        var deleteUrl = this.mdf.module.express.delete.url,
            deleteCtrl = 'delete' + moduleNameUs;

        routes = routes.concat([
            '    // Delete ' + moduleNameUs,
            '    var ' + deleteCtrl + ' = require(\'' + deleteController + '\');',
            '    app.post(\'' + deleteUrl + '\',',
            '        ' + deleteCtrl + '.remove',
            '    );',
            ''
        ]);
    }

    // Inject the routes into the module's router
    _eInject({
        targetFile: this.router,
        needle: '};',
        splicable: routes,
        appendComma: false
    });
    console.log(chalk.green('injected routes: '), this.router);
};

/** Cleanup downloadDir */
expressRouterGenerator.prototype.cleanupDownloadDir = _eCleanup;
