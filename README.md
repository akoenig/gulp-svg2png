# gulp-svg2png [![Build Status](https://travis-ci.org/akoenig/gulp-svg2png.png?branch=master)](https://travis-ci.org/akoenig/gulp-svg2png)

> A gulp plugin for converting SVGs to PNGs.


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

### svg2png([scaling, verbose])

`scaling`

The scaling factor (optional; default=1.0)

`verbose`

Logs progress information (optional; default=false)

## Changelog

See [HISTORY.md](https://github.com/akoenig/gulp-svg2png/blob/master/HISTORY.md)

## Author

Copyright 2014, [André König](http://iam.andrekoenig.info) (andre.koenig@posteo.de)