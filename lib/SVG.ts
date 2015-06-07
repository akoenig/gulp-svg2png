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

export default class SVG {

    /**
     * Checks if the given file is a SVG.
     *
     * @param  {buffer} svg The SVG file object.
     *
     * @return {Boolean}
     *
     */
    static is(data: any) {
        var i = 0;
        var len = data.length;
        var snippet: string;

        data = data.toString('hex');

        for (i; i < len; i = i + 1) {
            snippet = data.slice(i, (i + 2)).toString('hex');

            if ('73' === snippet) {
                i = i + 2;
                snippet = data.slice(i, (i + 2)).toString('hex');

                if ('76' === snippet) {
                    i = i + 2;
                    snippet = data.slice(i, (i + 2)).toString('hex');

                    if ('67' === snippet) {
                        return true;
                    }
                }
            }
        }

        return false;
    }	
}
