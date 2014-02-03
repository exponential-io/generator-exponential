'use strict';

/**
 * Create a server-side Express view.
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
    _eCreateHtml    = require('../util/express/views/create'),
    _eReadAllHtml   = require('../util/express/views/read-all'),
    _eReadOneHtml   = require('../util/express/views/read-one'),
    _eGeneratorBase = require('../util/generator-base'),
    _eLoadMdf       = require('../util/load-mdf');


var expressViewGenerator = module.exports = function expressViewGenerator() {
    _eGeneratorBase.apply(this, arguments);
    _eLoadMdf.apply(this, [{
        project: false,
        app: false,
        module: true
    }]);
};

util.inherits(expressViewGenerator, _eGeneratorBase);

/** Create the directory structure */
expressViewGenerator.prototype.createDirs = function createDirs() {
    // TODO: CREATE A DIRECTORY STRUCTURE FOR TESTS ONE THE MONGOOSE MODEL
    //var _apiTest = 'test/api/' + this.mdf.module.name.lowerPlural + '-api';
    //this.mkdir('test/express/models/');
};

/** Create the Express controller(s) */
expressViewGenerator.prototype.createController = function createController() {
    // {{template}} is set in the mdf
    //
    // {{type}} is set in the generator
    // type = [ angular, express ]
    //
    // Directory structure patter
    // templates/{{template}}/{{type}}/[controllers, models, views, etc.]

    // Express views templates (source)
    var genViewsDir = this._eDir.generator.templates + this.mdf.module.express.template + '/express/views/';

    // Express view templates (source)
    var genCreateView  = genViewsDir + 'create.hbs',
        genReadAllView = genViewsDir + 'read-all.hbs',
        genReadOneView = genViewsDir + 'read-one.hbs',
        genUpdateView  = genViewsDir + 'update.hbs';

    // Shortcuts to the MDF view definitions
    var mdfCreateView  = this.mdf.module.express.create.view,
        mdfReadAllView = this.mdf.module.express.readAll.view,
        mdfReadOneView = this.mdf.module.express.readOne.view,
        mdfUpdateView  = this.mdf.module.express.update.view;

    var projectViewPrefix  = 'server/views/';

    if (this.mdf.module.express.create.use) {
        var projectCreateView = projectViewPrefix + mdfCreateView.path + '/' + mdfCreateView.filename + mdfCreateView.extension;
        this.createHtml = _eCreateHtml(this.mdf.module.name, this.mdf.module.schema.fields);

        this.template(genCreateView, projectCreateView, this);
    }

    if (this.mdf.module.express.readAll.use) {
        var projectReadAllView = projectViewPrefix + mdfReadAllView.path + '/' + mdfReadAllView.filename + mdfReadAllView.extension;

        this.template(genReadAllView, projectReadAllView, this);
    }

    if (this.mdf.module.express.readOne.use) {
        var projectReadOneView = projectViewPrefix + mdfReadOneView.path + '/' + mdfReadOneView.filename + mdfReadOneView.extension;

        this.template(genReadOneView, projectReadOneView, this);
    }

    if (this.mdf.module.express.update.use) {
        var projectUpdateView = projectViewPrefix + mdfUpdateView.path + '/' + mdfUpdateView.filename + mdfUpdateView.extension;

        this.template(genUpdateView, projectUpdateView, this);
    }
};