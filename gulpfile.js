var gulp = require('gulp'),
    browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    prefix = require('gulp-autoprefixer'),
    cssmin = require('gulp-minify-css'),
    grename = require('gulp-rename'),
    del = require('del'),
    imagemin = require('gulp-imagemin');

/*____________  TASKS _______________________*/

gulp.task('browser-sync', function () {
    browserSync.init({
        proxy: 'portf.dev',
        notify: false
    })
});

//Собираем все app.sass и libs.sass, затем билдим в app.css

gulp.task('sass', function () {
    return gulp
        .src('app/sass/**/*.sass')
        .pipe(sass())
        .pipe(prefix())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('img-min', function () {
   return gulp
       .src([
           'app/images/*.png',
           'app/images/*.jpg',
           'app/images/*.svg'
       ])
       .pipe(imagemin())
       .pipe(gulp.dest('app/images'))
});


// ___________________ LIBRARIES _____________________________

gulp.task('libs-css', function () {
    return gulp
        .src('app/css/libs.css')
        .pipe(cssmin())
        .pipe(grename({suffix: '.min'}))
        .pipe(gulp.dest('app/css'))
});


// ____________________ DEFAULT ___________________________

function keepWatch() {
    gulp.watch(['app/sass/**/*.sass'], gulp.series('sass'));
    gulp.watch('index.html').on('change', browserSync.reload);
    gulp.watch(['app/scripts/**/*.js']).on('change', browserSync.reload);
}

gulp.task('default', gulp.parallel('sass', 'libs-css', keepWatch, 'browser-sync'));
