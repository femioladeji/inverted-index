var gulp = require('gulp'),
    connect = require("gulp-connect");

gulp.task('watch', function() {
  gulp.watch('src/*.js', ['reload']);
  gulp.watch('css/*.css', ['reload']);
  gulp.watch('*.html', ['reload']);
});

gulp.task('test-watch', function() {
  gulp.watch('jasmine/spec/*.js', ['test-reload']);
});

gulp.task('test-reload', function() {
  gulp.src(['jasmine/spec/*.js']).pipe(connect.reload());
});

gulp.task('connect', function() {
  connect.server({
    root: '.',
    livereload: true
  });
});

gulp.task('reload', function() {
  gulp.src(['*.html', 'src/*.js', 'css/*.css']).pipe(connect.reload());
});

gulp.task('default', ['reload', 'test-watch', 'test-reload', 'connect', 'watch']);