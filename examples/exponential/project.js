'use strict';

/**
 * Project-level Module Definition Format (MDF) that contains the project
 * settings. This file is included in all Application-level MDF files and all
 * Module-level MDF files. There must be one and only one Project MDF per
 * project.
 *
 * @module exponential/project
 */
module.exports = function() {
    /*
     * Module Definition Format (MDF) is an object that contains all
     * app and/or module configuration. Use this object to define the entire mdf
     * object structure and to define default values.
     *
     * @type {Object}
     */
    var mdf = {
        /**
         * Project configuration
         * @type {Object}
         */
        project: {
            name: '',
            description: '',
            repo: '',
            author: '',
            company: '',
            google: {
                trackingId: '',
                website: ''
            }
        },
        app: {},
        module: {}
    };

    /**
     * Project name is also the name of the directory that contains all of apps
     * and modules related to this project.
     *
     * @type {string}
     */
    mdf.project.name = 'Exponential';

    /**
     * Project description
     * @type {string}
     */
    mdf.project.description = 'Basic Exponential app';

    /**
     * URL to the project's repo on Github.
     * @type {string}
     */
    mdf.project.repo = 'http://github.com/pathToYourRepo.git';

    /**
     * Name of the person or company who owns the project.
     * @type {string}
     */
    mdf.project.author = 'Akbar S. Ahmed';

    mdf.project.company = 'Exponential.io';

    mdf.project.copyright = 'Copyright &copy; 2014 ' + mdf.project.company + ' All rights reserved.';

    mdf.project.website = 'Exponential.io';

    mdf.project.adminEmail = 'feedback@exponential.io';

    /**
     * Google Analytics Tracking Id
     * @type {string}
     */
    mdf.project.google.trackingId = 'UA-47311952-1';

    /**
     * Google Analytics website
     * @type {string}
     */
    mdf.project.google.website = 'exponential.io';

    return mdf.project;
};
