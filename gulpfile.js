var gulp = require('gulp');
    pug  = require('gulp-pug');
    del = require('del');
    // sass = require('gulp-sass');
    compass = require('gulp-compass');
    minifyCSS = require('gulp-minify-css');
    autoprefixer = require('gulp-autoprefixer'),
    //jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    connect = require('gulp-connect'),
    sourcemaps = require('gulp-sourcemaps'),
    livereload = require('gulp-livereload');
    gulpPlumber = require('gulp-plumber');



//*******************************
//Sass compile
//*******************************
var _sassDiskPath = './src/sass/*.scss';
var _cssDestPath = './dist/style/';


gulp.task('styles', function () {
    return gulp.src(_sassDiskPath) // sass 來源路徑
    .pipe(gulpPlumber())
        .pipe(compass({
            css: './dist/style/', // compass 輸出位置
            sass: './src/sass/',      // sass 來源路徑
            style: 'nested',  // CSS 處理方式，預設 nested（expanded, nested, compact, compressed）
            comments: false,      // 是否要註解，預設(true)
            sourcemap: true
        }))
    .pipe(gulp.dest(_cssDestPath)) // 輸出位置(非必要)
    .pipe(autoprefixer())
    .pipe(rename({suffix: '.min'}))
    .pipe(minifyCSS({}))
    .pipe(gulp.dest(_cssDestPath))
    .pipe(connect.reload())
    .pipe(notify({ message: 'Styles task complete' }));
});

//*******************************
//Scripts compile
//*******************************

var _jsDiskPath = './src/script/*.js';
var _jsDestPath = './dist/js/';

gulp.task('scripts', function (){
  return gulp.src(_jsDiskPath)
      .pipe(gulpPlumber())
      //.pipe(jshint())
      //.pipe(jshint.reporter('jshint-stylish'))
      .pipe(concat('main.js'))
      .pipe(gulp.dest(_jsDestPath))
      .pipe(rename({suffix: '.min'}))
      .pipe(uglify())
      .pipe(gulp.dest(_jsDestPath))
      .pipe(connect.reload())
      .pipe(notify({ message: 'Scripts task complete' }))

});

//*******************************
//Html compile
//*******************************

var _htmlDiskPath = './src/pug/*.pug';
var _htmlDestPath = './dist/';


gulp.task('html', function () {
  return gulp.src(_htmlDiskPath)
      .pipe(gulpPlumber())
      .pipe(pug())
      .pipe(gulp.dest(_htmlDestPath))
      .pipe(connect.reload())
      .pipe(notify({ message: 'html task complete' }));
});

//*******************************
//圖片壓縮
//*******************************


var _imagesDiskPath = './src/image/**';
var _imagesDestPath = './dist/image';

gulp.task('images', function() { 
  return gulp.src(_imagesDiskPath )
    .pipe(gulpPlumber())
    .pipe(cache(imagemin({ 
      optimizationLevel: 3, 
      progressive: true, 
      interlaced: true 
    })))
    .pipe(gulp.dest(_imagesDestPath))
    .pipe(notify({ message: 'Images task complete' }))

});


// *********************
// LiveReload
// *********************
gulp.task('connect', function () {
    connect.server({
      livereload: true
    });
});

gulp.task('watch', function() {
       gulp.watch(_sassDiskPath, ['styles']);
       gulp.watch('./src/sass/*/*.scss', ['styles']);
       gulp.watch(_jsDiskPath, ['scripts']);
       gulp.watch(_imagesDiskPath, ['images']);
       gulp.watch(_htmlDiskPath, ['html']);
       gulp.watch('./src/pug/*/*.pug', ['html']);
});

//*******************************
//清除目的地目錄並重建檔案
//*******************************

gulp.task('clean', function(cb) { 
    return del(['./dist/*.html','./dist/js/*','./dist/style/*'] ,cb);
});

gulp.task('default',['clean'],function (){
    gulp.start('styles','html','scripts','connect','watch');
});



