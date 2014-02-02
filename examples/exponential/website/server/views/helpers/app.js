/**
 * Application configuration helper for Handlebars. Application name, copyright
 * and other standard settings should be specified here.
 *
 * @param setting The name of the setting to return.
 * @returns {*}
 */
'use strict';

module.exports = function(setting) {
    var _app = {
        name: 'Exponential UnityJS',
        copyright: 'Copyright &copy; 2014 <%= mdf.project.company %>. All rights reserved.'
    };

    var _value = _app[setting];
    return _value;
};
