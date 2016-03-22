var gulp = require('gulp'),
    es = require('event-stream'),
    requi = require("../index"),
    assert = require('assert'),
    concat = require('gulp-concat'),
    coffee = require('gulp-coffee'),
    gulpif = require('gulp-if');


describe("gulp-requi", function () {
  it('base test', function(done) {
    gulp.src(__dirname + '/fixtures/base.js')
            .pipe(requi())
            .pipe(concat('base.js'))
            .pipe(gulp.dest(__dirname + '/results/'))
            .pipe(es.wait(function() {
              done();
            }));
  });

  it('mix of coffee and js', function(done) {
    gulp.src(__dirname + '/fixtures/mix-js-coffee.js')
            .pipe(requi({
              'pattern': /(?:#|\/\/)= require [\s-]*(.*\.*)/g
            }))
            .pipe(
              gulpif(
                /[.]coffee$/,
                coffee()
              )
            )
            .pipe(concat('mix-js-coffee.js'))
            .pipe(gulp.dest(__dirname + '/results/'))
            .pipe(es.wait(function() {
              done();
            }));
  });

  it('tree (glob)', function(done) {
    gulp.src(__dirname + '/fixtures/require-tree-order.js')
            .pipe(requi())
            .pipe(concat('require-tree-order.js'))
            .pipe(gulp.dest(__dirname + '/results/'))
            .pipe(es.wait(function() {
              done();
            }));
  });

  it('ignore test', function(done) {
    gulp.src(__dirname + '/fixtures/ignore.js')
            .pipe(requi())
            .pipe(concat('ignore.js'))
            .pipe(gulp.dest(__dirname + '/results/'))
            .pipe(es.wait(function() {
              done();
            }));
  });
});