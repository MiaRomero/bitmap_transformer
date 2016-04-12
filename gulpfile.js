const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
var allFiles = ['/lib/**/*', '/test/**/*', 'gulpfile.js', 'index.js', 'package.json'];
var testFiles = ['test/**/*test.js'];

gulp.task('lint', function(){
  return gulp.src(allFiles)
  .pipe(eslint())
  .pipe(eslint.format());
});

gulp.task('mocha', function(){
  return gulp.src(testFiles)
  .pipe(mocha());
});

gulp.task('default', ['lint', 'mocha']);
