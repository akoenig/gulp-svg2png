/*
 * gulp-svg2png
 *
 * Copyright(c) 2014 - present / André König <andre.koenig@posteo.de>
 * MIT Licensed
 *
 */

/**
 * @author André König <andre.koenig@posteo.de>
 *
 */

'use strict';

import fs = require('fs');
import os = require('os');
import path = require('path');
import gutil = require('gulp-util');

var imagesize = require('imagesize');

export default class Helper {

    /**
     * Checks if a given buffer is valid data from a PNG.
     *
     * @param  {Buffer} buffer The PNG data.
     *
     * @return {boolean}
     *
     */
	static isPNG(buffer: Buffer): boolean {
		const mnumber = '89504E470D0A1A0A'; // magic number of a PNG

		const contents = buffer.toString('hex').toUpperCase();

		return (contents.substring(0, mnumber.length) === mnumber);
	}

    /**
     * Checks if the dimensions of an image matches
     * given dimensions.
     *
     * @param  {string} image Path to the image.
     * @param  {number} width The expected width.
     * @param  {number} height The expected height.
     * @param  {function} callback
     *
     */
	static hasDimensions(image: string, height: number, width: number, callback: Function) {
		const temp = path.join(os.tmpdir(), 'test.png');

		fs.writeFileSync(temp, image);

		imagesize(fs.createReadStream(temp), (err: Error, result: { width: number, height: number }) => {
			if (err) {
				return callback(err);
			}

			fs.unlinkSync(temp);

			return callback(null, (result.width === width && result.height === height));
		});
	}

    /**
     * Creates a vinyl file descriptor for testing.
     *
     * @return {object}
     *
     */
	static createTestFile(): any {
		return new gutil.File({
			cwd: './specs/assets/',
			base: './specs/assets/',
			path: './specs/assets/twitter.svg',
			contents: fs.readFileSync('./specs/assets/twitter.svg')
		});
	};
}
