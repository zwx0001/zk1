/*
 * @Author: mikey.zhang 
 * @Date: 2018-11-05 09:00:22 
 * @Last Modified by: mikey.zhang
 * @Last Modified time: 2018-11-05 09:53:41
 */

//引入模块
var gulp = require('gulp');
var fs = require('fs');
var path = require('path');
var url = require('url');
var webserver = require('gulp-webserver');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');

//起服务
gulp.task('server', function() {
    return gulp.src('./src')
        .pipe(webserver({
            port: 8888,
            livereload: true,
            directoryListing: true,
            open: true,
            fallback: 'index.html',
            middleware: function(req, res, next) {
                if (req.url === '/favicon.ico') {
                    return res.end();
                }
                var pathname = url.parse(req.url).pathname;
                pathname = pathname === '/' ? 'index.html' : pathname;
                res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
            }
        }));
})

//编译sass
gulp.task('sass', function() {
    return gulp.src('./src/scss/style.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css'))
})

//监听sass
gulp.task('watch', function() {
    return gulp.watch('./src/scss/style.scss', gulp.series('sass'))
})

//压缩合并js
gulp.task('uglify', function() {
    return gulp.src('./src/libs/*.js')
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('./src/libs/minjs'))
});

//压缩合并css
gulp.task('cleanCSS', function() {
    return gulp.src('./src/css/*.css')
        .pipe(cleanCSS())
        .pipe(gulp.dest('./src/css/mincss'))
});

//输出至dist
gulp.task('dest', function() {
    return gulp.src('./src')
        .pipe(gulp.dest('./dest'))
})

gulp.task('last', gulp.series('sass', 'uglify', 'cleanCSS', 'server', 'watch'));