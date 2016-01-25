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
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const envify = require('envify/custom');
const package_json = require('./package');

/**
 * Pull context from env and config without exposing all config JSON
 */
const ENV = require('./config').constants.ENV;
const env = process.env[ENV] || 'development';

/**
 * 3rd party modules to bundle for browser.
 */
const BROWSER_GLOBALS = [
    'history/lib/createBrowserHistory',
    'react',
    'react-dom',
    'react-redux',
    'react-router',
    'redux',
    'redux-simple-router',
    'request'
];

/**
 * Top level gulp commands to build and watch.
 */
gulp.task('default', ['build', 'watch']);
gulp.task('build', ['bundle', 'style', 'vendor', 'assets']);
gulp.task('watch', ['watch:jsx', 'watch:bundle', 'watch:style', 'watch:vendor']);

/**
 * Browserify and bundle.
 */
gulp.task('bundle', ['jsx'], function() {
    const outFile = fs.createWriteStream("./public/javascripts/bundle.js");
    const b = browserify("./app/main.js", {debug: true});

    // Excludes 3rd party modules in package.json.
    for (const vendor_module in package_json.dependencies) {
        try { b.external(vendor_module); }
        catch (e) { console.warning(`${vendor_module} from package.json not found in node_modules`); }
    }

    b.transform(babelify.configure({
            nonStandard: true,
            compact: false,
            comments: false,
            sourceMaps: true
        }));

    b.transform(envify({[ENV]: env}));

    b.bundle().pipe(outFile);
});

gulp.task('watch:bundle', function () {
    gulp.watch([
        './app/**/*.js',
        '!./app/components/**/*.js',
        '!./app/components_jsx/**/*.js'
    ], ['bundle']);
});

/**
 * Bundle 3rd party dependencies.
 */
gulp.task('vendor', function() {
    const b = browserify({debug: false});

    BROWSER_GLOBALS.forEach(vendor_module => {
        b.require(vendor_module);
    });

    b.bundle()
        .pipe(source('vendor.js'))
        .pipe(buffer())
        // .pipe(uglify())
        .pipe(gulp.dest('./public/javascripts'));
});

gulp.task('watch:vendor', function() {
    gulp.watch(["./package.json"], ['vendor']);
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
    gulp.watch('./style.sass', ['style']);
});

/**
 * Add assets from bootstrap.
 */
gulp.task('assets', function(){
    gulp.src('./bower_components/bootstrap/dist/css/bootstrap.min.css')
        .pipe(gulp.dest('./public/stylesheets/'));

    gulp.src('./bower_components/bootstrap/dist/css/bootstrap.css.map')
        .pipe(gulp.dest('./public/stylesheets/'));

    gulp.src('./bower_components/bootstrap/dist/fonts/*')
        .pipe(gulp.dest('./public/fonts/'));
});
