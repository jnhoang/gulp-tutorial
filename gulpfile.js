// Required

var gulp          = require('gulp');
var browserSync   = require('browser-sync');
var reload        = browserSync.reload;
var uglify        = require('gulp-uglify');
var rename        = require('gulp-rename');
var del = require(del);

var reloadObj = { stream: true };

// scripts 
gulp.task('scripts', function() {
  gulp
  .src([ 'app/js/**/*.js', '!app/js/**/*.min.js' ])
  .pipe(rename({ suffix:'.min' }))
  .pipe(uglify())
  .pipe(gulp.dest('app/js'))
  .pipe(reload(reloadObj)); // reload should always be last pipe
});

// HTML task
gulp.task('html', function() {
  gulp
  .src('app/**/*.html')
  .pipe(reload(reloadObj));
})

// BrowserSync tasks
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: './app/'
    }
  });
});
// Watch Tasks
gulp.task('watch', function() {
  gulp.watch('app/js/**/*.js', ['scripts']);
  gulp.watch('app/**/*.html', ['html']);
})


//Default task
gulp.task('default', ['scripts','html', 'browser-sync', 'watch']);