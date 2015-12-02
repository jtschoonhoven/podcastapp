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

gulp.task('default', ['bundle', 'watch']);
gulp.task('watch', ['watch:jsx', 'watch:bundle', 'watch:style']);
gulp.task('build', ['bundle', 'style', 'vendor']);

gulp.task('bundle', ['jsx'], function() {
    browserify("./app/main.js", {debug: true})  // Debug sourcemaps break ST2.
        .transform(babelify.configure({nonStandard: true, compact: false, sourceMaps: true}))  // JSX & Flow are nonStandard.
        .bundle()
        .pipe(fs.createWriteStream("./public/javascripts/bundle.js"))
        .on('end', gutil.beep);
});

gulp.task('watch:bundle', function () {
    gulp.watch(['./app/**/*.js', '!./app/components/**/*.js'], ['bundle']);
});

gulp.task("jsx", function() {
  return gulp.src("./app/components_jsx/**/*.jsx")
    .pipe(babel({plugins: ['transform-es2015-modules-commonjs', 'transform-react-jsx']}))
    .pipe(header('/**\n * Compiled from JSX. Do not edit by hand.\n */\n'))
    .pipe(gulp.dest("./app/components/"))
    .on('end', gutil.beep);
});

gulp.task('watch:jsx', function() {
    gulp.watch(["./app/components_jsx/**/*.jsx"], ['bundle']);
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
