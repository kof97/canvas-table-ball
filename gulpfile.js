// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload'),

    browserify = require("browserify"),
    sourcemaps = require("gulp-sourcemaps"),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer');

gulp.task('styles', () =>
    sass('src/css/*.scss', {style: 'expanded', sourcemap: true})
    .on('error', sass.logError)
    .pipe(sourcemaps.write())
    .pipe(sourcemaps.write('maps', {
            includeContent: false,
            sourceRoot: 'src'
        }))
//    .pipe(concat('style.css'))
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css'))
    .pipe(notify({ message: 'Styles task complete' }))

);

// Scripts
gulp.task('scripts', function() {
    var b = browserify({
        entries: "src/js/main.js",
        debug: true
    });

    return b.bundle()
        .pipe(source("script.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("dist/js"));
});

// Images
gulp.task('images', function() {
    return gulp.src('src/images/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('dist/images'))
        .pipe(notify({ message: 'Images task complete' }));
});

// Default task
gulp.task('default', [], function() {
    gulp.start('styles', 'scripts', 'images');
});

// Watch
gulp.task('watch', function() {
    // Watch .scss files
    gulp.watch('src/css/**/*.scss', ['styles']);
    // Watch .js files
    gulp.watch('src/js/**/*.js', ['scripts']);
    // Watch image files
    gulp.watch('src/images/**/*', ['images']);
    // Create LiveReload server
    livereload.listen();
    // Watch any files in dist/, reload on change
    gulp.watch(['dist/**']).on('change', livereload.changed);
});
