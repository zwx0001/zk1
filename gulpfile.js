/*
 * @Author: mikey.zhang 
 * @Date: 2018-11-05 09:00:22 
 * @Last Modified by: mikey.zhang
 * @Last Modified time: 2018-11-05 09:23:29
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

//任务

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