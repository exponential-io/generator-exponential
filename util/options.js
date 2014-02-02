'use strict';

/**
 * Setup all options used by Exponential.
 * @module util/options
 *
 * @param parent Pass in 'this' from the parent scope.
 * @returns {null}
 */
module.exports = function(parent) {
    /*
        CLI options
        -----------
        Options are true/false values that are saved in the options[] array.

        Example
        yo exponential --mdf "exponential/basic/app" --debug

        You access options via the options hash:
        options['debug']
     */
    parent.option('debug', {
        desc: 'Output debug statements to the console',
        required: false,
        type: Boolean,
        default: false
    });

    return null;
};