/*
npm init -y
npm install --save-dev gulp gulp-plumber gulp-sass
npm install --save-dev gulp-cssnano gulp-sourcemaps gulp-autoprefixer
npm install --save-dev gulp-concat gulp-uglify
npm install --save-dev gulp-babel babel-preset-es2015
npm install --save-dev gulp-imagemin imagemin-pngquant gulp-size
npm install --save-dev browser-sync
npm install --save-dev gulp-surge gulp rename gulp-changed
npm install --save-dev jshint gulp-jshint

*/

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const size = require('gulp-size');
const browserSync = require('browser-sync').create();
const surge = require('gulp-surge');
const rename = require('gulp-rename');
const changed = require('gulp-changed');
const jshint = require('gulp-jshint');

//CSS FUNCTION
gulp.task('css', function() {
  return gulp
    .src('./css/*.scss')
    .pipe(
      plumber({
        errorHandler: function(error) {
          console.log(error.message);
          this.emit('end');
        }
      })
    )
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(size())
    .pipe(
      autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
      })
    )
    .pipe(concat('styles.css'))
    .pipe(cssnano())
    .pipe(sourcemaps.write('./'))
    .pipe(size())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./css/'))
    .pipe(browserSync.stream());
});

gulp.task('js', function() {
  return gulp
    .src('./js/*.js')
    .pipe(
      plumber({
        errorHandler: function(error) {
          console.log(error.message);
          this.emit('end');
        }
      })
    )
    .pipe(sourcemaps.init())
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
    .pipe(concat('main.js'))
    .pipe(
      babel({
        presets: ['es2015']
      })
    )
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(size())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./js/build/'))
    .pipe(browserSync.stream());
});

gulp.task('img', function() {
  return gulp
    .src('./img/original/*')
    .pipe(changed('./img/original/*'))
    .pipe(
      imagemin({
        optimizationLevel: 3,
        progressive: true,
        interlaced: true,
        svgoPlugins: [{ removeViewBox: false }],
        use: [pngquant()]
      })
    )
    .pipe(size())
    .pipe(gulp.dest('./img/minify'))
    .pipe(browserSync.stream());
});

gulp.task('watch', function() {
  gulp.watch('./css/*.scss', ['css']);
  gulp.watch('./js/*.js', ['js']);
  gulp.watch('./img/original/*', ['img']);
});

//Deploy to Surge

gulp.task('deploy', [], function() {
  return surge({
    project: '.', // Path to your static build directory
    domain: 'spacex-launches.surge.sh' // Your domain or Surge subdomain
  });
});

//serve browser
gulp.task('serve', function() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch('*.html').on('change', browserSync.reload);
});

gulp.task('default', ['css', 'js', 'img', 'watch', 'serve']);
gulp.task('production', ['css', 'js', 'img', 'watch', 'serve']);
