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

module.exports = function () {

    /**
     * DOCME
     *
     * @return {[type]} [description]
     *
     */
    function rename (filename) {
        return filename.replace(path.extname(filename), '.png');
    }

    function error (message) {
        throw new gutil.PluginError(PLUGIN_NAME, message);
    }

    /**
     * DOCME
     *
     * @param  {[type]}   file [description]
     * @param  {Function} cb   [description]
     *
     * @return {[type]}        [description]
     *
     */
    function convert (source, cb) {
        var temp = path.join(os.tmpdir(), rename(path.basename(source.path))),
            png;

        function done (err) {
            if (err) {
                return error(err);
            }

            cb(null, png);
        }

        function buffered (err, data) {
            png = new gutil.File({
                path: rename(path.basename(source.path)),
                contents: data
            });

            fs.unlink(temp, done);
        }

        function converted (err) {
            if (err) {
                return error('Error while converting image.' + err);
            }

            fs.readFile(temp, buffered);
        }

        svg2png(source.path, temp, converted);
    }

    return map(convert);
};