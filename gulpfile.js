"use strict";

const gulp = require('gulp');
const fs = require("fs");
const browserify = require("browserify");
const babelify = require("babelify");
const mainBowerFiles = require('gulp-main-bower-files');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const sass = require('gulp-sass');

gulp.task('default', ['bundle', 'style', 'vendor']);
gulp.task('watch', ['watch:bundle', 'watch:style']);

gulp.task('bundle', function() {
    const config = {nonStandard: true, compact: false, sourceMaps: true}
    browserify("./app/index.js", {debug: true})  // Debug sourcemaps break ST2.
        .transform(babelify.configure())  // JSX & Flow are nonStandard.
        .bundle()
        .on("error", err => console.log("Error : " + err.message))
        .pipe(fs.createWriteStream("./public/javascripts/bundle.js"));
});

gulp.task('watch:bundle', function () {
    gulp.watch(['./app/**/*.js'], ['style']);
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
    gulp.src('./bower.json')
        .pipe(mainBowerFiles({overrides: {bootstrap: {main: './dist/js/bootstrap.js'}}}))
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

