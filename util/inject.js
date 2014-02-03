'use strict';

var fs = require('fs');

/**
 * Inject code into a JavaScript file.
 *
 * @param options.targetFile JavaScript file that will have code injected.
 * @param options.needle Pattern above which code will be injected.
 * @param options.splicable Array of strings to inject.
 * @param options.appendComma If true, append a comma to the previous line.
 * @returns {null}
 */
module.exports = function(options) {
    try {
        rewriteFile({
            file: options.targetFile,
            needle: options.needle,
            splicable: options.splicable,
            appendComma: options.appendComma
        });
    } catch (e) {
        console.log('\nUnable to find '.yellow + options.targetFile + '. Reference to '.yellow + options.splicable + ' not injected.\n'.yellow);
    }

    return null;
};

function rewriteFile (args) {
    //console.log(args.file);
    var fullPath = args.file;
    args.haystack = fs.readFileSync(fullPath, 'utf8');
    var body = rewrite(args);

    fs.writeFileSync(fullPath, body);
}

function escapeRegExp (str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
}

function rewrite (args) {
    // check if splicable is already in the body text
    var re = new RegExp(args.splicable.map(function (line) {
        return '\s*' + escapeRegExp(line);
    }).join('\n'));

    // Prevent duplicate inserts
    if (re.test(args.haystack)) {
        return args.haystack;
    }

    // Split the file into an array of strings, where each item is a line
    var lines = args.haystack.split('\n');

    var otherwiseLineIndex = 0,
        previousLineIndex = 0;
    lines.forEach(function (line, i) {
        if (line.indexOf(args.needle) !== -1) {
            // Index of the line that contains the needle
            otherwiseLineIndex = i;
            // Index of the line that needs a comma appended
            previousLineIndex = otherwiseLineIndex -1;
        }
    });

    // Save the number of spaces so that the indentation is correct after the
    // line is modified.
    var spaces = 0;
    while (lines[otherwiseLineIndex].charAt(spaces) === ' ') {
        spaces += 1;
    }

    var spaceStr = '';
    while ((spaces -= 1) >= 0) {
        spaceStr += ' ';
    }

    if (args.appendComma) {
        // Append a comma
        lines[previousLineIndex] = lines[previousLineIndex] + ',';
    }

    // Insert the new line
    lines.splice(otherwiseLineIndex, 0, args.splicable.map(function (line) {
        return spaceStr + line;
    }).join('\n'));

    return lines.join('\n');
}