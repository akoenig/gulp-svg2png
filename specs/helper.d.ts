/// <reference path="../typings/main.d.ts" />
import gutil = require('gulp-util');
export default class Helper {
    /**
     * Checks if a given buffer is valid data from a PNG.
     *
     * @param  {Buffer} buffer The PNG data.
     *
     * @return {boolean}
     *
     */
    static isPNG(buffer: Buffer): boolean;
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
    static hasDimensions(image: string, height: number, width: number, callback: Function): void;
    /**
     * Creates a vinyl file descriptor for testing.
     *
     * @return {object}
     *
     */
    static createTestFile(): gutil.File;
}
