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

var fs      = require('fs'),
    svg2png = require('../'),
    helper  = require('./helper'),
    gutil   = require('gulp-util');

describe('The "gulp-svg2png" plugin', function () {

    it('should convert a SVG to a PNG', function (done) {
        var filename = 'twitter.svg',
            stream   = svg2png(),
            image    = new gutil.File({
                cwd:  './specs/assets/',
                base: './specs/assets/',
                path: './specs/assets/twitter.svg',
                contents: fs.readFileSync('./specs/assets/twitter.svg')
            });

        stream.on('data', function (png) {
            expect(png.path).toBe('twitter.png');
            expect(helper.isPNG(png.contents)).toBe(true);

            done();
        });

        stream.write(image);
        stream.end();
    });
});