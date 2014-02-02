'use strict';

var  querystring = require('querystring');

/**
 * Extract the XSRF token from response headers. The headers are sent as an
 * array with each array item containing multiple "k=v;k=v" pairs.
 *
 * @param headers Response headers
 */
module.exports = function(headers) {
    var xsrfToken = '';

    headers.forEach(function(header) {
        // kv is each key/value pair that's contained in the header
        var kv = header.split(';');

        // cookiePair the cookie key=value pair that we want to get
        kv.forEach(function(cookiePair) {
            var cookie = cookiePair.split('=');
            // cookie[0] is the cookie name, and we want the 'XSRF-TOKEN' cookie
            if (cookie[0] === 'XSRF-TOKEN') {
                // cookie[1] is the value of the 'XSRF-TOKEN' cookie. Also, we
                // need to URL decode it as the value is URL encoded.
                xsrfToken = querystring.unescape(cookie[1]);
            }
        });
    });

    return xsrfToken;
};
