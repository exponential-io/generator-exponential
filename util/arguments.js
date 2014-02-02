'use strict';

/**
 * Setup all arguments used by Exponential.
 * @module util/arguments
 *
 * @param parent Pass in 'this' from the parent scope.
 * @returns {null}
 */
module.exports = function(parent) {
    /*
        CLI arguments
        -------------
        Arguments are key/value pairs that are exposed in the global namespace
        by yo. Warning: Be careful when naming arguments. If you name an
        argument the same as another global then you will overwrite an existing
        variable.

        Example:
        yo exponential --mdf "exponential/basic/app"

        You access arguments via the global namespace:
        this.mdf
     */

    parent.argument('mdf', {
        desc: 'Module Definition Format (MDF) file',
        required: true,
        type: String,
        defaults: ''
    });
    
    // TODO: Handle error if MDF is not provided

    return null;
};
