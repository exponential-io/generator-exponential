'use strict';

/**
 * Create a server-side Express controller.
 *
 * @copyright Copyright 2013 Exponential.io. All rights reserved.
 * @author Akbar S. Ahmed <akbar@exponential.io>
 */

var util            = require('util'),
    _               = require('lodash'),
    yeoman          = require('yeoman-generator'),
    _eArguments     = require('../util/arguments'),
    _eOptions       = require('../util/options'),
    _eSchema        = require('../util/mongoose-schema'),
    _eIndexes       = require('../util/mongoose-schema/indexes'),
    _eGeneratorBase = require('../util/generator-base'),
    _eLoadMdf       = require('../util/load-mdf'),
    _eReadAllCols   = require('../util/schema-read-all-columns'),
    _eReadOneCols   = require('../util/schema-read-one-columns');


var expressControllerGenerator = module.exports = function expressControllerGenerator() {
    _eGeneratorBase.apply(this, arguments);
    _eLoadMdf.apply(this, [{
        project: false,
        app: false,
        module: true
    }]);
};

util.inherits(expressControllerGenerator, _eGeneratorBase);

/** Create the directory structure */
expressControllerGenerator.prototype.createDirs = function createDirs() {
    // TODO: CREATE A DIRECTORY STRUCTURE FOR TESTS ONE THE MONGOOSE MODEL
    //var _apiTest = 'test/api/' + this.mdf.module.name.lowerPlural + '-api';
    //this.mkdir('test/express/models/');
};

/** Create the Express controller(s) */
expressControllerGenerator.prototype.createController = function createController() {
    // {{template}} is set in the mdf
    //
    // {{type}} is set in the generator
    // type = [ angular, express ]
    //
    // Directory structure patter
    // templates/{{template}}/{{type}}/[controllers, models, views, etc.]

    // Express controller templates (source)
    var genControllersDir = this._eDir.generator.templates + this.mdf.module.express.template + '/express/controllers/';

    var genCreateCtrl  = genControllersDir + 'create.js',
        genReadAllCtrl = genControllersDir + 'read-all.js',
        genReadOneCtrl = genControllersDir + 'read-one.js',
        genUpdateCtrl  = genControllersDir + 'update.js';

    // Shortcuts to the MDF controller definitions
    var mdfCreateCtrl  = this.mdf.module.express.create.controller,
        mdfReadAllCtrl = this.mdf.module.express.readAll.controller,
        mdfReadOneCtrl = this.mdf.module.express.readOne.controller,
        mdfUpdateCtrl  = this.mdf.module.express.update.controller;

    var projectCtrlPrefix  = 'server/controllers/';

    if (this.mdf.module.express.create.use) {
        var projectCreateCtrl = projectCtrlPrefix + mdfCreateCtrl.path + '/' + mdfCreateCtrl.filename + mdfCreateCtrl.extension;

        this.template(genCreateCtrl, projectCreateCtrl, this);
    }

    if (this.mdf.module.express.readAll.use) {
        var projectReadAllCtrl = projectCtrlPrefix + mdfReadAllCtrl.path + '/' + mdfReadAllCtrl.filename + mdfReadAllCtrl.extension;
        this.readAllColumns = _eReadAllCols(this.mdf.module.schema.fields);

        this.template(genReadAllCtrl, projectReadAllCtrl, this);
    }

    if (this.mdf.module.express.readOne.use) {
        var projectReadOneCtrl = projectCtrlPrefix + mdfReadOneCtrl.path + '/' + mdfReadOneCtrl.filename + mdfReadOneCtrl.extension;
        this.readOneColumns = _eReadOneCols(this.mdf.module.schema.fields);

        this.template(genReadOneCtrl, projectReadOneCtrl, this);
    }

    if (this.mdf.module.express.update.use) {
        var projectUpdateCtrl  = projectCtrlPrefix + mdfUpdateCtrl.path  + '/' + mdfUpdateCtrl.filename  + mdfUpdateCtrl.extension;

        this.template(genUpdateCtrl, projectUpdateCtrl, this);
    }
};
