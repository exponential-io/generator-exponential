'use strict';

/**
 * Create an Angular service.
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


var AngularServiceGenerator = module.exports = function AngularServiceGenerator() {
    _eGeneratorBase.apply(this, arguments);
    _eLoadMdf.apply(this, [{
        project: false,
        app: false,
        module: true
    }]);
};

util.inherits(AngularServiceGenerator, _eGeneratorBase);

/**
 * Create the Angular files - Service
 */
AngularServiceGenerator.prototype.angularServiceFiles = function angularServiceFiles() {
    // Generator template base directory
    var genBase = _eDir.generator.templates;

    // Directory of the template used by the application defined in the MDF
    var genTemplate      = genBase + this.mdf.module.angular.template + '/',
        genAngularModule = genTemplate + 'angular/',
        genJs            = genAngularModule + 'js/',
        genServices      = genJs + 'services/';

    // Relative project paths
    var projectAngularApp    = 'client/' + this.mdf.app.name.lowerPlural + '/',
        projectJs            = projectAngularApp + 'js/',
        projectServices      = projectJs + 'services/',
        moduleServices       = projectServices + this.mdf.module.name.lowerPlural + '/';

    // Services
    this.template(genServices + 'services-srv.js', moduleServices + this.mdf.module.name.lowerPlural + '-srv.js');

    /*
        Insert references to each router in the index.html file.

        The 'js/' prefix to each path and the '.js' file extension are
        automatically added by the inject method.
     */

    var servicesJsDir = 'services/' + this.mdf.module.name.lowerPlural + '/';
    var jsFiles = [
        servicesJsDir + this.mdf.module.name.lowerPlural + '-srv'
    ];

    var indexHtml = _eDir.project.client + this.mdf.app.name.lowerPlural + '/index.html';

    jsFiles.forEach(function(jsFile) {
        _eInject({
            targetFile: indexHtml,
            needle: '<!-- endbuild -->',
            splicable: [
                '<script type="text/javascript" src="js/' + jsFile.replace('\\', '/') + '.js"></script>'
            ],
            appendComma: false
        });
    });
};
