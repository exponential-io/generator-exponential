'use strict';

/**
 * Create absolute paths to all project directories. All paths include a
 * trailing '/' so that the user of this lib does not have to add the '/' to the
 * beginning of every relative path.
 *
 * @file Project directories
 * @module util/directories
 *
 * @returns {Object} Contains the generator and project directory structures.
 */
module.exports = function() {
    // Typically, there is no need to change any of these paths. However, if
    // you do not like the default directory structure, the you can easily
    // change it here.

    /**
     * Root directory of the Exponential generator (i.e. source).
     * @type {string}
     */
    var generatorRoot = __dirname + '/../';

    /**
     * Root directory of the new project (i.e. target).
     * @type {string}
     */
    var projectRoot = process.cwd() + '/';

    /**
     * Root directory of the website definition files. These files are relative
     * to the project root.
     * @type {string}
     */
    var websiteRoot = projectRoot + 'exponential/website/';


    return {
        generator: {
            root        : generatorRoot,
            app         : generatorRoot + 'app/',
            templates   : generatorRoot + 'templates/',
            website     : generatorRoot + 'templates/website/',
            projectSkel : generatorRoot + 'templates/project-skel/'
        },
        project: {
            root        : projectRoot,
            build       : projectRoot + 'build/',
            client      : projectRoot + 'client/',
            docs        : projectRoot + 'docs/',
            exponential : projectRoot + 'exponential/',
            server      : projectRoot + 'server/',
            test        : projectRoot + 'test/'
        },
        download: {
            root        : projectRoot + '.exponential/download/',
            src         : projectRoot + '.exponential/download/src/'
        },
        website: {
            root: websiteRoot,
            client: {
                root: websiteRoot + 'client/',
                images: websiteRoot + 'client/images/',
                styles: websiteRoot + 'client/styles/'
            },
            server: {
                root: websiteRoot + 'server/',
                controllers: websiteRoot + 'server/controllers/',
                models: websiteRoot + 'server/models/',
                views: {
                    root: websiteRoot + 'server/views/',
                    helpers: websiteRoot + 'server/views/helpers/',
                    layouts: websiteRoot + 'server/views/layouts/',
                    partials: websiteRoot + 'server/views/partials/'
                }
            }
        }
    };
};
