var gulp = require('gulp')
var browserSync = require('browser-sync').create()
var rename = require('gulp-rename')
var sass = require('gulp-sass')
var autoPrefixer = require('gulp-autoprefixer')
//if node version is lower than v.0.1.2
require('es6-promise').polyfill()
var cssComb = require('gulp-csscomb')
var cmq = require('gulp-merge-media-queries')
var cleanCss = require('gulp-clean-css')
var uglify = require('gulp-uglify')
var concat = require('gulp-concat')
var clean = require('gulp-clean')
var babel = require('gulp-babel')

gulp.task('sass', done => {
  gulp.src(['src/css/main.scss'])
    .pipe(sass())
    .pipe(autoPrefixer())
    .pipe(cssComb())
    .pipe(cmq({log: true}))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('docs/css'))
    .pipe(rename({
      suffix: '.min',
    }))
    .pipe(cleanCss())
    .pipe(gulp.dest('docs/css'))
    .pipe(browserSync.reload({stream: true}))
  done()
})

gulp.task('js', done => {
  gulp.src(['src/js/*.js'])
    .pipe(babel({
      presets: ['@babel/env'],
    }))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('docs/js'))
    .pipe(rename({
      suffix: '.min',
    }))
    .pipe(uglify())
    .pipe(gulp.dest('docs/js'))
    .pipe(browserSync.reload({stream: true}))
  done()
})

gulp.task('html', done => {
  gulp.src(['src/*.html'])
    .pipe(gulp.dest('docs'))
    .pipe(browserSync.reload({stream: true}))
  done()
})

gulp.task('clean', done => {
  return gulp.src('docs/*', {read: false})
    .pipe(clean())
  // done()
})

gulp.task('copy-libs', done => {
  gulp.src(['node_modules/jquery/dist/jquery.min.js', 'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js '])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('docs/js'))

  gulp.src(['src/favicon.png'])
    .pipe(gulp.dest('docs'))

  gulp.src(['node_modules/@fortawesome/fontawesome-free/webfonts/*.*'])
    .pipe(gulp.dest('docs/webfonts'))

  gulp.src(['src/json/*.*'])
    .pipe(gulp.dest('docs/json'))

  gulp.src(['node_modules/bootstrap/dist/css/bootstrap.min.css', 'node_modules/@fortawesome/fontawesome-free/css/all.min.css'])
    .pipe(concat('vendor.min.css'))
    .pipe(cleanCss())
    .pipe(gulp.dest('docs/css'))

  done()
})

gulp.task('default', gulp.series('clean', 'copy-libs', 'html', 'sass', 'js', done => {
  browserSync.init({
    server: './docs',
  })
  gulp.watch('src/*.html', gulp.series('html'))
  gulp.watch('src/css/**/*.scss', gulp.series('sass'))
  gulp.watch('src/js/*.js', gulp.series('js'))
  done()
}))
