///<reference path='./typings/tsd'/>

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

import path = require('path');
import os = require('os');
import fs = require('fs');

import svg2png = require('svg2png');
import gutil = require('gulp-util');

import {SVG, UUID} from './lib/index';

var map_limit = require('map-stream-limit');
var map = require('map-stream');

const PLUGIN_NAME = require('./package.json');

class Command {

  constructor(private scale: number = 1.0, private verbose: boolean = true) { }

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
    var temp = path.join(os.tmpdir(), UUID.generate() + '-' + this.rename(path.basename(source.path)));
    var png: any;

    var  done = (err: Error) => {
      if (err) {
        return this.error(err.toString());
      }

      this.log('Converted file: ' + png.path);

      cb(null, png);
    }

    var buffered = (err: Error, data: Buffer) => {
      png = new gutil.File({
        base: source.base,
        path: this.rename(source.path),
        contents: data
      });

      // Cleanup - Delete the temp file.
      fs.unlink(temp, done);
    }

    var converted = (err : Error) => {
      if (err) {
        return this.error('Error while converting image.' + err);
      }

      fs.readFile(temp, buffered);
    }

    if (!SVG.is(source.contents)) {
      return this.error('Source is not a SVG file.');
    }

    // Writes the file to the temp directory.
    svg2png(source.path, temp, this.scale, converted);
  }
}

export = (scale: number = 1.0, verbose: boolean = true, concurrency: number = null) => {
  var cmd = new Command(scale, verbose);

  if (concurrency) {
    return map_limit(cmd.execute.bind(cmd), concurrency);
  } else {
    return map(cmd.execute.bind(cmd), concurrency);
  }

};
