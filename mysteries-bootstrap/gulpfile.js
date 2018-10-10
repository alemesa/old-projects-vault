const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const surge = require('gulp-surge');

//CSS FUNCTION
gulp.task('css', function() {
    return gulp.src('./styles/*.scss')
        .pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssnano())
        .pipe(gulp.dest('./styles/'))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
    return gulp.src('./scripts/*.js')
        .pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./js/'))
        .pipe(browserSync.stream());
});


gulp.task('img', function() {
    return gulp.src('./img/*')
        .pipe(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true }))
        .pipe(gulp.dest('./img/'))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch('./styles/*.scss', ['css']);
    gulp.watch('./scripts/*.js', ['js']);
    gulp.watch('./img/*', ['img']);
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

gulp.task('deploy', [], function () {
  return surge({
    project: '.',         // Path to your static build directory
    domain: 'mysteries-bootstrap.surge.sh'  // Your domain or Surge subdomain
  });
});

gulp.task('default', ['css', 'js', 'img', 'watch', 'serve']);
