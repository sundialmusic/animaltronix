var gulp = require('gulp'),
  clean = require('gulp-clean'),
  runSequence = require('run-sequence'),
  filter = require('gulp-filter'),
  sass = require('gulp-sass'),
  less = require('less');

gulp.task('clean', function() {
  return gulp.src('dist', {
      read: false
    })
    .pipe(clean());
});

gulp.task('css', function() {
  return gulp.src([
      'less/**/*.less',
      '!less/**/_*.less'
    ])
    .pipe(less())
    .pipe(gulp.dest('dist/css'))
});

gulp.task('build:css', ['clean'], function(cb) {
  return runSequence('css', cb);
});

gulp.task('copy', function() {

  return gulp.src([
      '**/*',
      '!.less',
      // '!css/**/*.css',
      '!dist/**/*',
      '!node_modules/**/*',
      '!gulpfile.js',
      '!package.json',
      '!.*'
    ])
    .pipe(gulp.dest('dist'));
});

gulp.task('build', ['clean'], function(cb) {
  runSequence('copy', 'css', cb);
});

gulp.task('default', ['build']);