const jshint = require('gulp-jshint');
const gulp = require('gulp');


gulp.task('default', function() {
  return gulp.src('./src/**/**.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});
