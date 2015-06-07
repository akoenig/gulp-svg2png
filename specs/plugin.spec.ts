///<reference path='../typings/tsd'/>

/*
 * gulp-svg2png
 *
 * Copyright(c) 2014-2015 André König <andre.koenig@posteo.de>
 * MIT Licensed
 *
 */

/**
 * @author André König <andre.koenig@posteo.de>
 *
 */

'use strict';

import fs = require('fs');
import Helper from './helper';

var expect  = require('chai').expect;
var svg2png = require('../');

describe('The "gulp-svg2png" plugin', () => {
    it('should convert a SVG to a PNG', (done) => {
        var filename = 'twitter.svg';
        var stream = svg2png();
        var image = Helper.createTestFile();

        stream.on('data', (png: any) => {
            expect(png.path).to.equal('./specs/assets/twitter.png');
            expect(Helper.isPNG(png.contents)).to.equal(true);

            done();
        });

        stream.write(image);
        stream.end();
    });

    it('should convert a SVG to a PNG by a defined scaling factor', function (done) {
        var factor = 1.1;
        var filename = 'twitter.svg';
        var stream = svg2png(factor);
        var image = Helper.createTestFile();

        stream.on('data', (png: any) => {
            Helper.hasDimensions(png.contents, 191, 190, function (err: Error, has: boolean) {
                expect(has).to.equal(true);

                done();
            });
        });

        stream.write(image);
        stream.end();
    });
});
