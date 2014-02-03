'use strict';

/**
 * Create an Exponential API. APIs are created using a single generator as each
 * API is a combination of an application + module. Therefore, the application
 * and module generators are combined into a single generator (this one).
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
    _eSchema        = require('../util/mongoose-schema'),
    _eIndexes       = require('../util/mongoose-schema/indexes'),
    _eGeneratorBase = require('../util/generator-base'),
    _eLoadMdf       = require('../util/load-mdf'),
    _eMkDirs        = require('../util/mkdir'),
    _eReadAllCols   = require('../util/schema-read-all-columns'),
    _eReadOneCols   = require('../util/schema-read-one-columns');


var apiGenerator = module.exports = function apiGenerator() {
    _eGeneratorBase.apply(this, arguments);
    _eLoadMdf.apply(this, [{
        project: false,
        app: false,
        module: true
    }]);
};

util.inherits(apiGenerator, _eGeneratorBase);

/**
 * Create the API application directory structure
 */
apiGenerator.prototype.apiDirs = function apiDirs() {
    _eMkDirs.apply(this, [[
        'test/api/' + this.mdf.module.name.lowerPlural + '-api'
    ]]);
};

/**
 * Create the API application files
 */
apiGenerator.prototype.apiModuleFiles = function apiModuleFiles() {
    var _items = this.mdf.module.name.lowerPlural,
        _item  = this.mdf.module.name.lowerSingular;

    // Generator template base directory
    var genBase = _eDir.generator.templates;

    // Directory of the template used by the application defined in the MDF
    var genTemplate    = genBase     + this.mdf.module.api.template + '/',
        genApi         = genTemplate + 'api/',
        genControllers = genApi      + 'controllers/',
        genModels      = genApi      + 'models/',
        genRouters     = genApi      + 'routers/';

    // Relative project paths
    var projectControllers = 'server/controllers/',
        projectModels      = 'server/models/',
        projectRouters     = 'server/routers/';

    // Controllers

    this.readOneColumns = _eReadOneCols(this.mdf.module.schema.fields);
    this.readAllColumns = _eReadAllCols(this.mdf.module.schema.fields);

    this.modelInstance = this.mdf.module.model.name.lowerSingular;
    this.modelClass = this.mdf.module.model.name.upperSingular;
    this.template(genControllers + 'controller-api.js', projectControllers + _items + '-api.js');

    // Models
    this.schema = _eSchema(this.mdf.module.schema.fields);
    this.indexes = _eIndexes(this.mdf.module.schema);
    this.template(genModels + 'model-api.js', projectModels + _item + '.js');

    // Routers
    this.template(genRouters + 'router-api.js', projectRouters + _items + '-api.js');
};