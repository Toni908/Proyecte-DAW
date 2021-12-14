'use strict';

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const { watch, series } = require('gulp');

function defaultTask(cb) {
    // place code for your default task here
    cb();
  }

function buildStyles() {
  return gulp.src('./lib/bootstrap-5.1.3/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./lib/bootstrap-5.1.3/dist/css'));
};

function buildStyles2() {
  return gulp.src('./scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
};

function vetllarSCSS(cb){
    watch('./lib/bootstrap-5.1.3/scss/**/*.scss', buildStyles);
    // watch('cssM/*.css', minifyStyles)
    cb();
  }

  exports.default = defaultTask
  exports.sass = buildStyles2
  exports.sasswatch = vetllarSCSS