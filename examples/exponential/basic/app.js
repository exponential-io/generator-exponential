/**
 * Basic Module Definition Format (MDF). Do not confuse an Exponential module
 * with a Node module. An Exponential module refers to a modular feature within
 * your application, while a Node module refers to a chunk of code that has its
 * own scope.
 *
 * An MDF file is comprised of several sections:
 * - project: Information about the overall project, including the package name
 * - app: Information about an individual application, such as app name
 * - module: Module specific information
 *
 * @module mdf/examples/basic/app
 */
module.exports = function(_) {
    /**
     * Module Definition Format (ADF) is an object that contains all
     * app and/or module configuration.
     * @type {Object}
     */
    var mdf = {
        project: {},
        app: {},
        module: {}
    };

    mdf.project = _.extend({
        name: 'Exponential',
        description: 'Basic Exponential app',
        repo: 'http://github.com/pathToYourRepo.git',
        author: 'Your name goes here'
    });

    return mdf;
};

