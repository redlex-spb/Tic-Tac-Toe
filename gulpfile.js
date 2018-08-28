'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    plumber = require('gulp-plumber'),
    cleanCSS = require('gulp-clean-css'),
    //webp = require('gulp-webp'),
    replace = require('gulp-replace'),
    fs = require('fs'),
    //inlineCss = require('gulp-inline-css'),
    csso = require('gulp-csso'),
    //sassImport = require('gulp-sass-import'),
    htmlmin = require('gulp-htmlmin'),
    //minifier = require('gulp-minifier'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    browserSync = require("browser-sync"),
    reload = browserSync.reload;

var path = {
    build: {
        html: 'build/',
        js: 'build/misc/js/',
        css: 'build/misc/css/',
        img: 'build/misc/images/',
        //fonts: 'build/fonts/',
        files: 'build/'
    },
    src: {
        html: 'src/*.html',
        js: 'src/misc/js/main.js',
        style: 'src/misc/style/main.scss',
        img: 'src/misc/images/**/*.*',
        //fonts: 'src/fonts/**/*.*',
        files: 'src/'
    },
    //clean: './build'
};

var config = {
    server: {
        baseDir: "./build"
    },
    tunnel: true,
    host: 'localhost',
    port: 9000,
    logPrefix: "test_task_front2"
};

gulp.task('webserver', function() {
    browserSync(config);
});

gulp.task('clean', function(cb) {
    var baseDir = "build";
    rimraf(baseDir, cb);
});

gulp.task('html:build', function() {
    gulp.src(path.src.html)
        //.pipe(rigger())
        //.pipe(inlineCss())
        .pipe(htmlmin({ collapseWhitespace: true, removeComments: true }))
        .pipe(gulp.dest(path.build.html))
        //gulp.src(path.src.htaccess)
        //.pipe(gulp.dest(path.build.html));
        .pipe(reload({ stream: true }));
});

gulp.task('js:build', function() {
    gulp.src(path.src.js)
        .pipe(rigger())
        .pipe(sourcemaps.init())
        //.pipe(uglify({ output: { comments: false }, compress: {} }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.build.js))
        .pipe(reload({ stream: true }));
});

gulp.task('style:build', function() {
    gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(cleanCSS({ level: { 1: { specialComments: 0 } } }))
        //.pipe(criticalCss())
        //.pipe(prefixer())
        //.pipe(csso({ comments: false }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.build.css))
        .pipe(reload({ stream: true }));
});

gulp.task('image:build', function() {
    gulp.src(path.src.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()],
            interlaced: true
        }))
        //.pipe(webp())
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({ stream: true }));
});

gulp.task('replace:build', ['style:build'], function() {
    return gulp.src('build/*.html')
        .pipe(replace('<link rel="stylesheet" href="css/main.css">', '<style>' + fs.readFileSync('build/css/main.css', 'utf8') + '</style>'))
        .pipe(gulp.dest('build/'));
});

gulp.task('fonts:build', function() {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts));
});

gulp.task('files:build', function() {
    gulp.src('src/favicon.ico')
        .pipe(gulp.dest('build/'));
    gulp.src('src/products.json')
        .pipe(gulp.dest('build/'));
});

gulp.task('build', [
    'html:build',
    'js:build',
    'style:build',
    //'fonts:build',
    //'image:build',
    //'files:build',
    //'replace:build'
]);


gulp.task('watch', function() {
    watch([path.src.html], function(event, cb) {
        gulp.start('html:build');
    });
    watch(['src/misc/style/*.css'], function(event, cb) {
        gulp.start('style:build');
    });
    watch(['src/misc/js/common.js'], function(event, cb) {
        gulp.start('js:build');
    });
    watch([path.src.img], function(event, cb) {
        gulp.start('image:build');
    });
    /*watch([path.watch.fonts], function(event, cb) {
        gulp.start('fonts:build');
    });*/
});


gulp.task('default', ['build', 'webserver', 'watch']);
//gulp.task('default', ['build']);