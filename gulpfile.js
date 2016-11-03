'use strict';

const gulp = require('gulp'),
  browserify = require('browserify'),
  run = require('gulp-run'),
  source = require('vinyl-source-stream'),
  connect = require("gulp-connect");

gulp.task('watch', () => {
  gulp.watch('src/*.js', ['reload']);
  gulp.watch('css/*.css', ['reload']);
  gulp.watch('*.html', ['reload']);
});

gulp.task('test-watch', () => {
  gulp.watch('jasmine/spec/*.js', ['test-reload']);
});

gulp.task('test-reload', function () {
  gulp.src(['jasmine/spec/*.js']).pipe(connect.reload());
});

gulp.task('connect', () => {
  connect.server({
    root: '.',
    livereload: true,
    port: process.env.PORT || 3000
  });
});

gulp.task('browserify', () => {
  return browserify('./spec/inverted-index-test-spec.js')
    .bundle()
    .pipe(source('test-spec.js'))
    .pipe(gulp.dest('./spec'));
});

gulp.task('test', ['browserify'], () => {
  run('node_modules/karma/bin/karma start karma.conf.js --single-run').exec();
});

gulp.task('reload', () => {
  gulp.src(['*.html', 'src/*.js', 'css/*.css']).pipe(connect.reload());
});

gulp.task('default', ['reload', 'test-watch', 'test-reload', 'connect', 'watch']);