var gulp = require('gulp');
var webpack = require('gulp-webpack');;
var webpackConfig = require('./webpack.config.js');
 
gulp.task('webpack', function () {
    gulp.src(['./routes/*.ts'])
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest('.'));
});
 
gulp.task('watch', function () {
    gulp.watch('./routes/**/*.ts', ['webpack']);
});
 
gulp.task('default', ['webpack','watch']);
