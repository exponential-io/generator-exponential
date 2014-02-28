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
    // Do NOT edit these values.
    var mdf = {
        project: {},
        app: {},
        module: {}
    };

    // Project name
    mdf.project.name = 'Exponential';

    // Description of your project that is included in the project's
    // package.json file.
    mdf.project.description = 'Basic Exponential app';

    // Name of the project's directory.
    mdf.project.directoryName = mdf.project.name.toLowerCase();

    // URL to the project's repo on Github.
    mdf.project.repo = 'http://github.com/pathToYourRepo.git';

    // Name of the person or company who is generating this module's code
    mdf.project.author = 'Akbar S. Ahmed';

    // The name of your company
    mdf.project.company = 'Exponential.io';

    // Copyright string to display in source code and at the bottom of pages
    mdf.project.copyright = 'Copyright &copy; 2014 ' + mdf.project.company + ' All rights reserved.';

    // Website name
    mdf.project.website = 'Exponential.io';

    // Email of the website admin
    mdf.project.adminEmail = 'feedback@exponential.io';

    // Namespace for Google Analytics settings.
    // Do NOT edit this value.
    mdf.project.google = {};

    // Google Analytics Tracking Id (ex: UA-XXXXX-XX)
    mdf.project.google.trackingId = '';

    // Google Analytics website (ex: exponential.io)
    mdf.project.google.website = '';

    // Set a default number of spaces per tab. The most common values are 2 and
    // 4.
    mdf.project.tabSize = 4;

    // If true, include comments in generated source code.
    mdf.project.generateComments = true;

    // Namespace for default Express settings.
    // Do NOT edit this value.
    mdf.project.express = {};

    // objectNamePostfix is used in the controller's code. For example, if the
    // modules === companies, then we'd combine objectNamePostfix with the
    // module name to get companyCreateCtrl.
    mdf.project.express.controllers = {
        filename: {
            create: 'create',
            readOne: 'read-one',
            readAll: 'read-all',
            update: 'update',
            delete: 'delete',
            getItem: 'get-item'
        },
        objectNamePostfix: {
            create: 'CreateCtrl',
            readOne: 'ReadOneCtrl',
            readAll: 'ReadAllCtrl',
            update: 'UpdateCtrl',
            delete: 'DeleteCtrl'
        },
        extension: 'js'
    };

    //
    mdf.project.express.views = {
        filename: {
            create: 'create',
            readOne: 'read-one',
            readAll: 'read-all',
            update: 'update'
        },
        extension: 'hbs'
    };

    // Namespace for default API settings.
    // Do NOT edit this value.
    mdf.project.api = {};

    //
    mdf.project.api.controllers = {
        filename: {
            create: 'create-api-ctrl',
            readOne: 'read-one-api-ctrl',
            readAll: 'read-all-api-ctrl',
            update: 'update-api-ctrl',
            delete: 'delete-api-ctrl',
            getItem: 'get-item-api-ctrl'
        },
        objectNamePostfix: {
            create: 'CreateApiCtrl',
            readOne: 'ReadOneApiCtrl',
            readAll: 'ReadAllApiCtrl',
            update: 'UpdateApiCtrl',
            delete: 'DeleteApiCtrl'
        },
        extension: 'js'
    };

    // Namespace for API router settings.
    // Do NOT edit this value.
    mdf.project.api.routers = {};

    //
    mdf.project.api.routers = {
        filenamePostfix: '-api',
        extension: 'js'
    };

    // Namespace for default Angular settings.
    // Do NOT edit this value.
    mdf.project.angular = {
        module: {},
        service: {},
        router: {}
    };

    mdf.project.angular.module.postfix = 'Mod';
    mdf.project.angular.service = {
        filename: '-srv',
        postfix: 'Srv',
        extension: 'js'
    };
    mdf.project.angular.router.extension = 'js';

    //
    mdf.project.angular.controllers = {
        // ### filename
        // File names for Angular controllers.
        filename: {
            create: 'create-ctrl',
            readOne: 'read-one-ctrl',
            readAll: 'read-all-ctrl',
            update: 'update-ctrl',
            remove: 'remove-ctrl'
        },
        // ### objectNamePostfix
        // Text to append to each Angular Controller object which is referenced
        // in Angular source.
        postfix: {
            create: 'CreateCtrl',
            readOne: 'ReadOneCtrl',
            readAll: 'ReadAllCtrl',
            update: 'UpdateCtrl',
            remove: 'RemoveCtrl'
        },
        extension: 'js'
    };

    //
    mdf.project.angular.views = {
        // ### mdf.project.angular.views.filename
        // File names for Angular views.
        filename: {
            create: 'create',
            readOne: 'read-one',
            readAll: 'read-all',
            update: 'update'
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
