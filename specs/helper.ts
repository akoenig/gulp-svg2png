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

var fs        = require('fs'),
    os        = require('os'),
    path      = require('path'),
    imagesize = require('imagesize'),
    gutil     = require('gulp-util');

/**
 * Checks if a given buffer is valid data from a PNG.
 *
 * @param  {Buffer} buffer The PNG data.
 *
 * @return {boolean}
 *
 */
exports.isPNG = function isPNG (buffer) {
    var mnumber = '89504E470D0A1A0A'; // magic number of a PNG

    buffer = buffer.toString('hex').toUpperCase();

    return (buffer.substring(0, mnumber.length) === mnumber);
};

/**
 * Checks if the dimensions of an image matches
 * given dimensions.
 *
 * @param  {string} image Path to the image.
 * @param  {number} width The expected width.
 * @param  {number} height The expected height.
 * @param  {function} callback
 *
 * @return {Boolean}
 *
 */
exports.hasDimensions = function hasDimensions (image, height, width, callback) {
    var temp = path.join(os.tmpdir(), 'test.png');

    fs.writeFileSync(temp, image);

    imagesize(fs.createReadStream(temp), function onread (err, result) {
        if (err) {
            return callback(err);
        }

        fs.unlinkSync(temp);

        return callback(null, (result.width === width && result.height === height));
    });
};

/**
 * Creates a vinyl file descriptor for testing.
 *
 * @return {object}
 *
 */
exports.createTestFile = function createTestFile () {
    return new gutil.File({
        cwd:  './specs/assets/',
        base: './specs/assets/',
        path: './specs/assets/twitter.svg',
        contents: fs.readFileSync('./specs/assets/twitter.svg')
    });
};