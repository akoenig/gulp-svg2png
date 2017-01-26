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

import path = require('path');

import gutil = require('gulp-util');

const map_limit = require('map-stream-limit');
const map = require('map-stream');
const svg2png = require('svg2png');

import { SVG } from './lib/index';

const PLUGIN_NAME = require('./package.json').name;

class Command {
	constructor(private options: Object = {}, private verbose: boolean = true) { }

	/**
	* Wrapper around gutil logger.
	* Logs if logging is enabled.
	*
	* @param {string} message The log message
	*
	*/
	private log(message: string) {
		if (this.verbose) {
			gutil.log(message);
		}
	}

	/**
	* Just a global error function.
	*
	* @param {string} message The error message
	*
	*/
	private error(message: string) {
		throw new gutil.PluginError(PLUGIN_NAME, message);
	}

	/**
	* Renames the SVG file to a PNG file (extension)
	*
	* @param {string} filename The file name of the SVG
	*
	* @return {string} The file name with the PNG file extension.
	*
	*/
	private rename(filename: string) {
		return filename.replace(path.extname(filename), '.png');
	}

	execute(source: any, cb: Function) {
		if (!source.isBuffer()) {
			return this.error('Streams are not supported by the underlying svg2png library.');
		}
		if (!SVG.is(source)) {
			return this.error('Source is not a SVG file.');
		}

		svg2png(source, this.options)
			.then((contents: Buffer) => {
				console.log('DONE');
			})
			// 	// cb(null, new gutil.File({
			// 	// 	base: source.base,
			// 	// 	path: this.rename(source.path),
			// 	// 	contents
			// 	// }))
			// )
			.catch((err: Error) =>
				cb(this.error(`Error while converting the image: ${err.message}`))
			);
	}
}

export = (options: Object = {}, verbose: boolean = true, concurrency: number = null) => {
	const cmd = new Command(options, verbose);

	if (concurrency) {
		return map_limit(cmd.execute.bind(cmd), concurrency);
	} else {
		return map(cmd.execute.bind(cmd));
	}
};
