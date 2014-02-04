/**
 * Inject one or more server-side Express routes.
 *
 * @copyright Copyright 2014 Exponential.io. All rights reserved.
 * @author Akbar S. Ahmed <akbar@exponential.io>
 */
'use strict';


var _                = require('lodash'),
    colors          = require('colors'),
    util             = require('util'),
    _eInject         = require('../util/inject'),
    _eGeneratorBase  = require('../util/generator-base'),
    _eLoadMdf        = require('../util/load-mdf'),
    _eMkDirs         = require('../util/mkdir'),
    rimraf           = require('rimraf'),
    _eDownloadSource = require('../util/download-source'),
    _eConfig         = require('../util/config');


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

/** Download the source files */
expressRouterGenerator.prototype.generateSrc = function generateSrc() {
    _eDownloadSource.apply(this, [{
        _eMkDirs: _eMkDirs,
        generator: 'expressRouter'
    }]);
};

/** Router */
expressRouterGenerator.prototype.injectRouter = function injectRouter() {
    var url = '',
        controller = '',
        router = '',
        routes = [],
        moduleNameUs = this.mdf.module.name.upperSingular,
        moduleNameLs = this.mdf.module.name.lowerSingular;

    if (this.mdf.module.express.use) {
        router = 'server/routers/' + this.mdf.app.express.router.filename + '.js';
    }

    if (this.mdf.module.express.create.use) {
        url = this.mdf.module.express.create.url;
        controller = this.mdf.module.express.create.controller.path + '/' + this.mdf.module.express.create.controller.filename;

        routes = [
            '    // ' + moduleNameUs,
            '    var ' + moduleNameLs + ' = require(\'../controllers/' + controller + '\');',
            '    app.get(\'' + url + '\',',
            '        csrf.token,',
            '        ' + moduleNameLs + '.render);',
            '    app.post(\'' + url + '\',',
            '        ' + moduleNameLs + '.create);',
            ''
        ];

        _eInject({
            targetFile: router,
            needle: '};',
            splicable: routes,
            appendComma: false
        });
        console.log('inject route '.green + router);
    }

    if (this.mdf.module.express.readAll.use) {
        url = this.mdf.module.express.readAll.url;
        controller = this.mdf.module.express.readAll.controller.path + '/' + this.mdf.module.express.readAll.controller.filename;

        routes = [
            '    // ' + moduleNameUs + ': read-all',
            '    var ' + moduleNameLs + 'ReadAll = require(\'../controllers/' + controller + '\');',
            '    app.get(\'' + url + '\',',
            '        ' + moduleNameLs + 'ReadAll.render',
            '    );',
            ''
        ];

        _eInject({
            targetFile: router,
            needle: '};',
            splicable: routes,
            appendComma: false
        });
        console.log('inject route '.green + router);
    }

    if (this.mdf.module.express.readOne.use) {
        url = this.mdf.module.express.readOne.url;
        controller = this.mdf.module.express.readOne.controller.path + '/' + this.mdf.module.express.readOne.controller.filename;

        routes = [
            '    // ' + moduleNameUs + ': read-one',
            '    var ' + moduleNameLs + 'ReadOne = require(\'../controllers/' + controller + '\');',
            '    app.get(\'' + url + '\',',
            '        ' + moduleNameLs + 'ReadOne.render',
            '    );',
            ''
        ];

        _eInject({
            targetFile: router,
            needle: '};',
            splicable: routes,
            appendComma: false
        });
        console.log('inject route '.green + router);
    }

    if (this.mdf.module.express.readOne.use || this.mdf.module.express.update.use) {
        var modelId = this.mdf.module.model.id;
        controller = this.mdf.module.express.readOne.controller.path + '/' + this.mdf.module.express.readOne.controller.filename;

        // TODO: getItem needs to be split into it's own file as it is shared by
        //       readOne and update.
        routes = [
            '    // Get the ' + modelId + ' param',
            '    app.param(\'' + modelId + '\',',
            '        require(\'../controllers/' + controller + '\').getItem',
            '    );',
            ''
        ];

        _eInject({
            targetFile: router,
            needle: '};',
            splicable: routes,
            appendComma: false
        });
        console.log('inject route '.green + router);
    }
};

/** Cleanup downloadDir */
expressRouterGenerator.prototype.cleanupDownloadDir = function cleanupDownloadDir() {
    rimraf(this._eDir.download.root, function(err) {
        if (err) {
            console.log(err);
        }
    });
};
