# gulp-requi


## Install
npm install gulp-requi --save-dev

## Usage/Example

#### File structure:

```
main.js
scripts.coffee
utils
   |_ script1.js
   |_ script2.js
   |_ script3.js
   |_ script4.js
```

#### File main.js, scripts.coffee and utils/script*.js

main.js:

```javascript
//= require scripts.coffee
//= require utils/script3.js
//= require utils/**/*.*
//= require utils/script1.js
//= require !utils/script2.js

alert("main.js")
```

 scripts.coffee:

```javascript
alert "scripts.coffee"
```

script*.js:
```javascript
alert(script1.js);
```

#### Task

```javascript
var requi = require('gulp-requi');
var concat = require('gulp-concat');
var gulpif = require('gulp-if');
var coffee = require('gulp-coffee');

gulp.task('js', function(){
  gulp.src(['main.js'])
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

#### Result

```javascript
alert("scripts.coffee");
alert("script3.js)");
alert("script4.js)");
alert("script1.js)");
alert("main.js");
```


#### Option

`pattern` – default `/(?:#|\/\/)= require [\s-]*(.*\.*)/g` (//= or #=)

```javascript
...
  .pipe(requi({
    'pattern': /(?:#|\/\/)= require [\s-]*(.*\.*)/g
  }))
...
```

## Release log

#### 1.0.9
* Bugs!!!

#### 1.0.8
* Added option "pattern"
* Fixed readme

#### 1.0.1 - 1.0.7
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