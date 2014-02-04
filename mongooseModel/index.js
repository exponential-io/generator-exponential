/**
 * Create a Mongoose model.
 *
 * @copyright Copyright 2014 Exponential.io. All rights reserved.
 * @author Akbar S. Ahmed <akbar@exponential.io>
 */
'use strict';


var util            = require('util'),
    _eGeneratorBase = require('../util/generator-base'),
    _eLoadMdf       = require('../util/load-mdf'),
    rimraf           = require('rimraf'),
    _eMkDirs         = require('../util/mkdir'),
    _eDownloadSource = require('../util/download-source'),
    _eConfig         = require('../util/config');


var mongooseModelGenerator = module.exports = function mongooseModelGenerator() {
    _eGeneratorBase.apply(this, arguments);
    _eLoadMdf.apply(this, [{
        project: false,
        app: false,
        module: true
    }]);
    _eConfig.apply(this);
};

util.inherits(mongooseModelGenerator, _eGeneratorBase);

/** Download the source files */
mongooseModelGenerator.prototype.generateSrc = function generateSrc() {
    _eDownloadSource.apply(this, [{
        _eMkDirs: _eMkDirs,
        generator: 'mongooseModel'
    }]);
};

/** Create the directory structure */
mongooseModelGenerator.prototype.createDirs = function createDirs() {
    // TODO: CREATE A DIRECTORY STRUCTURE FOR TESTS ONE THE MONGOOSE MODEL
    //var _apiTest = 'test/api/' + this.mdf.module.name.lowerPlural + '-api';
    //this.mkdir('test/express/models/');
};

/** Create the Mongoose model */
mongooseModelGenerator.prototype.createModel = function createModel() {
    var modelNameLs = this.mdf.module.model.name.lowerSingular;

    var genModel = [
        this._eDir.download.src, 'server/models/', modelNameLs + '.js'
    ].join('');

    var projectModel = [
        this._eDir.project.server, 'models/', modelNameLs + '.js'
    ].join('');

    this.copy(genModel, projectModel);
};

/** Cleanup downloadDir */
mongooseModelGenerator.prototype.cleanupDownloadDir = function cleanupDownloadDir() {
    rimraf(this._eDir.download.root, function(err) {
        if (err) {
            console.log(err);
        }
    });
};
