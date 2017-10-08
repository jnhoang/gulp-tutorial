// Required

var gulp          = require('gulp');
var browserSync   = require('browser-sync');
var reload        = browserSync.reload;
var uglify        = require('gulp-uglify');
var rename        = require('gulp-rename');
var del           = require('del');

var reloadObj = { stream: true };

/* SCRIPTS */ 
gulp.task('scripts', function() {
  gulp
  .src([ 'app/js/**/*.js', '!app/js/**/*.min.js' ])
  .pipe(rename({ suffix:'.min' }))
  .pipe(uglify())
  .pipe(gulp.dest('app/js'))
  .pipe(reload(reloadObj)); // reload should always be last pipe
});


/* HTML TASKS */
gulp.task('html', function() {
  gulp
  .src('app/**/*.html')
  .pipe(reload(reloadObj));
})


/* BUILD TASKS */

// clear out all files and folder from build folder
gulp.task('build:cleanfolder', function(cb) {
  var deleteArr = [
    'build/**'
  ];
  
  del(deleteArr, cb());
});

// task to create build directory for all files
// gulp.task(task name, do on completion of these tasks, cb)
gulp.task('build:copy', ['build:cleanfolder'], function() {
  return  gulp
          .src('app/**/*/')
          .pipe(gulp.dest('build/'));
});

// task to remove unwanted build files
// list all files and directories here that you don't want to include
gulp.task('build:remove', ['build:copy'], function(cb) {
  var deleteArr = [
    'build/scss/', 
    'build/js/!(*.min.js)'
  ];

  del(deleteArr, cb());
});

// command
gulp.task('build', ['build:copy', 'build:remove']);



/* BROWSERSYNC TASKS */

// dev build
gulp.task('build:serve', function() {
  browserSync({
    server: {
      baseDir: './build/'
    }
  });
});

// cleaned build
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: './app/'
    }
  });
});

/* WATCH TASKS */
gulp.task('watch', function() {
  gulp.watch('app/js/**/*.js', ['scripts']);
  gulp.watch('app/**/*.html', ['html']);
})


/* DEFAULT TASK*/
gulp.task('default', ['scripts','html', 'browser-sync', 'watch']);