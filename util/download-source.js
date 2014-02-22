/**
 * Download source generated by the Exponential.io API.
 *
 * @copyright Copyright 2014 Exponential.io. All rights reserved.
 * @author Akbar S. Ahmed <akbar@exponential.io>
 */
'use strict';

var request          = require('request').defaults({ jar: true }),
    extractXsrfToken = require('../util/extract-xsrf-token'),
    fs               = require('fs'),
    Zip              = require('adm-zip');

var logAndExit = function(err) {
    console.log(err);
    process.exit(1);
};

module.exports = function(options) {
    var self = this;
    var cb = this.async();

    // TODO: ===================================================================
    // TODO: PUT THE URL INTO A CENTRALIZED MODULE WITH A CONFIG FILE
    // TODO: PUT THE URL INTO A CENTRALIZED MODULE WITH A CONFIG FILE
    // TODO: ===================================================================

    // cacheBuster is a monotonically increasing date/time stamp that prevents
    // aggressive proxy caching servers from returning stale (cached) responses.
    // We append this value to each URL to get an uncached response, however
    // this value is ignored by the server.
    var cacheBuster = Date.now();

    var host = 'http://localhost:3000',
    //var host = 'http://www.exponential.io',
        prefix = host + '/api/v1/',
        xsrfApi             = prefix + 'xsrf-cookie?c=' + cacheBuster,
        loginApi            = prefix + 'login?c=' + cacheBuster,
        genProjectApi       = prefix + 'exponential/project?c=' + cacheBuster,
        genAngularAppApi    = prefix + 'exponential/angular/app?c=' + cacheBuster,
        genAngularCtrlApi   = prefix + 'exponential/angular/controller?c=' + cacheBuster,
        genAngularModApi    = prefix + 'exponential/angular/module?c=' + cacheBuster,
        genAngularRouterApi = prefix + 'exponential/angular/router?c=' + cacheBuster,
        genAngularSrvApi    = prefix + 'exponential/angular/service?c=' + cacheBuster,
        genAngularViewApi   = prefix + 'exponential/angular/view?c=' + cacheBuster,
        genApiApi           = prefix + 'exponential/api?c=' + cacheBuster,
        genApiRouterApi     = prefix + 'exponential/api/router?c=' + cacheBuster,
        genApiCtrlApi       = prefix + 'exponential/api/controller?c=' + cacheBuster,
        //genExpressAppApi    = prefix + 'exponential/express/app?c=' + cacheBuster,
        genExpressCtrlApi   = prefix + 'exponential/express/controller?c=' + cacheBuster,
        genExpressRouterApi = prefix + 'exponential/express/router?c=' + cacheBuster,
        genExpressNavbarApi = prefix + 'exponential/express/navbar?c=' + cacheBuster,
        genExpressViewApi   = prefix + 'exponential/express/view?c=' + cacheBuster,
        genMongooseModelApi = prefix + 'exponential/mongoose/model?c=' + cacheBuster,
        apiUrl;

    if (options.generator === 'project') {
        apiUrl = genProjectApi;
    } else if (options.generator === 'angularApp') {
        apiUrl = genAngularAppApi;
    } else if (options.generator === 'angularController') {
        apiUrl = genAngularCtrlApi;
    } else if (options.generator === 'angularModule') {
        apiUrl = genAngularModApi;
    } else if (options.generator === 'angularRouter') {
        apiUrl = genAngularRouterApi;
    } else if (options.generator === 'angularService') {
        apiUrl = genAngularSrvApi;
    } else if (options.generator === 'angularView') {
        apiUrl = genAngularViewApi;
    } else if (options.generator === 'api') {
        apiUrl = genApiApi;
//    } else if (options.generator === 'expressApp') {
//        apiUrl = genExpressAppApi;
    } else if (options.generator === 'apiController') {
        apiUrl = genApiCtrlApi;
    } else if (options.generator === 'apiRouter') {
        apiUrl = genApiRouterApi;
    } else if (options.generator === 'expressController') {
        apiUrl = genExpressCtrlApi;
    } else if (options.generator === 'expressRouter') {
        apiUrl = genExpressRouterApi;
    } else if (options.generator === 'expressNavbar') {
        apiUrl = genExpressNavbarApi;
    } else if (options.generator === 'expressView') {
        apiUrl = genExpressViewApi;
    } else if (options.generator === 'mongooseModel') {
        apiUrl = genMongooseModelApi;
    }

    var mdfJson;
    if (options.generator === 'apiRouter' ||
        options.generator === 'expressRouter' ||
        options.generator === 'expressNavbar') {

        mdfJson = {};
    } else {
        mdfJson = this.mdf;
    }

    var tarGzFilename = 'download.zip';

    options._eMkDirs.apply(this, [[
        '.exponential',
        '.exponential/download'
    ]]);

    var xsrfToken = '';

    // Get the XSRF token from the API server
    request.get(xsrfApi, getXsrf);

    function getXsrf(err, resp, body) {
        if(err) {
            logAndExit(err);
        }

        xsrfToken = extractXsrfToken(resp.headers['set-cookie']);

        if(!err && resp.statusCode === 200) {
            // Login

            // About the error
            // When I get a login error both email and password are undefined
            // email undefined | password undefined
            //
            // Solution
            // This is a dirty hack of a solution. There is something odd
            // where a race condition is sometimes causing a null email/password
            // to be sent to the server, which causes the login to fail. This
            // hack simply delays by 1 sec to adjust for the race condition.
            // However, this will be solved before the Exponential.io 1.0
            // release.
            if (typeof self._eEmail === 'undefined' ||
                typeof self._ePassword === 'undefined') {

                setTimeout(function() {
                    console.log('Correcting for known bug that will be fixed');
                    console.log('before the 1.0 release.');

                    var login = request({
                            method: 'POST',
                            url: loginApi,
                            headers: {
                                'x-xsrf-token': xsrfToken
                            },
                            json: {
                                'email': self._eEmail,
                                'password': self._ePassword,
                                'rememberme': true
                            }
                        },
                        verifyLogin
                    );
                }, 1000);
            } else {
                var login = request({
                        method: 'POST',
                        url: loginApi,
                        headers: {
                            'x-xsrf-token': xsrfToken
                        },
                        json: {
                            'email': self._eEmail,
                            'password': self._ePassword,
                            'rememberme': true
                        }
                    },
                    verifyLogin
                );
            }
        }
    }

    function verifyLogin(err, resp, body) {
        if(err) {
            logAndExit(err);
        }

        // Forbidden
        if(resp.statusCode === 500) {
            console.log('Access if forbidden.');
        }

        // Unauthorized
        if(resp.statusCode === 401) {
            console.log('Username and/or password is incorrect.');
        }

        // Login was successful. Post the MDF to the server and receive
        // the project skeleton files.
        if(!err && resp.statusCode === 200) {
            request({
                    method: 'POST',
                    url: apiUrl,
                    encoding: null,
                    headers: {
                        'x-xsrf-token': xsrfToken
                    },
                    json: mdfJson
                },
                saveDownload
            );
        }
    }

    function saveDownload(err, resp, body) {
        if(err) {
            logAndExit(err);
        }

        // Return immediately as the Express Router is 100% client-side
        if (options.generator === 'apiRouter' ||
            options.generator === 'expressRouter' ||
            options.generator === 'expressNavbar') {

            // Return control to yo
            cb();
        } else if (!err && resp.statusCode === 200) {
            // Download and unzip the project skel files (which are
            // sent by the server as a zip file.
            //if (!err && resp.statusCode === 200) {

            fs.writeFile(self._eDir.download.root + tarGzFilename,
                body,
                extractDownload
            );
        }
    }

    function extractDownload(err) {
        try {
            var zip = new Zip(self._eDir.download.root + tarGzFilename);
            zip.extractAllTo(self._eDir.download.root);

            // Return control to yo
            cb();
        } catch (err) {
            var errorMsg = 'Exponential encountered an error while ' +
                'downloading the project skeleton files.';
            console.log(errorMsg);
            console.log('Error: ' + err);

            // Return control to yo
            cb();
        }
    }
};
