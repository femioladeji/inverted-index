'use strict';

const gulp = require('gulp'),
  browserify = require('browserify'),
  run = require('gulp-run'),
  source = require('vinyl-source-stream'),
  connect = require("gulp-connect");

gulp.task('watch', function () {
  gulp.watch('src/*.js', ['reload']);
  gulp.watch('css/*.css', ['reload']);
  gulp.watch('*.html', ['reload']);
});

gulp.task('test-watch', function () {
  gulp.watch('jasmine/spec/*.js', ['test-reload']);
});

gulp.task('test-reload', function () {
  gulp.src(['jasmine/spec/*.js']).pipe(connect.reload());
});

gulp.task('connect', function () {
  connect.server({
    root: '.',
    livereload: true,
    port: process.env.PORT || 3000
  });
});

gulp.task('browserify', function() {
  return browserify('./spec/inverted-index-test-spec.js')
    .bundle()
    .pipe(source('test-spec.js'))
    .pipe(gulp.dest('./spec'));
});

gulp.task('test', ['browserify'], function () {
  run('node_modules/karma/bin/karma start karma.conf.js --single-run').exec();
});

gulp.task('reload', function () {
  gulp.src(['*.html', 'src/*.js', 'css/*.css']).pipe(connect.reload());
});

gulp.task('default', ['reload', 'test-watch', 'test-reload', 'connect', 'watch']);