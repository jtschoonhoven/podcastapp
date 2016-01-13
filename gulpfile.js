"use strict";
const gulp = require('gulp');
const fs = require("fs");
const browserify = require("browserify");
const babelify = require("babelify");
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const header = require('gulp-header');
const gutil = require('gulp-util');

/**
* Top level gulp commands to build and watch.
*/
gulp.task('default', ['build', 'watch']);
gulp.task('build', ['bundle', 'style', 'vendor']);
gulp.task('watch', ['watch:jsx', 'watch:bundle', 'watch:style']);

/**
* Browserify and bundle.
*/
gulp.task('bundle', ['jsx'], function() {
    const stream = fs.createWriteStream("./public/javascripts/bundle.js");
    browserify("./app/main.js", {debug: true})
        .transform(babelify.configure({
            nonStandard: true,
            compact: false,
            comments: false,
            sourceMaps: true
        }))
        .bundle()
        .pipe(stream)
        .on('end', () => {
            stream.end();
            gutil.beep();
        });
});

gulp.task('watch:bundle', function () {
    gulp.watch([
        './app/**/*.js',
        '!./app/components/**/*.js',
        '!./app/components_jsx/**/*.js'
    ], ['bundle']);
});

/**
* Compile JSX in app/components_jsx and put to app/components.
*/
gulp.task("jsx", function() {
  return gulp.src("./app/components_jsx/**/*.js")
    .pipe(babel({plugins: ['transform-es2015-modules-commonjs', 'transform-react-jsx']}))
    .pipe(header('/**\n * Compiled from JSX. Do not edit by hand.\n */\n'))
    .pipe(gulp.dest("./app/components/"));
});

gulp.task('watch:jsx', function() {
    gulp.watch(["./app/components_jsx/**/*.js"], ['bundle']);
});


/**
* Compile SASS and put to public/stylesheets.
*/
gulp.task('style', function () {
    gulp.src('./style.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/stylesheets/'));
});

gulp.task('watch:style', function () {
    gulp.watch('.style.sass', ['style']);
});

/**
* Bundle styles and fonts from 3rd parties.
*/
gulp.task('vendor', function(){
    gulp.src('./bower_components/bootstrap/dist/css/bootstrap.min.css')
        .pipe(gulp.dest('./public/stylesheets/'));

    gulp.src('./bower_components/bootstrap/dist/css/bootstrap.css.map')
        .pipe(gulp.dest('./public/stylesheets/'));

    gulp.src('./bower_components/bootstrap/dist/fonts/*')
        .pipe(gulp.dest('./public/fonts/'));
});
