// # Project MDF
// Project-level Module Definition Format (MDF) that contains the project
// settings. This file is included in all Application-level MDF files and all
// Module-level MDF files. There must be one and only one Project MDF per
// project.
'use strict';

module.exports = function() {
    /* The mdf object is structured as follows:
    javascript
    var mdf = {
        project: {
            name: {string},
            description: {string},
            repo: {string},
            author: {string},
            company: {string},
            google: {
                trackingId: {string},
                website: {string}
            },
            tabSize: {Integer},
            generateComments: {Boolean},
            express: {
                controllers = {
                    filename: {
                        create: 'create-ctrl',
                        readOne: 'read-one-ctrl',
                        readAll: 'read-all-ctrl',
                        update: 'update-ctrl'
                    },
                    objectNamePostfix: {
                        create: 'CreateCtrl',
                        readOne: 'ReadOneCtrl',
                        readAll: 'ReadAllCtrl',
                        update: 'UpdateCtrl'
                    },
                    extension: 'js'
                },
                views = {
                    filename: {
                        create: 'create-ctrl',
                        readOne: 'read-one-ctrl',
                        readAll: 'read-all-ctrl',
                        update: 'update-ctrl'
                    },
                    extension: 'hbs'
                }
            },
            api:
                controllers = {
                    filename: {
                        create: 'create-api-ctrl',
                        readOne: 'read-one-api-ctrl',
                        readAll: 'read-all-api-ctrl',
                        update: 'update-api-ctrl'
                    },
                    objectNamePostfix: {
                        create: 'CreateApiCtrl',
                        readOne: 'ReadOneApiCtrl',
                        readAll: 'ReadAllApiCtrl',
                        update: 'UpdateApiCtrl'
                    },
                    extension: 'js'
                },
                routers = {
                    filenamePostfix: '-api',
                    extension: 'js'
                }
            },
            angular: {
                controllers = {
                    filename: {
                        create: 'create-ctrl',
                        readOne: 'read-one-ctrl',
                        readAll: 'read-all-ctrl',
                        update: 'update-ctrl'
                    },
                    objectNamePostfix: {
                        create: 'CreateCtrl',
                        readOne: 'ReadOneCtrl',
                        readAll: 'ReadAllCtrl',
                        update: 'UpdateCtrl'
                    },
                    extension: 'js'
                },
                views = {
                    filename: {
                        create: 'create-ctrl',
                        readOne: 'read-one-ctrl',
                        readAll: 'read-all-ctrl',
                        update: 'update-ctrl'
                    },
                    extension: 'html'
                }
            },
            accounts: {
                facebook: false,
                github: false,
                google: false,
                oauth: false,
                password: true,
                twitter: false
            }
        },
        app: {Object},
        module: {Object},
    };
     */

    // ## mdf
    // Namespace for all Module Definition File (MDF) settings including
    // project, app(s) and module(s).
    var mdf = {
        project: {},
        app: {},
        module: {}
    };

    // mdf.project.name
    // ----------------
    // Project name
    mdf.project.name = 'Exponential';

    // ## mdf.project.directoryName
    // Name of the project's directory.
    mdf.project.directoryName = mdf.project.name.toLowerCase();

    // ## mdf.project.description
    // Description of your project that is included in the project's
    // package.json file.
    mdf.project.description = 'Basic Exponential app';

    // ## mdf.project.repo
    // URL to the project's repo on Github.
    mdf.project.repo = 'http://github.com/pathToYourRepo.git';

    // ## mdf.project.author
    // Name of the person or company who is generating this module's code
    mdf.project.author = 'Akbar S. Ahmed';

    // ## mdf.project.company
    // The name of your company
    mdf.project.company = 'Exponential.io';

    // ## mdf.project.copyright
    // Copyright string to display in source code and at the bottom of pages
    mdf.project.copyright = 'Copyright &copy; 2014 ' + mdf.project.company + ' All rights reserved.';

    // mdf.project.website
    // Website name
    mdf.project.website = 'Exponential.io';

    // ## mdf.project.adminEmail
    // Email of the website admin
    mdf.project.adminEmail = 'feedback@exponential.io';

    mdf.project.google = {};

    // ## mdf.project.google.trackingId
    // Google Analytics Tracking Id
    mdf.project.google.trackingId = 'UA-47311952-1';

    // ## mdf.project.google.website
    // Google Analytics website
    mdf.project.google.website = 'exponential.io';

    // ## mdf.project.tabSize
    // Set a default number of spaces per tab. The most common values are 2 and
    // 4.
    mdf.project.tabSize = 4;

    // ## mdf.project.generateComments
    // If true, include comments in generated source code.
    mdf.project.generateComments = true;

    // ## mdf.project.express
    // Namespace for default Express settings.
    mdf.project.express = {};

    // ## 
    //
    mdf.project.express.controllers = {
        filename: {
            create: 'create-ctrl',
            readOne: 'read-one-ctrl',
            readAll: 'read-all-ctrl',
            update: 'update-ctrl'
        },
        objectNamePostfix: {
            create: 'CreateCtrl',
            readOne: 'ReadOneCtrl',
            readAll: 'ReadAllCtrl',
            update: 'UpdateCtrl'
        },
        extension: 'js'
    };

    // ## 
    //
    mdf.project.express.views = {
        filename: {
            create: 'create-ctrl',
            readOne: 'read-one-ctrl',
            readAll: 'read-all-ctrl',
            update: 'update-ctrl'
        },
        extension: 'hbs'
    };

    // ## mdf.project.api
    // Namespace for default API settings.
    mdf.project.api = {};

    // ## 
    //
    mdf.project.api.controllers = {
        filename: {
            create: 'create-api-ctrl',
            readOne: 'read-one-api-ctrl',
            readAll: 'read-all-api-ctrl',
            update: 'update-api-ctrl'
        },
        objectNamePostfix: {
            create: 'CreateApiCtrl',
            readOne: 'ReadOneApiCtrl',
            readAll: 'ReadAllApiCtrl',
            update: 'UpdateApiCtrl'
        },
        extension: 'js'
    };

    // ## 
    //
    mdf.project.api.routers = {};

    // ## 
    //
    mdf.project.api.routers = {
        filenamePostfix: '-api',
        extension: 'js'
    };

    // ## mdf.project.angular
    // Namespace for default Angular settings.
    mdf.project.angular = {};

    // ## 
    //
    mdf.project.angular.controllers = {
        // ### filename
        // File names for Angular controllers.
        filename: {
            create: 'create-ctrl',
            readOne: 'read-one-ctrl',
            readAll: 'read-all-ctrl',
            update: 'update-ctrl'
        },
        // ### objectNamePostfix
        // Text to append to each Angular Controller object which is referenced
        // in Angular source.
        objectNamePostfix: {
            create: 'CreateCtrl',
            readOne: 'ReadOneCtrl',
            readAll: 'ReadAllCtrl',
            update: 'UpdateCtrl'
        },
        extension: 'js'
    };

    // ## mdf.project.angular.views
    //
    mdf.project.angular.views = {
        // ### mdf.project.angular.views.filename
        // File names for Angular views.
        filename: {
            create: 'create-ctrl',
            readOne: 'read-one-ctrl',
            readAll: 'read-all-ctrl',
            update: 'update-ctrl'
        },
        // ### mdf.project.angular.views.extension
        // File name extension for Angular views.
        extension: 'html'
    };

    /**
     * Namespace for account (Passport) configuration.
     * @type {Object}
     */
    mdf.project.accounts = {};

    /**
     * Enable Facebook authentication in Passport.
     * @type {boolean}
     */
    mdf.project.accounts.facebook = true;
    /**
     * Enable GitHub authentication in Passport.
     * @type {boolean}
     */
    mdf.project.accounts.github = false;
    /**
     * Enable Google authentication in Passport.
     * @type {boolean}
     */
    mdf.project.accounts.google = false;
    /**
     * Enable OAuth authentication in Passport.
     * @type {boolean}
     */
    mdf.project.accounts.oauth = false;
    /**
     * Enable Password authentication in Passport.
     * @type {boolean}
     */
    mdf.project.accounts.password = true;
    /**
     * Enable Twitter authentication in Passport.
     * @type {boolean}
     */
    mdf.project.accounts.twitter = false;

    // Return the mdf.project object so that these settings can be used in an
    // App MDF or Module MDF.
    return mdf.project;
};
