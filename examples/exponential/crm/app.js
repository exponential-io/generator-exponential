/**
 * Application-level Module Definition Format (MDF). This file is included in
 * all Module-level MDF files. There can be multiple Application MDF files per
 * Project.
 *
 * However, each application has one and only one Application MDF. For example,
 * a CRM application will have exactly one Application MDF.
 *
 * @module mdf/crm/app
 */
'use strict';

module.exports = function() {
    /**
     * Module Definition Format (MDF) is an object that contains all
     * app and/or module configuration. Use this object to define the entire mdf
     * object structure and to define default values.
     *
     * @type {Object}
     */
    var mdf = {
        project: require('../project')(),
        /**
         * Application configuration
         * @type {Object}
         */
        app: {
            urlBase: '',
            name: {
                upperPlural: '',
                lowerPlural: '',
                upperSingular: '',
                lowerSingular: ''
            },
            express: {
                router: {
                    filename: ''
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
        module: {}
    };

    // TODO: THE ENTIRE URL URLBASE, ETC. NEEDS TO BE CLEANED UP. THIS IS REALLY
    // TODO: A MESS. I'M CONFUSED, SO HOW DO YOU THINK USER'S WILL FEEL ABOUT
    // TODO: THIS?!?!

    mdf.app.relativeUrl = 'crm';
    mdf.app.url = '/' + mdf.app.relativeUrl;          // Calculated Member

    mdf.app.urlBase = '/crm';

    mdf.app.angular = {};
    mdf.app.angular.directory = 'crm';
    mdf.app.angular.baseHref = mdf.app.angular.directory;

    mdf.app.name.upperPlural   = 'CRM';

    /**
     * App name lower plural is used to name the directory that contains the
     * Angular app (ex. /crm/index.html or /projects/index.html).
     *
     * @type {String}
     */
    mdf.app.name.lowerPlural   = mdf.app.name.upperPlural.toLowerCase();

    mdf.app.name.upperSingular = 'CRM';

    mdf.app.name.lowerSingular = mdf.app.name.upperSingular.toLowerCase();

    /**
     * Name of the express router for this app. The express router is named as
     * server/routers/{{filename}}.js. Depending on the app, you can vary this
     * value between singular and plural. For example, the 'website' app will
     * use a singular name of website.js while the 'accounts' app will use a
     * plural name of accounts.js
     * @type {string}
     */
    mdf.app.express.router.filename = mdf.app.name.lowerSingular;

    /**
     * Name of the Angular application
     * @type {String}
     */
    mdf.app.name.angularApp = mdf.app.name.lowerPlural + 'App';

    // Application accounts is an object that allows you to turn various
    // authentication methods on/off.

    /**
     *
     * @type {boolean}
     */
    mdf.app.accounts.facebook = false;
     /**
     *
     * @type {boolean}
     */
    mdf.app.accounts.github = false;
    /**
     *
     * @type {boolean}
     */
    mdf.app.accounts.google = false;
    /**
     *
     * @type {boolean}
     */
    mdf.app.accounts.oauth = false;
    /**
     *
     * @type {boolean}
     */
    mdf.app.accounts.password = true;
    /**
     *
     * @type {boolean}
     */
    mdf.app.accounts.twitter = false;

    return mdf.app;
};
