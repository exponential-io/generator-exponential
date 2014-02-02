'use strict';

var request          = require('request').defaults({ jar: true }),
    extractXsrfToken = require('../util/extract-xsrf-token'),
    fs               = require('fs'),
    targz            = require('tar.gz');

var logAndExit = function(err) {
    console.log(err);
    process.exit(1);
};

module.exports = function(options) {
    var self = this;
    var cb = this.async();

    // TODO: PUT THE URL INTO A CENTRALIZED MODULE WITH A CONFIG FILE
    // TODO: PUT THE URL INTO A CENTRALIZED MODULE WITH A CONFIG FILE
    // TODO: PUT THE URL INTO A CENTRALIZED MODULE WITH A CONFIG FILE
    // TODO: PUT THE URL INTO A CENTRALIZED MODULE WITH A CONFIG FILE
    var host = 'http://localhost:3000',
        xsrfApi = host + '/api/v1/xsrf-cookie',
        loginApi = host + '/api/v1/login',
        generateProjectApi = host + '/api/v1/exponential/project';

    var mdfJson = this.mdf;

    var tarGzFilename = 'download.tar.gz';

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
                    url: generateProjectApi,
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

        // Download and unzip the project skel files (which are
        // sent by the server as a zip file.
        if (!err && resp.statusCode === 200) {
            fs.writeFile(self._eDir.download.root + tarGzFilename,
                body,
                extractDownload
            );
        }
    }

    function extractDownload(err) {
        //       Use a date/time stamp.
        try {
            // Extract the project skeleton which is downloaded as a .tar.gz
            var compress = new targz().extract(
                self._eDir.download.root + tarGzFilename,
                self._eDir.download.root,
                function(err) {
                    if (err) {
                        // TODO: Better error handling is required.
                        console.log(err);
                    }
                    // At this point the .tar.gz contents have been extracted

                    // Return control to yo
                    cb();
                }
            );
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
