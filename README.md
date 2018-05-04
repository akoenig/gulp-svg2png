# gulp-svg2png ![Build Status](https://travis-ci.org/ryanwholey/gulp-svg2png.svg?branch=master)](https://travis-ci.org/ryanwholey/gulp-svg2png)

> A gulp plugin for converting SVGs to PNGs.

## About

The original project [akoenig/gulp-svg2png](https://github.com/akoenig/gulp-svg2png) is a fantastic piece of work. It seems to have fallen off of active development, specifically leaving the package blocked at node 6. Improvements to this fork include node 8 support as well as a bump to svg2png to its most recent version of ^4.0.0. Please feel free to ping me if you'd like to see some updates here! Thanks!

## Usage

First, install `gulp-svg2png` as a development dependency:

```shell
npm install --save-dev gulp-svg2png
```

Then, add it to your `gulpfile.js`:

```javascript
var svg2png = require('gulp-svg2png');

gulp.task('svg2png', function () {
    gulp.src('./specs/assets/**/*.svg')
        .pipe(svg2png())
        .pipe(gulp.dest('./build'));
});
```

## Arguments

### svg2png([options, verbose, concurrency])

`options`

The resizing options which will be passed directly to [svg2png](https://github.com/domenic/svg2png#exact-resizing-behavior).

`verbose`

Logs progress information (optional; default=true)

`concurrency`

Limit the amount of concurrent tasks processed at one time. (optional; default=null)

## Development

### TypeScript build

```sh
npm run build
```

## Changelog

See [HISTORY.md](https://github.com/akoenig/gulp-svg2png/blob/master/HISTORY.md)

## Author

Copyright 2014-2016, [André König](http://andrekoenig.info) (andre.koenig@posteo.de)
