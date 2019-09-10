const gulp = require('gulp');
const {parallel, series, watch, src, dest} = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
/*
    -- TOP LEVEL FUNCTIONS --
    gulp.task - Define tasks
    gulp.src - Points to files to use
    gulp.dest - Points to folder to output
    gulp.watch - Watch files and folders for changes
*/

// Logs Message
// gulp.task('message', function(){
//     return console.log('Gulp is running...');
// });

// function message() {
//     return console.log('Gulp is running...');
// }

// Copy ALL HTML files
// gulp.task('copyHTML', function(){
//     gulp.src('src/*.html')
//         .pipe(gulp.dest('dist'));
// });

function copyHTML() {
    return src('src/*.html')
        .pipe(dest('dist'));
}

// Optimize images
// gulp.task('imageMin', () => 
//     gulp.src('src/images/*')
//         .pipe(imagemin([
//             imagemin.gifsicle({interlaced: true}),
//             imagemin.jpegtran({progressive: true}),
//             imagemin.optipng({optimizationLevel: 5}),
//             imagemin.svgo({
//                 plugins: [
//                     {removeViewBox: true},
//                     {cleanupIDs: false}
//                 ]
//             })
//         ]))
//         .pipe(gulp.dest('dist/images'))
// );

function imageMin() {
    return src('src/images/*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.jpegtran({progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(dest('dist/images'));
}

// Minify JS
// gulp.task('minify', function(){
//     gulp.src('src/js/*.js')
//         .pipe(uglify())
//         .pipe(gulp.dest('dist/js'));
// });

function minify() {
    return src('src/js/*.js')
        .pipe(uglify())
        .pipe(dest('dist/js'));
}

// Compile Sass
// gulp.task('sass', function(){
//     gulp.src('src/sass/*.scss')
//         .pipe(sass().on('error', sass.logError))
//         .pipe(gulp.dest('dist/css'));
// });

function sass_compile() {
    return src('src/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('dist/css'));
}

// Scripts
// gulp.task('scripts', function(){
//     gulp.src('src/js/*.js')
//         .pipe(concat('main.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('dist/js'));
// });

function scripts() {
    return src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(dest('dist/js'));
}

exports.copyHTML = copyHTML;
exports.imageMin = imageMin;
exports.minify = minify;
exports.sass_compile = sass_compile;
exports.scripts = scripts;
exports.default = series(copyHTML, imageMin, sass_compile, scripts);
exports.watch = function(){
    watch('src/*.html', copyHTML);
    watch('src/images/*', imageMin);
    watch('src/sass/*.scss', sass_compile);
    watch('src/js/*.js', scripts);
}