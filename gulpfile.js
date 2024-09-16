const gulp = require('gulp');
const less = require('gulp-less');
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

const paths = {
    less: {
        src: 'src/**/*.less',
        dest: 'dist/'
    },
    js: {
        src: 'src/**/*.js',
        dest: 'dist/'
    },
    images: {
        src: 'src/images/**/*',
        dest: 'dist/images/'
    },
    html: {
        src: 'src/*.html',
        dest: 'dist/'
    }
};

gulp.task('styles', function() {
    return gulp.src(paths.less.src)
        .pipe(less())
        .pipe(cleanCSS())
        .pipe(gulp.dest(paths.less.dest))
        .pipe(browserSync.stream());
});

gulp.task('scripts', function() {
    return gulp.src(paths.js.src)
        .pipe(concat('main.js'))
        .pipe(gulp.dest(paths.js.dest))
        .pipe(browserSync.stream());
});

gulp.task('images', function() {
    return gulp.src(paths.images.src, {encoding: false})
        .pipe(gulp.dest(paths.images.dest));
});

gulp.task('html', function() {
    return gulp.src(paths.html.src)
        .pipe(gulp.dest(paths.html.dest));
});

gulp.task('serve', function() {
    browserSync.init({
        server: {
            baseDir: "./src"
        }
    });

    gulp.watch(paths.less.src, gulp.series('styles'));
    gulp.watch(paths.js.src, gulp.series('scripts'));
    gulp.watch(paths.images.src, gulp.series('images'));
    gulp.watch(paths.html.src, gulp.series('html')).on('change', browserSync.reload);
});

gulp.task('build', gulp.series('styles', 'scripts', 'images', 'html'));
gulp.task('default', gulp.series('build', 'serve'));