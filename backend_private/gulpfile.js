'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const { watch, series } = require('gulp');
const uglify = require('gulp-uglify');

function defaultTask(cb) {
    // place code for your default task here
    cb();
}

function buildStyles() {
    return gulp.src('./src/main/resources/static/scss/custom.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/main/resources/static/css'));
}
function minifyJs() {
    return gulp.src('./node_modules/bootstrap/dist/js/bootstrap.bundle.min.js')
        .pipe(uglify().on('error', sass.logError))
        .pipe(gulp.dest('./src/main/resources/static/js'));
}
function buildStylesIcons() {
    return gulp.src('./node_modules/bootstrap-icons/font/bootstrap-icons.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/main/resources/static/css'));
}

exports.default = defaultTask
exports.sass = buildStyles
exports.minimitzajs = minifyJs
exports.build = series(buildStyles,buildStylesIcons, minifyJs)