/**
 * Inject one or more Express API routes.
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


var apiRouterGenerator = module.exports = function apiRouterGenerator() {
    _eGeneratorBase.apply(this, arguments);
    _eLoadMdf.apply(this, [{
        project: false,
        app: false,
        module: true
    }]);
    _eConfig.apply(this);
};

util.inherits(apiRouterGenerator, _eGeneratorBase);

// Pre-cleanup downloadDir
apiRouterGenerator.prototype.preCleanup = _eCleanup;

/** Download the source files */
apiRouterGenerator.prototype.generateSrc = function generateSrc() {
    _eDownloadSource.apply(this, [{
        _eMkDirs: _eMkDirs,
        generator: 'apiRouter'
    }]);
};

apiRouterGenerator.prototype.copyRouter = function copyRouter() {
    // Markdown for page header comment
    this.h1Header = this.mdf.module.name.upperPlural + ' API Router';
    this.h1Md = new Array((this.h1Header + 1).length).join('=');

    var genRouter = __dirname + '/../templates/' +
                    this.mdf.module.express.template +
                    '/express/routers/router.js';

    // API Router extension: default = '-api.js'
    var ext = this.mdf.project.api.routers.filenamePostfix +
              '.' + this.mdf.project.api.routers.extension;

    this.router = 'server/routers/' + this.mdf.module.name.lowerPlural + ext;

    this.template(genRouter, this.router, this);
};

/** Router */
apiRouterGenerator.prototype.injectRouter = function injectRouter() {
    var url = '',
        controller = '',
        router = '',
        routes = [],
        moduleNameUp = this.mdf.module.name.upperPlural,
        moduleNameUs = this.mdf.module.name.upperSingular;
//        moduleNameLs = this.mdf.module.name.lowerSingular;

    // Controllers
    var controllersDir = '../controllers/' + this.mdf.module.path + '/',
        ctrlFilename = this.mdf.project.api.controllers.filename;

    var createController  = controllersDir + ctrlFilename.create,
        readOneController = controllersDir + ctrlFilename.readOne,
        readAllController = controllersDir + ctrlFilename.readAll,
        updateController  = controllersDir + ctrlFilename.update,
        deleteController  = controllersDir + ctrlFilename.delete;
//        getItemController = controllersDir + ctrlFilename.getItem;

    /*
        I removed Get Item because it's not a good solution when the req.param
        is the id. When the id is passed then we know exactly which object to
        query from the DB, so therefore using a generic select like Get Item
        results in excessive fields being queried for 3 of the 4 use cases:
        read one, update render, and delete.

        However, Get Item is useful for situations where the req.param is a
        non-id, such as slug. When a slug is passed then Get Item should be used
        to query the _id that matches the slug (and ONLY THE ID). Then other
        controllers can work with the req.item.id (where item may be company,
        person or something else).
     */
//    // Get Item
//    if (this.mdf.module.express.readOne.use ||
//        this.mdf.module.express.update.use ||
//        this.mdf.module.express.delete.use) {
//
//        var modelId = this.mdf.module.model.id;
//
//        routes = routes.concat([
//            '    // Get the ' + modelId + ' param',
//            '    app.param(\'' + modelId + '\',',
//            '        require(\'' + getItemController + '\').getItem',
//            '    );',
//            ''
//        ]);
//    }

    // Create API
    if (this.mdf.module.api.create.use) {
        var createRoute = this.mdf.module.api.create.route,
            createCtrl = 'create' + moduleNameUs + 'Api';

        routes = routes.concat([
            '    // Create ' + moduleNameUs + ' API',
            '    var ' + createCtrl + ' = require(\'' + createController + '\');',
            '    app.post(\'' + createRoute + '\',',
            '        auth.requiresLogin,',
            '        ' + createCtrl + '.create',
            '    );',
            ''
        ]);
    }

    // Read All API
    if (this.mdf.module.api.readAll.use) {
        var readAllRoute = this.mdf.module.api.readAll.route,
            readAllCtrl = 'readAll' + moduleNameUp + 'Api';

        routes = routes.concat([
            '    // Read All ' + moduleNameUp + ' API',
            '    var ' + readAllCtrl + '= require(\'' + readAllController + '\');',
            '    app.get(\'' + readAllRoute + '\',',
            '        ' + readAllCtrl + '.render',
            '    );',
            ''
        ]);
    }

    // Read One API
    if (this.mdf.module.api.readOne.use) {
        var readOneRoute = this.mdf.module.api.readOne.route,
            readOneCtrl = 'readOne' + moduleNameUs + 'Api';

        routes = routes.concat([
            '    // Read One ' + moduleNameUs + ' API',
            '    var ' + readOneCtrl + ' = require(\'' + readOneController + '\');',
            '    app.get(\'' + readOneRoute + '\',',
            '        ' + readOneCtrl + '.render',
            '    );',
            ''
        ]);
    }

    // Update API
    if (this.mdf.module.api.update.use) {
        var updateRoute = this.mdf.module.api.update.route,
            updateCtrl = 'update' + moduleNameUs + 'Api';

        routes = routes.concat([
            '    // Update ' + moduleNameUs + ' API',
            '    var ' + updateCtrl + ' = require(\'' + updateController + '\');',
            '    app.put(\'' + updateRoute + '\',',
            '        ' + updateCtrl + '.update',
            '    );',
            ''
        ]);
    }

    // Delete API
    if (this.mdf.module.api.delete.use) {
        var deleteRoute = this.mdf.module.api.delete.route,
            deleteCtrl = 'delete' + moduleNameUs + 'Api';

        routes = routes.concat([
            '    // Delete ' + moduleNameUs + ' API',
            '    var ' + deleteCtrl + ' = require(\'' + deleteController + '\');',
            '    app.delete(\'' + deleteRoute + '\',',
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
apiRouterGenerator.prototype.cleanupDownloadDir = _eCleanup;
