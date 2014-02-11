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