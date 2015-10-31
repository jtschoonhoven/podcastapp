"use strict";

const gulp = require('gulp');
const fs = require("fs");
const browserify = require("browserify");
const babelify = require("babelify");
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const babel = require('gulp-babel');

gulp.task('default', ['bundle', 'jsx', 'style', 'vendor']);
gulp.task('watch', ['watch:bundle', 'watch:style', 'watch:jsx']);

gulp.task('bundle', function() {
    browserify("./app/main.js", {debug: true})  // Debug sourcemaps break ST2.
        .transform(babelify.configure({nonStandard: true, compact: false, sourceMaps: true}))  // JSX & Flow are nonStandard.
        .bundle()
        .on("error", err => console.error("Error : " + err.message))
        .pipe(fs.createWriteStream("./public/javascripts/bundle.js"));
});

gulp.task('watch:bundle', function () {
    gulp.watch(['./app/**/*.js'], ['bundle']);
});

gulp.task("jsx", function() {
  return gulp.src("./app/components_jsx/**/*.js")
    .pipe(babel({presets: ['react']}))
    .pipe(gulp.dest("./app/components/"));
});

gulp.task('watch:jsx', function() {
    gulp.watch("./app/components_jsx/**/*.js", ['jsx']);
});

gulp.task('style', function () {
    gulp.src('./style.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/stylesheets/'));
});

gulp.task('watch:style', function () {
    gulp.watch('./*.scss', ['style']);
});

gulp.task('vendor', function(){
    const vendors = [
        './bower_components/jquery/dist/jquery.js',
        './bower_components/underscore/underscore.js',
        './bower_components/backbone/backbone.js',
        './bower_comonents/bootstrap/dist/js/bootstrap.js'
    ];

    gulp.src(vendors)
        .pipe(uglify())
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest("./public/javascripts/"));

    gulp.src('./bower_components/bootstrap/dist/css/bootstrap.min.css')
        .pipe(gulp.dest('./public/stylesheets/'));

    gulp.src('./bower_components/bootstrap/dist/css/bootstrap.css.map')
        .pipe(gulp.dest('./public/stylesheets/'));

    gulp.src('./bower_components/bootstrap/dist/fonts/*')
        .pipe(gulp.dest('./public/fonts/'));
});
