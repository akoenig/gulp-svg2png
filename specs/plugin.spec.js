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
    helper  = require('./helper');

describe('The "gulp-svg2png" plugin', function () {

    it('should convert a SVG to a PNG', function (done) {
        var filename = 'twitter.svg',
            stream   = svg2png(),
            image    = helper.createTestFile();

        stream.on('data', function (png) {
            expect(png.path).toBe('twitter.png');
            expect(helper.isPNG(png.contents)).toBe(true);

            done();
        });

        stream.write(image);
        stream.end();
    });

    it('should convert a SVG to a PNG by a defined scaling factor', function (done) {
        var factor = 1.1,
            filename = 'twitter.svg',
            stream   = svg2png(factor),
            image    = helper.createTestFile();

        stream.on('data', function (png) {
            helper.hasDimensions(png.contents, 191, 190, function (err, has) {
                expect(has).toBe(true);

                done();
            });
        });

        stream.write(image);
        stream.end();
    });
});