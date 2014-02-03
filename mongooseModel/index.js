'use strict';

/**
 * Create a Mongoose model.
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
    _eLoadMdf       = require('../util/load-mdf');


var mongooseModelGenerator = module.exports = function mongooseModelGenerator() {
    _eGeneratorBase.apply(this, arguments);
    _eLoadMdf.apply(this, [{
        project: false,
        app: false,
        module: true
    }]);
};

util.inherits(mongooseModelGenerator, _eGeneratorBase);

/** Create the directory structure */
mongooseModelGenerator.prototype.createDirs = function createDirs() {
    // TODO: CREATE A DIRECTORY STRUCTURE FOR TESTS ONE THE MONGOOSE MODEL
    //var _apiTest = 'test/api/' + this.mdf.module.name.lowerPlural + '-api';
    //this.mkdir('test/express/models/');
};

/** Create the Mongoose model */
mongooseModelGenerator.prototype.createModel = function createModel() {
    // Mongoose model template (source)
    var genModel = this._eDir.generator.templates + 'mongoose/model.js';

    // Project model (target)
    var projectModel = 'server/models/' + this.mdf.module.model.name.lowerSingular + '.js';

    // Generate the schema and index source code, then pass it into the model
    // template
    this.schema = _eSchema(this.mdf.module.schema.fields);
    this.indexes = _eIndexes(this.mdf.module.schema);
    this.template(genModel, projectModel, this);
};