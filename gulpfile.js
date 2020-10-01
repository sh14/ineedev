// include the required packages.
const gulp             = require('gulp')
const { watch }        = require('gulp')
const stylus           = require('gulp-stylus')
const sass           = require('gulp-sass')
const concat           = require('gulp-concat')
const cleanCSS         = require('gulp-clean-css')
const stripCssComments = require('gulp-strip-css-comments')
const sourcemaps       = require('gulp-sourcemaps')
const svgSprite        = require('gulp-svg-sprite')
const imagemin         = require('gulp-imagemin')
const htmlmin          = require('gulp-htmlmin')

// Basic configuration example
const config = {
  mode: {
    // defs: true,
    // symbol: true,
    // css: { // Activate the «css» mode
    //   render: {
    //     css: true // Activate CSS output (with default options)
    //   }
    // },
  },
  shape: {
    dimension: { // Set maximum dimensions
      maxWidth: 96,
      maxHeight: 96
    },
    spacing: { // Add padding
      padding: 0
    },
    // dest: './public/wp-content/themes/oi-learn/assets/intermediate-svg' // Keep the intermediate files
  },
  mode: {
    view: { // Activate the «view» mode
      bust: false,
      render: {
        css: true // Activate Sass output (with default options)
      }
    },
    symbol: true // Activate the «symbol» mode
    // defs: true,
  }
}
gulp.task('svg', function () {
  gulp.src('./public/wp-content/themes/oi-learn/svg/**/*.svg')
      .pipe(svgSprite(config))
      .pipe(gulp.dest('./public/wp-content/themes/oi-learn/assets'))
})

gulp.task('vidofon-svg', function () {
  gulp.src('./vidofon.dev/themes/videofon/svg/*.svg')
      .pipe(svgSprite(config))
      .pipe(gulp.dest('./vidofon.dev/themes/videofon/'))
})

// Get one .styl file and render
gulp.task('vidofon-styl', function () {
  watch('./vidofon.dev/themes/videofon/*.styl', { events: 'all' }, function () {
    return gulp.src('./vidofon.dev/themes/videofon/*.styl')
               .pipe(sourcemaps.init())
               .pipe(stylus())
               .pipe(sourcemaps.write())
               // .pipe(cleanCSS({ compatibility: 'ie8' }))
               // .pipe(stripCssComments({ preserve: false }))
               .pipe(gulp.dest('./vidofon.dev/themes/videofon'))
  })
})
gulp.task('vidofon-css', function () {
  return gulp.src(['./vidofon.dev/themes/videofon/*.styl',])
             .pipe(stylus())
             .pipe(cleanCSS({ compatibility: 'ie8' }))
             .pipe(stripCssComments({ preserve: false }))
             .pipe(gulp.dest('./vidofon.dev/themes/videofon'))
})


gulp.task('runlocker-css', function () {
  return gulp.src(['./runlocker-ru/assets/styles/*.styl',])
             .pipe(stylus())
    // .pipe(concat('main.css'))
             .pipe(cleanCSS({ compatibility: 'ie8' }))
             .pipe(stripCssComments({ preserve: false }))
             .pipe(gulp.dest('./runlocker-ru/assets/styles'))
})

// Get one .styl file and render
gulp.task('runlocker-styl', function () {
  watch('./runlocker-ru/assets/styles/*.styl', { events: 'all' }, function () {
    return gulp.src('./runlocker-ru/assets/styles/*.styl')
               .pipe(sourcemaps.init())
               .pipe(stylus())
               .pipe(sourcemaps.write())
               .pipe(cleanCSS({ compatibility: 'ie8' }))
               .pipe(stripCssComments({ preserve: false }))
               .pipe(gulp.dest('./runlocker-ru/assets/styles'))
  })
})

gulp.task('runlocker-img', function () {
  return gulp.src('./runlocker-ru/assets/images/*')
             .pipe(imagemin())
             .pipe(gulp.dest('./runlocker-ru/docs/assets/images'))
})

gulp.task('runlocker-html', () => {
  return gulp.src('./runlocker-ru/docs/*.html')
             .pipe(htmlmin({ collapseWhitespace: true, minifyJS: true, removeComments: true, }))
             .pipe(gulp.dest('./runlocker-ru/docs'))
})



gulp.task('obs-fall-styl', function () {
  // watch('./obs/fall/*.scss', { events: 'all' }, function () {
    return gulp.src('./obs/fall/*.scss')
               .pipe(sourcemaps.init())
               .pipe(sass())
               .pipe(sourcemaps.write())
      // .pipe(cleanCSS({ compatibility: 'ie8' }))
      // .pipe(stripCssComments({ preserve: false }))
               .pipe(gulp.dest('./obs/fall'))
  // })
})


// Default gulp task to run
gulp.task('runlocker', ['runlocker-css','runlocker-img','runlocker-html',])
