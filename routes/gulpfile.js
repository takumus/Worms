var gulp = require('gulp');
var connect = require('gulp-connect');
var webpack = require('gulp-webpack');;
var webpackConfig = require('./webpack.config.js');
 
gulp.task('webpack', function () {
    gulp.src(['./routes/*.ts'])
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('.'));
});
 
gulp.task('connect', function() {
  connect.server({
    root: [__dirname]
  });
});
 
gulp.task('watch', function () {
    gulp.watch('./routes/**/*.ts', ['webpack']);
});
 
gulp.task('default', ['webpack','watch','connect']);
