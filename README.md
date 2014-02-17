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

### svg2png([scaling])

`scaling`

The scaling factor (optional; default=1.0)

## Changelog

### Version 0.2.1 (20140218)

- [Bugfix] See [#3](https://github.com/akoenig/gulp-svg2png/issues/3) for further information.

### Version 0.2.0 (20140213)

- [Feature] Implemented option for passing the scaling factor.

### Version 0.1.1 (20140212)

- README modification.

### Version 0.1.0 (20140211)

- Initial Release.

## Author

Copyright 2014, [André König](http://iam.andrekoenig.info) (andre.koenig@posteo.de)

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/akoenig/gulp-svg2png/trend.png)](https://bitdeli.com/free "Bitdeli Badge")
