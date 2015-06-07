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

export default class UUID {
    
    static generate() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (chr) => {
            var rand = Math.random() * 16|0;
            var value = chr == 'x' ? rand : (rand&0x3|0x8);

            return value.toString(16);
        });
    }
}
