const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const babel = require('gulp-babel');
const browserSync = require('browser-sync').create();
const surge = require('gulp-surge');

//CSS FUNCTION
gulp.task('css', function() {
    return gulp.src('./css/*.scss')
        .pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./css/'))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
    return gulp.src('./js/*.js')
        .pipe(plumber({
            errorHandler: function(error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('./js/dist/'))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch('./css/*.scss', ['css']);
    gulp.watch('./js/*.js', ['js']);
});

//Deploy to Surge

gulp.task('deploy', [], function () {
  return surge({
    project: '.',         // Path to your static build directory
    domain: 'tours-flexbox.surge.sh'  // Your domain or Surge subdomain
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

gulp.task('default', ['css', 'js', 'watch', 'serve']);