/*
 * gulp-svg2png
 *
 * Copyright(c) 2014 André König <andre.koenig@posteo.de>
 * MIT Licensed
 *
 */

/**
 * @author André König <andre.koenig@posteo.de>
 *
 */

'use strict';

var path        = require('path'),
    os          = require('os'),
    fs          = require('fs'),
    map         = require('map-stream'),
    gutil       = require('gulp-util'),
    svg2png     = require('svg2png'),
    PLUGIN_NAME = 'gulp-svg2png';

/**
 * gulp-svg2png plugin
 *
 * @param {number} scale (optional) The scaling factor.
 * @param {boolean} verbose (optional) Should the progress be logged?
 *
 */
module.exports = function (scale, verbose) {

    if ('boolean' === typeof scale) {
        verbose = scale;
        scale = undefined;
    }

    scale = scale || 1.0;

    /**
     * Renames the SVG file to a PNG file (extension)
     *
     * @param {string} filename The file name of the SVG
     *
     * @return {string} The file name with the PNG file extension.
     *
     */
    function rename (filename) {
        return filename.replace(path.extname(filename), '.png');
    }

    /**
     * Just a global error function.
     *
     * @param {string} message The error message
     *
     */
    function error (message) {
        throw new gutil.PluginError(PLUGIN_NAME, message);
    }

    /**
     * Wrapper around gutil logger.
     * Logs if logging is enabled.
     *
     * @param {string} message The log message
     *
     */
    function log (message) {
        if (verbose) {
            gutil.log(message);
        }
    }

    /**
     * UUID generator
     *
     * @return {string} The generated UUID.
     *
     */
    function uuid () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (chr) {
            var rand = Math.random() * 16|0;
            var value = chr == 'x' ? rand : (rand&0x3|0x8);

            return value.toString(16);
        });
    }

    /**
     * Checks if the given file is a SVG.
     *
     * @param  {buffer} svg The SVG file object.
     *
     * @return {Boolean}
     *
     */
    function isSVG (data) {
        var i = 0,
            len = data.length,
            snippet;

        data = data.toString('hex');

        for (i; i < len; i = i + 1) {
            snippet = data.slice(i, i + 2).toString('hex');

            if ('73' === snippet) {
                i = i + 2;
                snippet = data.slice(i, i + 2).toString('hex');

                if ('76' === snippet) {
                    i = i + 2;
                    snippet = data.slice(i, i + 2).toString('hex');

                    if ('67' === snippet) {
                        return true;
                    }
                }
            }
        }

        return false;
    }

    /**
     * Converts the source SVG file to a PNG.
     *
     * @param  {gutil.File} source The source SVG
     * @param  {function} cb
     *
     */
    function convert (source, cb) {
        var temp = path.join(os.tmpdir(), uuid() + '-' + rename(path.basename(source.path))),
            png;

        function done (err) {
            if (err) {
                return error(err);
            }

            log('Converted file: ' + png.path);

            cb(null, png);
        }

        function buffered (err, data) {
            png = new gutil.File({
                base: source.base,
                path: rename(source.path),
                contents: data
            });

            // Cleanup - Delete the temp file.
            fs.unlink(temp, done);
        }

        function converted (err) {
            if (err) {
                return error('Error while converting image.' + err);
            }

            fs.readFile(temp, buffered);
        }

        if (!isSVG(source.contents)) {
            return error('Source is not a SVG file.');
        }

        // Writes the file to the temp directory.
        svg2png(source.path, temp, scale, converted);
    }

    return map(convert);
};