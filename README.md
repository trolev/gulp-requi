# gulp-requi


## Install
npm install gulp-requi --save-dev

## Usage
Example: coffescript + js

main.js

```javascript
//= require scripts.coffee
//= require utils/script3.js
//= require utils/**/*.*
//= require utils/script1.js
//= require !utils/script4.js

alert('main.js')
```

gulpfile.js

```javascript
var requi = require('gulp-requi');
var concat = require('gulp-concat');
var gulpif = require('gulp-if');
var coffee = require('gulp-coffee');

gulp.task('js', function(){
  gulp.src(['assets/js/main.js'])
    .pipe(requi())
    .pipe(
      gulpif(
        /[.]coffee$/,
        coffee()
      )
    )
    .pipe(concat())
    .pipe(gulp.dest('dest/js/'));
});
```

## Release log


#### 1.0.1 - 1.0.4
* Small changes

#### 1.0.0
* Fixed readme
* Added tests

#### 0.0.1
* Start

## Licence
(MIT License)

Copyright (c) 2014 Hugo Wiledal

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

